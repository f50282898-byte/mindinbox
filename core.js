/**
 * ==============================================================================
 * MIND IN A BOX â€” CORE SANCTUARY ENGINE
 * Ø§Ù„Ù…Ù„Ù: core.js
 * Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ©: Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø´ØªØ±ÙƒØ© Ø¹Ø¨Ø± ÙƒØ§ÙØ© Ø§Ù„ØµÙØ­Ø§Øª:
 *   â€” ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø®Ø·ÙˆØ·Ø© Ø§Ù„Ø¹ØªÙŠÙ‚Ø©
 *   â€” Ø´Ø±ÙŠØ· Ø§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø³ÙÙ„ÙŠ (Bottom Bar)
 *   â€” Ø²Ø± Ø§Ù„ÙØ²Ø¹ Ø§Ù„ÙˆØ¬ÙˆØ¯ÙŠ ÙˆØ¯Ø§Ø¦Ø±Ø© Ø§Ù„ØªÙ†ÙØ³
 *   â€” Ø¯Ø±Ø¹ Ø§Ù„Ø­ØµØ§Ù†Ø© (Security Shield)
 *   â€” Ø§Ù†ØªÙ‚Ø§Ù„Ø§Øª Ø§Ù„ØµÙØ­Ø§Øª (SPA-like Transitions)
 * ==============================================================================
 */

