/**
 * ====================================================================
 * MIND IN BOX — PAYMENT GATEWAY ENGINE
 * Providers: PayPal + Lemon Squeezy (Merchant of Record)
 * Version: 2.0 | Server-verified | Anti-bypass
 * ====================================================================
 */

const SovereignPayment = (() => {
    'use strict';

    // ----------------------------------------------------------------
    // CONFIGURATION — Lemon Squeezy Product IDs
    // ----------------------------------------------------------------
    const CONFIG = {
        lemonSqueezy: {
            storeId: 'YOUR_LEMON_SQUEEZY_STORE_ID',
            products: {
                monthly_pro:    { variantId: 'YOUR_MONTHLY_VARIANT_ID',    price: '$9.99/شهر',   name: 'البرو الشهري' },
                annual_pro:     { variantId: 'YOUR_ANNUAL_VARIANT_ID',     price: '$79/سنة',     name: 'البرو السنوي (وفر 34%)' },
                oracle_monthly: { variantId: 'YOUR_ORACLE_MONTHLY_ID',     price: '$24.99/شهر',  name: 'الأوراكل الشهري' },
            }
        },
        paypal: {
            clientId: 'YOUR_PAYPAL_CLIENT_ID',
            currency: 'USD',
        }
    };

    let db = null;
    let auth = null;

    // ----------------------------------------------------------------
    // INITIALIZATION
    // ----------------------------------------------------------------
    function init() {
        if (typeof firebase !== 'undefined') {
            auth = firebase.auth();
            db = firebase.firestore();
        }
    }

    // ----------------------------------------------------------------
    // LEMON SQUEEZY — Open checkout overlay
    // ----------------------------------------------------------------
    function openLemonCheckout(planKey) {
        const plan = CONFIG.lemonSqueezy.products[planKey];
        if (!plan) {
            console.error('[Payment] Unknown plan:', planKey);
            return;
        }

        const user = auth?.currentUser;
        if (!user) {
            _showLoginRequired();
            return;
        }

        // Build Lemon Squeezy checkout URL with pre-filled email
        const checkoutUrl = new URL(`https://YOUR_STORE.lemonsqueezy.com/checkout/buy/${plan.variantId}`);
        checkoutUrl.searchParams.set('checkout[email]', user.email || '');
        checkoutUrl.searchParams.set('checkout[custom][user_id]', user.uid);
        checkoutUrl.searchParams.set('embed', '1');

        // Load Lemon.js if not already loaded
        _loadLemonJs(() => {
            if (window.LemonSqueezy) {
                window.LemonSqueezy.Setup({
                    eventHandler: (event) => _handleLemonEvent(event, planKey)
                });
                window.LemonSqueezy.Url.Open(checkoutUrl.toString());
            } else {
                // Fallback: open in new tab
                window.open(checkoutUrl.toString(), '_blank');
            }
        });
    }

    function _loadLemonJs(callback) {
        if (window.LemonSqueezy) { callback(); return; }
        const script = document.createElement('script');
        script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
        script.defer = true;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function _handleLemonEvent(event, planKey) {
        if (event.event === 'Checkout.Success') {
            // Payment confirmed on client — now verify server-side via webhook
            _onPaymentSuccess('lemon_squeezy', event.data, planKey);
        }
    }

    // ----------------------------------------------------------------
    // PAYPAL — Render PayPal button into a container
    // ----------------------------------------------------------------
    function renderPayPalButton(containerId, planKey, amount) {
        const user = auth?.currentUser;
        if (!user) { _showLoginRequired(); return; }

        _loadPayPalSdk(() => {
            if (!window.paypal) return;

            window.paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color:  'gold',
                    shape:  'pill',
                    label:  'pay',
                },

                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value: amount, currency_code: CONFIG.paypal.currency },
                            description: `Mind In Box — ${planKey}`,
                            custom_id: user.uid,
                        }],
                        application_context: {
                            brand_name: 'Mind In Box',
                            locale: 'ar-SA',
                            landing_page: 'NO_PREFERENCE',
                            user_action: 'PAY_NOW',
                        }
                    });
                },

                onApprove: async (data, actions) => {
                    try {
                        const order = await actions.order.capture();
                        _onPaymentSuccess('paypal', order, planKey);
                    } catch (err) {
                        console.error('[Payment] PayPal capture error:', err);
                        _showError('حدث خطأ في معالجة الدفع. يرجى المحاولة مرة أخرى.');
                    }
                },

                onError: (err) => {
                    console.error('[Payment] PayPal error:', err);
                    _showError('حدث خطأ في بوابة الدفع. يرجى المحاولة لاحقاً.');
                },

                onCancel: () => {
                    console.log('[Payment] PayPal cancelled by user.');
                }

            }).render(`#${containerId}`);
        });
    }

    function _loadPayPalSdk(callback) {
        if (window.paypal) { callback(); return; }
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${CONFIG.paypal.clientId}&currency=${CONFIG.paypal.currency}&intent=capture`;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // ----------------------------------------------------------------
    // PAYMENT SUCCESS HANDLER
    // ----------------------------------------------------------------
    async function _onPaymentSuccess(provider, data, planKey) {
        const user = auth?.currentUser;
        if (!user) return;

        // Show optimistic success UI immediately
        _showSuccessUI(planKey);

        // Log payment attempt (server-side webhook will confirm and upgrade role)
        try {
            await db.collection('payments').add({
                userId: user.uid,
                provider: provider,
                planKey: planKey,
                status: 'pending_verification', // Webhook will change to 'confirmed'
                clientData: JSON.stringify(data).substring(0, 500),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        } catch (err) {
            console.warn('[Payment] Log error (non-critical):', err);
        }

        // NOTE: Actual role upgrade (free → pro) ONLY happens in Firebase Function
        // triggered by payment provider webhook. This prevents any client-side bypass.
    }

    // ----------------------------------------------------------------
    // UI HELPERS
    // ----------------------------------------------------------------
    function _showLoginRequired() {
        const modal = document.getElementById('loginModal');
        if (modal) modal.style.display = 'flex';
    }

    function _showSuccessUI(planKey) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position:fixed; inset:0; background:rgba(6,6,10,0.9);
            display:flex; flex-direction:column; align-items:center; justify-content:center;
            z-index:9999; font-family:'Cairo',sans-serif; text-align:center; padding:40px;
        `;
        overlay.innerHTML = `
            <div style="font-size:4rem; margin-bottom:20px;">🏛️</div>
            <h2 style="color:#e5b964; font-size:1.8rem; margin-bottom:12px;">مرحباً في دائرة النخبة</h2>
            <p style="color:#a09880; font-size:1.1rem; margin-bottom:32px; max-width:420px; line-height:1.7;">
                تم استلام دفعتك بنجاح. سيتم تفعيل حسابك البرو خلال دقائق قليلة بعد التحقق من الدفع.
            </p>
            <button onclick="location.reload()" style="
                padding:14px 40px; background:linear-gradient(135deg,#c5a059,#e5b964);
                color:#06060a; border:none; border-radius:50px; font-weight:700;
                font-size:1.05rem; cursor:pointer; font-family:inherit;
            ">العودة إلى الملاذ</button>
        `;
        document.body.appendChild(overlay);
    }

    function _showError(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
            background:rgba(239,68,68,0.9); color:#fff; padding:14px 28px;
            border-radius:12px; font-family:'Cairo',sans-serif; z-index:9999;
            font-size:0.95rem; backdrop-filter:blur(10px);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    }

    // ----------------------------------------------------------------
    // PUBLIC API
    // ----------------------------------------------------------------
    return { init, openLemonCheckout, renderPayPalButton };
})();

document.addEventListener('DOMContentLoaded', () => SovereignPayment.init());

