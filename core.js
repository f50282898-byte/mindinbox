/**
 * ==============================================================================
 * MIND IN A BOX — CORE SANCTUARY ENGINE
 * الملف: core.js
 * المسؤولية: الأدوات المشتركة عبر كافة الصفحات:
 *   — وضع المخطوطة العتيقة
 *   — شريط التنقل السفلي (Bottom Bar)
 *   — زر الفزع الوجودي ودائرة التنفس
 *   — درع الحصانة (Security Shield)
 *   — انتقالات الصفحات (SPA-like Transitions)
 * ==============================================================================
 */

;(function () {
    'use strict';

    /* =========================================================================
       MODULE 1: Security Shield — درع الحصانة الفلسفي
       ========================================================================= */
    const SecurityShield = (() => {

        function printWarning() {
            const titleStyle = [
                'color: #c5a059',
                'font-size: 18px',
                'font-family: Georgia, serif',
                'font-weight: bold',
                'padding: 8px 0',
                'text-shadow: 0 0 12px rgba(197,160,89,0.6)'
            ].join(';');

            const decreeTitleStyle = [
                'color: #e74c3c',
                'font-size: 14px',
                'font-family: monospace',
                'font-weight: bold',
                'line-height: 1.8',
                'padding: 12px 16px',
                'background: #06060a',
                'display: block'
            ].join(';');

            const verseStyle = [
                'color: #7a7d88',
                'font-size: 11px',
                'font-style: italic',
                'padding: 6px 0'
            ].join(';');

            console.clear();
            console.log('%c⚔️ ميثاق حصانة الملاذ — عقل في صندوق', titleStyle);
            console.log(
                '%c[صواعق التحذير]\nأيها العابر في كواليس الشيفرة،\nهذا المكان ليس ساحة تطفل وفضول رخيص.\nالعقول الحرة تبني صروح السيادة بجهد متواصل،\nبينما النفوس المشتتة تتلصص على أحجار الأساس أملاً في اختصار الطريق.\n\nأغلق أدوات المطور الآن، وعُد إلى محراب انضباطك.\nلن تجد هنا سوى مرآة فنائك الرقمي!',
                decreeTitleStyle
            );
            console.log(
                '%c« المرء لا يتأذى مما يحدث، بل بما يظنه عما يحدث. » — إبيكتيتوس',
                verseStyle
            );
        }

        function init() {
            printWarning();

            // Intercept right-click
            window.addEventListener('contextmenu', e => {
                e.preventDefault();
                return false;
            });

            // Intercept DevTools shortcuts
            window.addEventListener('keydown', e => {
                // F12
                if (e.key === 'F12' || e.keyCode === 123) {
                    e.preventDefault();
                    printWarning();
                    return false;
                }
                // Ctrl/Cmd + Shift + I / J / C (Inspect, Console, Selector)
                if ((e.ctrlKey || e.metaKey) && e.shiftKey &&
                    ['i','I','j','J','c','C'].includes(e.key)) {
                    e.preventDefault();
                    printWarning();
                    return false;
                }
                // Ctrl/Cmd + U (View Source)
                if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl/Cmd + S (Save Page)
                if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                    e.preventDefault();
                    return false;
                }
            });
        }

        return { init };
    })();

    /* =========================================================================
       MODULE 2: Manuscript Mode — وضع المخطوطة العتيقة
       ========================================================================= */
    const ManuscriptMode = (() => {

        const STORAGE_KEY = 'mib_manuscript_mode';
        let isActive = false;

        function applyState(animate) {
            const html = document.documentElement;
            if (isActive) {
                html.setAttribute('data-mode', 'manuscript');
            } else {
                html.removeAttribute('data-mode');
            }
            updateToggleButton();
            localStorage.setItem(STORAGE_KEY, isActive ? '1' : '0');
        }

        function updateToggleButton() {
            const btn = document.getElementById('manuscriptToggle');
            if (!btn) return;
            const icon  = btn.querySelector('.ms-icon');
            const label = btn.querySelector('.ms-label');
            if (isActive) {
                if (icon)  icon.innerHTML = _iconInk();
                if (label) label.textContent = 'العودة للظلام';
                btn.title = 'تفعيل وضع الظلام الفلسفي';
            } else {
                if (icon)  icon.innerHTML = _iconScroll();
                if (label) label.textContent = 'مخطوطة';
                btn.title = 'تفعيل وضع المخطوطة العتيقة';
            }
        }

        function _iconScroll() {
            return `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>`;
        }

        function _iconInk() {
            return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        }

        function injectToggleButton() {
            if (document.getElementById('manuscriptToggle')) return;
            const btn = document.createElement('button');
            btn.id = 'manuscriptToggle';
            btn.type = 'button';
            btn.title = 'تفعيل وضع المخطوطة العتيقة';
            btn.setAttribute('aria-label', 'تبديل وضع المخطوطة');
            btn.innerHTML = `
                <span class="ms-icon">
                    <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                </span>
                <span class="ms-label">مخطوطة</span>`;
            btn.addEventListener('click', toggle);
            document.body.appendChild(btn);
        }

        function toggle() {
            isActive = !isActive;
            applyState(true);
        }

        function init() {
            const stored = localStorage.getItem(STORAGE_KEY);
            isActive = (stored === '1');
            injectToggleButton();
            applyState(false);
        }

        return { init, toggle };
    })();

    /* =========================================================================
       MODULE 3: Bottom Bar — شريط التنقل السفلي الأصلاني
       ========================================================================= */
    const BottomBar = (() => {

        // Define navigation items (icon, label, href)
        const NAV_ITEMS = [
            {
                href: 'dashboard.html',
                label: 'المحراب',
                icon: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`
            },
            {
                href: 'reflection.html',
                label: 'التفريغ',
                icon: `<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
            },
            {
                href: 'meditation.html',
                label: 'التأمل',
                icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`
            },
            {
                href: 'schedule.html',
                label: 'الميثاق',
                icon: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
            },
            {
                href: 'vault.html',
                label: 'الخزينة',
                icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>`
            }
        ];

        function getCurrentPage() {
            const path = window.location.pathname;
            const filename = path.split('/').pop() || 'index.html';
            return filename.toLowerCase();
        }

        function injectBar() {
            if (document.getElementById('bottomBar')) return;

            const currentPage = getCurrentPage();
            const bar = document.createElement('nav');
            bar.id = 'bottomBar';
            bar.setAttribute('aria-label', 'التنقل الرئيسي');
            bar.setAttribute('role', 'navigation');

            bar.innerHTML = NAV_ITEMS.map(item => {
                const isActive = (currentPage === item.href || currentPage === item.href.replace('.html', ''));
                return `
                    <a
                        href="${item.href}"
                        class="bottom-bar-item${isActive ? ' active' : ''}"
                        data-page="${item.href}"
                        aria-label="${item.label}"
                        ${isActive ? 'aria-current="page"' : ''}
                    >
                        <span class="bottom-bar-icon">${item.icon}</span>
                        <span class="bottom-bar-label">${item.label}</span>
                    </a>`;
            }).join('');

            document.body.appendChild(bar);

            // Attach SPA-like transitions
            bar.querySelectorAll('.bottom-bar-item').forEach(link => {
                link.addEventListener('click', handleNavClick);
            });
        }

        function handleNavClick(e) {
            const target = e.currentTarget;
            const href = target.getAttribute('href');
            if (!href || href === '#') return;

            // If same page, do nothing
            const currentPage = getCurrentPage();
            if (href === currentPage) {
                e.preventDefault();
                return;
            }

            // Haptic feedback (where supported)
            if (navigator.vibrate) { navigator.vibrate(8); }

            // Visual transition before navigate
            e.preventDefault();
            PageTransitions.exit(() => {
                window.location.href = href;
            });
        }

        function init() {
            injectBar();
        }

        return { init };
    })();

    /* =========================================================================
       MODULE 4.1: Combinatorial Wisdom Engine — بنك الحكم العضوي
       ========================================================================= */
    const QuotesEngine = (() => {
        const intros = [
            "في خضم الفوضى،", "عندما يضيق بك الحال،", "أمام عواصف القدر،", 
            "حين تتشابك عليك الأفكار،", "في لحظات الضعف البشري،", "إذا فقدت السيطرة،"
        ];
        const cores = [
            "تذكر أن معاناتك تنبع من حكمك على الأشياء،", 
            "اعلم أن لا شيء يكسرك إلا استسلامك الداخلي،", 
            "راقب أفكارك فهي جذور القلق،", 
            "تجرّد من توقعاتك الزائفة،", 
            "أدرك أن الزمن يلتهم كل قلقك،"
        ];
        const exits = [
            "فامضِ شامخاً.", "وتقبل ما لا تملك السيطرة عليه.", 
            "واسترد سيادتك على عقلك.", "فالخوف وهم تصنعه أنت.", 
            "ولا تكن عبداً لما هو خارج عن إرادتك."
        ];
        
        const famousQuotes = [
            "لا تتوقع أن يصير العالم كما تتمنى... — إبيكتيتوس",
            "السعادة تعتمد على نوعية أفكارك. — ماركوس أوريليوس",
            "نحن نعاني في الخيال أكثر بكثير من الواقع. — سينيكا",
            "من لديه سبب ليعيش، يمكنه أن يتحمل أي طريقة للعيش. — نيتشه",
            "الجرح هو المكان الذي يدخل منه النور إليك. — جلال الدين الرومي",
            "تعب كلها الحياة فما أعجب إلا من راغب في ازدياد. — أبو العلاء المعري"
        ];

        function getRandomWisdom() {
            if (Math.random() > 0.5) {
                return `« ${famousQuotes[Math.floor(Math.random() * famousQuotes.length)]} »`;
            } else {
                return `« ${intros[Math.floor(Math.random() * intros.length)]} ${cores[Math.floor(Math.random() * cores.length)]} ${exits[Math.floor(Math.random() * exits.length)]} »`;
            }
        }
        return { getRandomWisdom };
    })();

    /* =========================================================================
       MODULE 4: Panic Button & Breathing Circle — زر الفزع الوجودي
       ========================================================================= */
    const PanicButton = (() => {

        let breathingInterval = null;

        // 4 seconds inhale, 6 seconds exhale (Biometric calming)
        const BREATHING_PHASES = [
            { label: 'تنفّس ببطء... شهيق عميق', duration: 4000 },
            { label: 'احتبس اللحظة...', duration: 1500 },
            { label: 'ازفر الضيق ببطء متأنٍّ...', duration: 6000 },
            { label: 'توقف... عُد لذاتك.', duration: 1500 },
        ];

        function injectPanicBtn() {
            if (document.getElementById('panicBtn')) return;

            // Panic Button
            const btn = document.createElement('button');
            btn.id = 'panicBtn';
            btn.type = 'button';
            btn.title = 'الفزع الوجودي — بروتوكول التهدئة الفورية';
            btn.setAttribute('aria-label', 'تفعيل دائرة التنفس');
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:none;stroke:rgba(231,76,60,0.80);stroke-width:1.8;stroke-linecap:round">
                    <path d="M12 22C12 22 3 17 3 10a9 9 0 0 1 18 0c0 7-9 12-9 12z"/>
                    <circle cx="12" cy="10" r="3" fill="rgba(231,76,60,0.25)"/>
                </svg>`;
            btn.addEventListener('click', openBreathing);
            document.body.appendChild(btn);

            // Breathing Modal
            const modal = document.createElement('div');
            modal.id = 'breathingModal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', 'دائرة التنفس الوجودي');
            modal.innerHTML = `
                <p style="font-family:'Amiri',serif;font-size:0.9rem;color:var(--text-tertiary);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">
                    بروتوكول إيقاف الهلع
                </p>
                <div id="breathingCircle" role="img" aria-label="دائرة التنفس"></div>
                <p id="breathingLabel" style="font-family:'Amiri',serif;font-size:1.25rem;color:var(--gold-light);letter-spacing:0.06em">
                    تنفّس ببطء... شهيق عميق
                </p>
                <p id="breathingWisdom" style="font-size:0.95rem;color:var(--text-tertiary);max-width:320px;line-height:1.6;margin:15px auto;">
                </p>
                <button id="closeBreathing" type="button">إغلاق الدائرة والعودة</button>
            `;
            document.body.appendChild(modal);

            document.getElementById('closeBreathing').addEventListener('click', closeBreathing);
            modal.addEventListener('click', e => { if (e.target === modal) closeBreathing(); });
        }

        function openBreathing() {
            const modal = document.getElementById('breathingModal');
            if (!modal) return;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            // Inject organic wisdom on open
            document.getElementById('breathingWisdom').textContent = QuotesEngine.getRandomWisdom();
            
            startBreathingCycle();
        }

        function closeBreathing() {
            const modal = document.getElementById('breathingModal');
            if (!modal) return;
            modal.classList.remove('open');
            document.body.style.overflow = '';
            if (breathingInterval) clearTimeout(breathingInterval);
        }

        function startBreathingCycle() {
            let phaseIndex = 0;
            const label = document.getElementById('breathingLabel');

            function nextPhase() {
                if (!label) return;
                const phase = BREATHING_PHASES[phaseIndex % BREATHING_PHASES.length];
                label.style.opacity = '0';
                setTimeout(() => {
                    label.textContent = phase.label;
                    label.style.opacity = '1';
                }, 400);
                phaseIndex++;
            }

            nextPhase();
            const scheduleCycle = () => {
                const phase = BREATHING_PHASES[(phaseIndex - 1) % BREATHING_PHASES.length];
                breathingInterval = setTimeout(() => {
                    nextPhase();
                    scheduleCycle();
                }, phase.duration);
            };
            scheduleCycle();
        }

        function init() {
            injectPanicBtn();
        }

        return { init };
    })();

    /* =========================================================================
       MODULE 5: Page Transitions — انتقالات الصفحات السلسة
       ========================================================================= */
    const PageTransitions = (() => {

        function injectOverlay() {
            if (document.getElementById('pageTransitionOverlay')) return;
            const overlay = document.createElement('div');
            overlay.id = 'pageTransitionOverlay';
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
        }

        function exit(callback) {
            const overlay = document.getElementById('pageTransitionOverlay');
            if (!overlay) { callback(); return; }
            overlay.classList.add('active');
            setTimeout(callback, 420);
        }

        function enter() {
            const overlay = document.getElementById('pageTransitionOverlay');
            if (!overlay) return;
            overlay.classList.remove('active');
        }

        function init() {
            injectOverlay();
            // Animate in on load
            window.addEventListener('pageshow', () => {
                setTimeout(enter, 50);
            });
        }

        return { init, exit, enter };
    })();

    /* =========================================================================
       MODULE 6: Biometric Sync — نبض الصفحة العضوي
       ========================================================================= */
    const BiometricSync = (() => {
        function injectBreath() {
            if (document.getElementById('bioBreathOverlay')) return;
            const div = document.createElement('div');
            div.id = 'bioBreathOverlay';
            div.className = 'bio-breath-overlay';
            document.body.prepend(div);
        }

        function init() {
            injectBreath();
        }

        return { init };
    })();

    /* =========================================================================
       MODULE 7: MasterUI Injector — التذييل السيادي والشعار
       ========================================================================= */
    const MasterUI = (() => {
        function injectFooter() {
            if (document.querySelector('.master-footer')) return;
            const footerHTML = `
                <footer class="master-footer">
                    <div class="master-footer-content">
                        <div class="master-footer-logo">
                            <a href="index.html" class="master-header-logo" style="justify-content: center; margin-bottom: 10px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                                </svg>
                                عقل في صندوق
                            </a>
                        </div>
                        <div class="master-footer-links">
                            <a href="#">الميثاق الأخلاقي</a>
                            <a href="#">سياسة العهد</a>
                            <a href="#">تواصل مع المجلس (الدعم)</a>
                        </div>
                        <div class="master-footer-credo">
                            هذا الملاذ لا يبيع الوهم، بل يبني الصمود. &copy; 2026 جميع حقوق الهندسة المعرفية محفوظة.
                        </div>
                    </div>
                </footer>
            `;
            // Append right before closing body tag, or append to body directly
            // But skip for login page (index.html is login in this app?)
            // We append to body
            const wrapper = document.createElement('div');
            wrapper.innerHTML = footerHTML;
            document.body.appendChild(wrapper.firstElementChild);
        }

        function init() {
            // Delay slightly to ensure page content is loaded
            setTimeout(() => {
                injectFooter();
            }, 500);
        }

        return { init };
    })();

    /* =========================================================================
       MODULE 8: Global Shock Engine — صدمة الإيقاظ المباشرة
       ========================================================================= */
    const GlobalShock = (() => {
        function checkShock() {
            const msg = localStorage.getItem('global_shock_msg');
            if (msg) {
                // Remove it so it only shows once
                localStorage.removeItem('global_shock_msg');
                
                const shockModal = document.createElement('div');
                shockModal.style.cssText = `
                    position: fixed; inset: 0; z-index: 999999;
                    background: rgba(3,3,4,0.95); display: flex;
                    align-items: center; justify-content: center;
                    backdrop-filter: blur(10px); opacity: 0;
                    transition: opacity 1s ease;
                `;
                
                shockModal.innerHTML = `
                    <div class="anti-ai-border" style="background: #0a0a0f; padding: 50px; max-width: 600px; text-align: center; border-color: rgba(231,76,60,0.3) !important;">
                        <h2 style="font-family: var(--font-serif); color: #e74c3c; font-size: 2.5rem; margin-bottom: 20px;">استيقظ</h2>
                        <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-primary); margin-bottom: 40px;">"${msg}"</p>
                        <button class="btn btn-ghost" style="border: 1px solid rgba(231,76,60,0.5); color: #e74c3c;" onclick="this.parentElement.parentElement.remove()">تلقيت الرسالة</button>
                    </div>
                `;
                
                document.body.appendChild(shockModal);
                
                // Trigger reflow and fade in
                setTimeout(() => shockModal.style.opacity = '1', 100);
            }
        }
        return { init: checkShock };
    })();

    /* =========================================================================
       BOOTSTRAP — Initialize All Modules on DOMContentLoaded
       ========================================================================= */
    function boot() {
        SecurityShield.init();
        ManuscriptMode.init();
        PageTransitions.init();
        BottomBar.init();
        PanicButton.init();
        BiometricSync.init();
        MasterUI.init();
        GlobalShock.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    // Expose for inter-module communication if needed
    window.MIB = window.MIB || {};
    window.MIB.ManuscriptMode  = ManuscriptMode;
    window.MIB.PageTransitions = PageTransitions;
    window.MIB.PanicButton     = PanicButton;

})();

    /* =========================================================================
       MODULE 9: Dopamine Retreat � ???? ?????????
       ========================================================================= */
    const DopamineRetreat = (() => {
        function init() {
            if (localStorage.getItem('sys_dopamine_retreat') === 'true') {
                activate();
            }
        }
        function activate() {
            document.documentElement.setAttribute('data-dopamine-retreat', 'true');
            if(!document.getElementById('retreatBreakBtn')) {
                const btn = document.createElement('button');
                btn.id = 'retreatBreakBtn';
                btn.textContent = '??? ??????';
                btn.onclick = promptBreak;
                document.body.appendChild(btn);
            }
        }
        function promptBreak() {
            const answer = prompt('???? ?????? ???????? ????????? ????: "??? ???? ?? ????"');
            if (answer === '??? ???? ?? ????') {
                localStorage.setItem('sys_dopamine_retreat', 'false');
                document.documentElement.removeAttribute('data-dopamine-retreat');
                document.getElementById('retreatBreakBtn').remove();
            } else if (answer !== null) {
                alert('??????? ?????. ?????? ??????? ???? ?????.');
            }
        }
        return { init, activate, promptBreak };
    })();
    // Append to boot function dynamically since we can't edit it directly easily via append
    const oldBoot = boot;
    boot = function() {
        oldBoot();
        DopamineRetreat.init();
    };