;(function () {
    'use strict';

    /* =========================================================================
       MODULE 1: Security Shield â€” Ø¯Ø±Ø¹ Ø§Ù„Ø­ØµØ§Ù†Ø© Ø§Ù„ÙÙ„Ø³ÙÙŠ
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
            console.log('%câš”ï¸ Ù…ÙŠØ«Ø§Ù‚ Ø­ØµØ§Ù†Ø© Ø§Ù„Ù…Ù„Ø§Ø° â€” Ø¹Ù‚Ù„ ÙÙŠ ØµÙ†Ø¯ÙˆÙ‚', titleStyle);
            console.log(
                '%c[ØµÙˆØ§Ø¹Ù‚ Ø§Ù„ØªØ­Ø°ÙŠØ±]\nØ£ÙŠÙ‡Ø§ Ø§Ù„Ø¹Ø§Ø¨Ø± ÙÙŠ ÙƒÙˆØ§Ù„ÙŠØ³ Ø§Ù„Ø´ÙŠÙØ±Ø©ØŒ\nÙ‡Ø°Ø§ Ø§Ù„Ù…ÙƒØ§Ù† Ù„ÙŠØ³ Ø³Ø§Ø­Ø© ØªØ·ÙÙ„ ÙˆÙØ¶ÙˆÙ„ Ø±Ø®ÙŠØµ.\nØ§Ù„Ø¹Ù‚ÙˆÙ„ Ø§Ù„Ø­Ø±Ø© ØªØ¨Ù†ÙŠ ØµØ±ÙˆØ­ Ø§Ù„Ø³ÙŠØ§Ø¯Ø© Ø¨Ø¬Ù‡Ø¯ Ù…ØªÙˆØ§ØµÙ„ØŒ\nØ¨ÙŠÙ†Ù…Ø§ Ø§Ù„Ù†ÙÙˆØ³ Ø§Ù„Ù…Ø´ØªØªØ© ØªØªÙ„ØµØµ Ø¹Ù„Ù‰ Ø£Ø­Ø¬Ø§Ø± Ø§Ù„Ø£Ø³Ø§Ø³ Ø£Ù…Ù„Ø§Ù‹ ÙÙŠ Ø§Ø®ØªØµØ§Ø± Ø§Ù„Ø·Ø±ÙŠÙ‚.\n\nØ£ØºÙ„Ù‚ Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø·ÙˆØ± Ø§Ù„Ø¢Ù†ØŒ ÙˆØ¹ÙØ¯ Ø¥Ù„Ù‰ Ù…Ø­Ø±Ø§Ø¨ Ø§Ù†Ø¶Ø¨Ø§Ø·Ùƒ.\nÙ„Ù† ØªØ¬Ø¯ Ù‡Ù†Ø§ Ø³ÙˆÙ‰ Ù…Ø±Ø¢Ø© ÙÙ†Ø§Ø¦Ùƒ Ø§Ù„Ø±Ù‚Ù…ÙŠ!',
                decreeTitleStyle
            );
            console.log(
                '%cÂ« Ø§Ù„Ù…Ø±Ø¡ Ù„Ø§ ÙŠØªØ£Ø°Ù‰ Ù…Ù…Ø§ ÙŠØ­Ø¯Ø«ØŒ Ø¨Ù„ Ø¨Ù…Ø§ ÙŠØ¸Ù†Ù‡ Ø¹Ù…Ø§ ÙŠØ­Ø¯Ø«. Â» â€” Ø¥Ø¨ÙŠÙƒØªÙŠØªÙˆØ³',
                verseStyle
            );
        }

        function init() {
            printWarning();

            // Intercept right-click
            /* window.addEventListener('contextmenu', e => {
                e.preventDefault(); return false; }); */

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
       MODULE 2: Manuscript Mode â€” ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø®Ø·ÙˆØ·Ø© Ø§Ù„Ø¹ØªÙŠÙ‚Ø©
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
                if (label) label.textContent = 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ø¸Ù„Ø§Ù…';
                btn.title = 'ØªÙØ¹ÙŠÙ„ ÙˆØ¶Ø¹ Ø§Ù„Ø¸Ù„Ø§Ù… Ø§Ù„ÙÙ„Ø³ÙÙŠ';
            } else {
                if (icon)  icon.innerHTML = _iconScroll();
                if (label) label.textContent = 'Ù…Ø®Ø·ÙˆØ·Ø©';
                btn.title = 'ØªÙØ¹ÙŠÙ„ ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø®Ø·ÙˆØ·Ø© Ø§Ù„Ø¹ØªÙŠÙ‚Ø©';
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
            btn.title = 'ØªÙØ¹ÙŠÙ„ ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø®Ø·ÙˆØ·Ø© Ø§Ù„Ø¹ØªÙŠÙ‚Ø©';
            btn.setAttribute('aria-label', 'ØªØ¨Ø¯ÙŠÙ„ ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø®Ø·ÙˆØ·Ø©');
            btn.innerHTML = `
                <span class="ms-icon">
                    <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                </span>
                <span class="ms-label">Ù…Ø®Ø·ÙˆØ·Ø©</span>`;
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
       MODULE 3: Bottom Bar â€” Ø´Ø±ÙŠØ· Ø§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø³ÙÙ„ÙŠ Ø§Ù„Ø£ØµÙ„Ø§Ù†ÙŠ
       ========================================================================= */
    const BottomBar = (() => {

        // Define navigation items (icon, label, href)
        const NAV_ITEMS = [
            {
                href: 'dashboard.html',
                label: 'Ø§Ù„Ù…Ø­Ø±Ø§Ø¨',
                icon: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>`
            },
            {
                href: 'reflection.html',
                label: 'Ø§Ù„ØªÙØ±ÙŠØº',
                icon: `<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
            },
            {
                href: 'meditation.html',
                label: 'Ø§Ù„ØªØ£Ù…Ù„',
                icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`
            },
            {
                href: 'schedule.html',
                label: 'Ø§Ù„Ù…ÙŠØ«Ø§Ù‚',
                icon: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
            },
            {
                href: 'vault.html',
                label: 'Ø§Ù„Ø®Ø²ÙŠÙ†Ø©',
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
            bar.setAttribute('aria-label', 'Ø§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ');
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
       MODULE 4: Panic Button & Breathing Circle â€” Ø²Ø± Ø§Ù„ÙØ²Ø¹ Ø§Ù„ÙˆØ¬ÙˆØ¯ÙŠ
       ========================================================================= */
    const PanicButton = (() => {

        let breathingInterval = null;

        // 4 seconds inhale, 6 seconds exhale (Biometric calming)
        const BREATHING_PHASES = [
            { label: 'ØªÙ†ÙÙ‘Ø³ Ø¨Ø¨Ø·Ø¡... Ø´Ù‡ÙŠÙ‚ Ø¹Ù…ÙŠÙ‚', duration: 4000 },
            { label: 'Ø§Ø­ØªØ¨Ø³ Ø§Ù„Ù„Ø­Ø¸Ø©...', duration: 1500 },
            { label: 'Ø§Ø²ÙØ± Ø§Ù„Ø¶ÙŠÙ‚ Ø¨Ø¨Ø·Ø¡ Ù…ØªØ£Ù†ÙÙ‘...', duration: 6000 },
            { label: 'ØªÙˆÙ‚Ù... Ø¹ÙØ¯ Ù„Ø°Ø§ØªÙƒ.', duration: 1500 },
        ];

        function injectPanicBtn() { return;
            if (document.getElementById('panicBtn')) return;

            // Panic Button
            const btn = document.createElement('button');
            btn.id = 'panicBtn';
            btn.type = 'button';
            btn.title = 'Ø§Ù„ÙØ²Ø¹ Ø§Ù„ÙˆØ¬ÙˆØ¯ÙŠ â€” Ø¨Ø±ÙˆØªÙˆÙƒÙˆÙ„ Ø§Ù„ØªÙ‡Ø¯Ø¦Ø© Ø§Ù„ÙÙˆØ±ÙŠØ©';
            btn.setAttribute('aria-label', 'ØªÙØ¹ÙŠÙ„ Ø¯Ø§Ø¦Ø±Ø© Ø§Ù„ØªÙ†ÙØ³');
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
            modal.setAttribute('aria-label', 'Ø¯Ø§Ø¦Ø±Ø© Ø§Ù„ØªÙ†ÙØ³ Ø§Ù„ÙˆØ¬ÙˆØ¯ÙŠ');
            modal.innerHTML = `
                <p style="font-family:'Amiri',serif;font-size:0.9rem;color:var(--text-tertiary);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">
                    Ø¨Ø±ÙˆØªÙˆÙƒÙˆÙ„ Ø¥ÙŠÙ‚Ø§Ù Ø§Ù„Ù‡Ù„Ø¹
                </p>
                <div id="breathingCircle" role="img" aria-label="Ø¯Ø§Ø¦Ø±Ø© Ø§Ù„ØªÙ†ÙØ³"></div>
                <p id="breathingLabel" style="font-family:'Amiri',serif;font-size:1.25rem;color:var(--gold-light);letter-spacing:0.06em">
                    ØªÙ†ÙÙ‘Ø³ Ø¨Ø¨Ø·Ø¡... Ø´Ù‡ÙŠÙ‚ Ø¹Ù…ÙŠÙ‚
                </p>
                <p id="breathingWisdom" style="font-size:0.95rem;color:var(--text-tertiary);max-width:320px;line-height:1.6;margin:15px auto;">
                </p>
                <button id="closeBreathing" type="button">Ø¥ØºÙ„Ø§Ù‚ Ø§Ù„Ø¯Ø§Ø¦Ø±Ø© ÙˆØ§Ù„Ø¹ÙˆØ¯Ø©</button>
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
            document.getElementById('breathingWisdom').textContent = "تنفس بوعي، واستعد سيادتك.";
            
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
       MODULE 5: Page Transitions â€” Ø§Ù†ØªÙ‚Ø§Ù„Ø§Øª Ø§Ù„ØµÙØ­Ø§Øª Ø§Ù„Ø³Ù„Ø³Ø©
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
       MODULE 6: Biometric Sync â€” Ù†Ø¨Ø¶ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø¹Ø¶ÙˆÙŠ
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
    }

    // Expose for inter-module communication if needed
    window.MIB = window.MIB || {};
    window.MIB.ManuscriptMode  = ManuscriptMode;
    window.MIB.PageTransitions = PageTransitions;
    window.MIB.PanicButton     = PanicButton;

})();

    /* =========================================================================
   CLEANUP & PURGE: Remove legacy intrusive elements and reset storage
   ========================================================================= */
(function() {
    try {
        localStorage.removeItem('sys_dopamine_retreat');
        document.documentElement.removeAttribute('data-dopamine-retreat');
        const rBtn = document.getElementById('retreatBreakBtn');
        if (rBtn) rBtn.remove();
        const pBtn = document.getElementById('panicBtn');
        if (pBtn) pBtn.remove();
        const bModal = document.getElementById('breathingModal');
        if (bModal) bModal.remove();
    } catch(e) {}
})();