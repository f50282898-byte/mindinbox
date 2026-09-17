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
       MODULE 4.1: Combinatorial Wisdom Engine â€” Ø¨Ù†Ùƒ Ø§Ù„Ø­ÙƒÙ… Ø§Ù„Ø¹Ø¶ÙˆÙŠ
       ========================================================================= */
    const QuotesEngine = (() => {
        const intros = [
            "ÙÙŠ Ø®Ø¶Ù… Ø§Ù„ÙÙˆØ¶Ù‰ØŒ", "Ø¹Ù†Ø¯Ù…Ø§ ÙŠØ¶ÙŠÙ‚ Ø¨Ùƒ Ø§Ù„Ø­Ø§Ù„ØŒ", "Ø£Ù…Ø§Ù… Ø¹ÙˆØ§ØµÙ Ø§Ù„Ù‚Ø¯Ø±ØŒ", 
            "Ø­ÙŠÙ† ØªØªØ´Ø§Ø¨Ùƒ Ø¹Ù„ÙŠÙƒ Ø§Ù„Ø£ÙÙƒØ§Ø±ØŒ", "ÙÙŠ Ù„Ø­Ø¸Ø§Øª Ø§Ù„Ø¶Ø¹Ù Ø§Ù„Ø¨Ø´Ø±ÙŠØŒ", "Ø¥Ø°Ø§ ÙÙ‚Ø¯Øª Ø§Ù„Ø³ÙŠØ·Ø±Ø©ØŒ"
        ];
        const cores = [
            "ØªØ°ÙƒØ± Ø£Ù† Ù…Ø¹Ø§Ù†Ø§ØªÙƒ ØªÙ†Ø¨Ø¹ Ù…Ù† Ø­ÙƒÙ…Ùƒ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ø´ÙŠØ§Ø¡ØŒ", 
            "Ø§Ø¹Ù„Ù… Ø£Ù† Ù„Ø§ Ø´ÙŠØ¡ ÙŠÙƒØ³Ø±Ùƒ Ø¥Ù„Ø§ Ø§Ø³ØªØ³Ù„Ø§Ù…Ùƒ Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØŒ", 
            "Ø±Ø§Ù‚Ø¨ Ø£ÙÙƒØ§Ø±Ùƒ ÙÙ‡ÙŠ Ø¬Ø°ÙˆØ± Ø§Ù„Ù‚Ù„Ù‚ØŒ", 
            "ØªØ¬Ø±Ù‘Ø¯ Ù…Ù† ØªÙˆÙ‚Ø¹Ø§ØªÙƒ Ø§Ù„Ø²Ø§Ø¦ÙØ©ØŒ", 
            "Ø£Ø¯Ø±Ùƒ Ø£Ù† Ø§Ù„Ø²Ù…Ù† ÙŠÙ„ØªÙ‡Ù… ÙƒÙ„ Ù‚Ù„Ù‚ÙƒØŒ"
        ];
        const exits = [
            "ÙØ§Ù…Ø¶Ù Ø´Ø§Ù…Ø®Ø§Ù‹.", "ÙˆØªÙ‚Ø¨Ù„ Ù…Ø§ Ù„Ø§ ØªÙ…Ù„Ùƒ Ø§Ù„Ø³ÙŠØ·Ø±Ø© Ø¹Ù„ÙŠÙ‡.", 
            "ÙˆØ§Ø³ØªØ±Ø¯ Ø³ÙŠØ§Ø¯ØªÙƒ Ø¹Ù„Ù‰ Ø¹Ù‚Ù„Ùƒ.", "ÙØ§Ù„Ø®ÙˆÙ ÙˆÙ‡Ù… ØªØµÙ†Ø¹Ù‡ Ø£Ù†Øª.", 
            "ÙˆÙ„Ø§ ØªÙƒÙ† Ø¹Ø¨Ø¯Ø§Ù‹ Ù„Ù…Ø§ Ù‡Ùˆ Ø®Ø§Ø±Ø¬ Ø¹Ù† Ø¥Ø±Ø§Ø¯ØªÙƒ."
        ];
        
        const famousQuotes = [
            "Ù„Ø§ ØªØªÙˆÙ‚Ø¹ Ø£Ù† ÙŠØµÙŠØ± Ø§Ù„Ø¹Ø§Ù„Ù… ÙƒÙ…Ø§ ØªØªÙ…Ù†Ù‰... â€” Ø¥Ø¨ÙŠÙƒØªÙŠØªÙˆØ³",
            "Ø§Ù„Ø³Ø¹Ø§Ø¯Ø© ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ù†ÙˆØ¹ÙŠØ© Ø£ÙÙƒØ§Ø±Ùƒ. â€” Ù…Ø§Ø±ÙƒÙˆØ³ Ø£ÙˆØ±ÙŠÙ„ÙŠÙˆØ³",
            "Ù†Ø­Ù† Ù†Ø¹Ø§Ù†ÙŠ ÙÙŠ Ø§Ù„Ø®ÙŠØ§Ù„ Ø£ÙƒØ«Ø± Ø¨ÙƒØ«ÙŠØ± Ù…Ù† Ø§Ù„ÙˆØ§Ù‚Ø¹. â€” Ø³ÙŠÙ†ÙŠÙƒØ§",
            "Ù…Ù† Ù„Ø¯ÙŠÙ‡ Ø³Ø¨Ø¨ Ù„ÙŠØ¹ÙŠØ´ØŒ ÙŠÙ…ÙƒÙ†Ù‡ Ø£Ù† ÙŠØªØ­Ù…Ù„ Ø£ÙŠ Ø·Ø±ÙŠÙ‚Ø© Ù„Ù„Ø¹ÙŠØ´. â€” Ù†ÙŠØªØ´Ù‡",
            "Ø§Ù„Ø¬Ø±Ø­ Ù‡Ùˆ Ø§Ù„Ù…ÙƒØ§Ù† Ø§Ù„Ø°ÙŠ ÙŠØ¯Ø®Ù„ Ù…Ù†Ù‡ Ø§Ù„Ù†ÙˆØ± Ø¥Ù„ÙŠÙƒ. â€” Ø¬Ù„Ø§Ù„ Ø§Ù„Ø¯ÙŠÙ† Ø§Ù„Ø±ÙˆÙ…ÙŠ",
            "ØªØ¹Ø¨ ÙƒÙ„Ù‡Ø§ Ø§Ù„Ø­ÙŠØ§Ø© ÙÙ…Ø§ Ø£Ø¹Ø¬Ø¨ Ø¥Ù„Ø§ Ù…Ù† Ø±Ø§ØºØ¨ ÙÙŠ Ø§Ø²Ø¯ÙŠØ§Ø¯. â€” Ø£Ø¨Ùˆ Ø§Ù„Ø¹Ù„Ø§Ø¡ Ø§Ù„Ù…Ø¹Ø±ÙŠ"
        ];

        function getRandomWisdom() {
            if (Math.random() > 0.5) {
                return `Â« ${famousQuotes[Math.floor(Math.random() * famousQuotes.length)]} Â»`;
            } else {
                return `Â« ${intros[Math.floor(Math.random() * intros.length)]} ${cores[Math.floor(Math.random() * cores.length)]} ${exits[Math.floor(Math.random() * exits.length)]} Â»`;
            }
        }
        return { getRandomWisdom };
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

        function injectPanicBtn() {
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
    })();

    /* =========================================================================
       MODULE 7: MasterUI Injector â€” Ø§Ù„ØªØ°ÙŠÙŠÙ„ Ø§Ù„Ø³ÙŠØ§Ø¯ÙŠ ÙˆØ§Ù„Ø´Ø¹Ø§Ø±
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
                                Ø¹Ù‚Ù„ ÙÙŠ ØµÙ†Ø¯ÙˆÙ‚
                            </a>
                        </div>
                        <div class="master-footer-links">
                            <a href="#">Ø§Ù„Ù…ÙŠØ«Ø§Ù‚ Ø§Ù„Ø£Ø®Ù„Ø§Ù‚ÙŠ</a>
                            <a href="#">Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø¹Ù‡Ø¯</a>
                            <a href="#">ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ø§Ù„Ù…Ø¬Ù„Ø³ (Ø§Ù„Ø¯Ø¹Ù…)</a>
                        </div>
                        <div class="master-footer-credo">
                            Ù‡Ø°Ø§ Ø§Ù„Ù…Ù„Ø§Ø° Ù„Ø§ ÙŠØ¨ÙŠØ¹ Ø§Ù„ÙˆÙ‡Ù…ØŒ Ø¨Ù„ ÙŠØ¨Ù†ÙŠ Ø§Ù„ØµÙ…ÙˆØ¯. &copy; 2026 Ø¬Ù…ÙŠØ¹ Ø­Ù‚ÙˆÙ‚ Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…Ø¹Ø±ÙÙŠØ© Ù…Ø­ÙÙˆØ¸Ø©.
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
       MODULE 8: Global Shock Engine â€” ØµØ¯Ù…Ø© Ø§Ù„Ø¥ÙŠÙ‚Ø§Ø¸ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø©
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
                        <h2 style="font-family: var(--font-serif); color: #e74c3c; font-size: 2.5rem; margin-bottom: 20px;">Ø§Ø³ØªÙŠÙ‚Ø¸</h2>
                        <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-primary); margin-bottom: 40px;">"${msg}"</p>
                        <button class="btn btn-ghost" style="border: 1px solid rgba(231,76,60,0.5); color: #e74c3c;" onclick="this.parentElement.parentElement.remove()">ØªÙ„Ù‚ÙŠØª Ø§Ù„Ø±Ø³Ø§Ù„Ø©</button>
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
       BOOTSTRAP â€” Initialize All Modules on DOMContentLoaded
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
       MODULE 9: Dopamine Retreat — ???? ?????????
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
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', DopamineRetreat.init); } else { DopamineRetreat.init(); }

