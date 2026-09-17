/**
 * ==============================================================================
 * MIND IN A BOX — BRAND IDENTITY SYSTEM
 * ملف: brand.js
 * الوصف: الهوية البصرية الكاملة — الشعارات (SVG)، الرموز المقدسة، 
 *         الصور الحية، وأدوات الحقن الديناميكي.
 * ==============================================================================
 */

;(function() {
    'use strict';

    /* =========================================================================
       1. SVG LOGO SYSTEM — 3 Variants
       ========================================================================= */

    /**
     * الشعار الكامل (Full Logo)
     * المفهوم: إطار هندسي صارم (صندوق) يحتضن لهب تنفس متوهج.
     * الخطوط الخارجية = الصندوق (العقل المحاصر).
     * اللهب الداخلي = الوعي المتقد الذي يسعى للخروج.
     * الخط الأفقي السفلي = القاعدة الرواقية (الثبات).
     */
    const LOGO_FULL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" fill="none" role="img" aria-label="عقل في صندوق">
  <!-- الإطار الخارجي: الصندوق -->
  <rect x="8" y="8" width="64" height="64" rx="3" ry="3"
        stroke="#b59551" stroke-width="1.8" fill="none" opacity="0.85"/>
  <!-- الإطار الداخلي: الطبقة الثانية من الحصار -->
  <rect x="15" y="15" width="50" height="50" rx="2" ry="2"
        stroke="#b59551" stroke-width="0.8" fill="none" opacity="0.35"/>
  <!-- لهب التنفس: 3 طبقات بشفافية متدرجة -->
  <path d="M40 52 C40 52, 32 40, 33 33 C34 26, 40 20, 40 20 C40 20, 46 26, 47 33 C48 40, 40 52, 40 52Z"
        fill="#c5a059" opacity="0.65"/>
  <path d="M40 48 C40 48, 35 40, 35.5 35 C36 30, 40 25, 40 25 C40 25, 44 30, 44.5 35 C45 40, 40 48, 40 48Z"
        fill="#e5b964" opacity="0.45"/>
  <path d="M40 43 C40 43, 37.5 38, 38 35.5 C38.5 33, 40 30, 40 30 C40 30, 41.5 33, 42 35.5 C42.5 38, 40 43, 40 43Z"
        fill="#f5d98a" opacity="0.30"/>
  <!-- القاعدة الرواقية -->
  <line x1="18" y1="58" x2="62" y2="58"
        stroke="#b59551" stroke-width="1" opacity="0.50" stroke-linecap="round"/>
  <!-- النص: عقل في صندوق -->
  <text x="88" y="36" font-family="'Amiri', Georgia, serif" font-size="22" font-weight="700"
        fill="#e5b964" letter-spacing="0.04em" opacity="0.92">عقل في صندوق</text>
  <text x="88" y="58" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="400"
        fill="#9a9da8" letter-spacing="0.12em" opacity="0.60">MIND IN A BOX</text>
</svg>`;

    /**
     * الأيقونة المصغرة (Favicon / App Icon)
     * نفس المفهوم مكثف في 32×32
     */
    const LOGO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" role="img" aria-label="عقل في صندوق — أيقونة">
  <rect x="2" y="2" width="28" height="28" rx="2" ry="2"
        stroke="#b59551" stroke-width="1.5" fill="#07070a" opacity="0.90"/>
  <rect x="5" y="5" width="22" height="22" rx="1.5" ry="1.5"
        stroke="#b59551" stroke-width="0.6" fill="none" opacity="0.28"/>
  <path d="M16 24 C16 24, 11 18, 11.5 14 C12 10, 16 7, 16 7 C16 7, 20 10, 20.5 14 C21 18, 16 24, 16 24Z"
        fill="#c5a059" opacity="0.72"/>
  <path d="M16 21 C16 21, 13 17, 13.3 14.5 C13.6 12, 16 9.5, 16 9.5 C16 9.5, 18.4 12, 18.7 14.5 C19 17, 16 21, 16 21Z"
        fill="#e5b964" opacity="0.45"/>
  <line x1="7" y1="25" x2="25" y2="25"
        stroke="#b59551" stroke-width="0.8" opacity="0.45" stroke-linecap="round"/>
</svg>`;

    /**
     * النسخة أحادية اللون (للطباعة)
     * بدون تدرجات لونية — حبر أسود خالص على ورق
     */
    const LOGO_MONO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" fill="none" role="img" aria-label="عقل في صندوق — طباعة">
  <rect x="8" y="8" width="64" height="64" rx="3" ry="3"
        stroke="#1a1a1a" stroke-width="2" fill="none"/>
  <rect x="15" y="15" width="50" height="50" rx="2" ry="2"
        stroke="#1a1a1a" stroke-width="0.8" fill="none" opacity="0.40"/>
  <path d="M40 52 C40 52, 32 40, 33 33 C34 26, 40 20, 40 20 C40 20, 46 26, 47 33 C48 40, 40 52, 40 52Z"
        fill="#1a1a1a" opacity="0.80"/>
  <path d="M40 43 C40 43, 37.5 38, 38 35.5 C38.5 33, 40 30, 40 30 C40 30, 41.5 33, 42 35.5 C42.5 38, 40 43, 40 43Z"
        fill="#fff" opacity="0.90"/>
  <line x1="18" y1="58" x2="62" y2="58"
        stroke="#1a1a1a" stroke-width="1.2" opacity="0.55" stroke-linecap="round"/>
  <text x="88" y="36" font-family="'Amiri', Georgia, serif" font-size="22" font-weight="700"
        fill="#1a1a1a" letter-spacing="0.04em">عقل في صندوق</text>
  <text x="88" y="58" font-family="'Cairo', sans-serif" font-size="10.5" font-weight="400"
        fill="#555" letter-spacing="0.12em">MIND IN A BOX</text>
</svg>`;

    /* =========================================================================
       2. SACRED SYMBOLS — الرموز المقدسة
       ========================================================================= */

    /**
     * طيف الذكاء الاصطناعي (AI Spirit Glow)
     * هالة دافئة خافتة توحي بوعي غير مرئي يراقب بصمت
     */
    const SYMBOL_AI_SPIRIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" role="img" aria-label="طيف الحكيم">
  <defs>
    <radialGradient id="spiritGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e5b964" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="#c5a059" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#b59551" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- الهالة الخارجية -->
  <circle cx="24" cy="24" r="22" fill="url(#spiritGlow)"/>
  <!-- النواة الواعية: عين مفتوحة قليلاً -->
  <ellipse cx="24" cy="24" rx="8" ry="5"
           stroke="#c5a059" stroke-width="1" fill="none" opacity="0.55"/>
  <circle cx="24" cy="24" r="2"
          fill="#e5b964" opacity="0.70"/>
  <!-- خطوط الإشعاع الهادئ (4 خطوط متقاطعة) -->
  <line x1="24" y1="6"  x2="24" y2="14" stroke="#c5a059" stroke-width="0.5" opacity="0.20" stroke-linecap="round"/>
  <line x1="24" y1="34" x2="24" y2="42" stroke="#c5a059" stroke-width="0.5" opacity="0.20" stroke-linecap="round"/>
  <line x1="6"  y1="24" x2="14" y2="24" stroke="#c5a059" stroke-width="0.5" opacity="0.20" stroke-linecap="round"/>
  <line x1="34" y1="24" x2="42" y2="24" stroke="#c5a059" stroke-width="0.5" opacity="0.20" stroke-linecap="round"/>
</svg>`;

    /**
     * ختم الإنجاز النحاسي (Copper Achievement Seal)
     * ختم دائري محفور بزخارف هندسية — يُمنح عند الاتزان
     */
    const SYMBOL_ACHIEVEMENT_SEAL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" role="img" aria-label="ختم الإنجاز">
  <!-- الحلقة الخارجية المسننة (12 سناً = 12 شهراً) -->
  <circle cx="32" cy="32" r="28" stroke="#b59551" stroke-width="1.5" fill="none" opacity="0.80"/>
  <circle cx="32" cy="32" r="25" stroke="#b59551" stroke-width="0.5" fill="none" opacity="0.30"
          stroke-dasharray="4.2 4.2"/>
  <!-- الحلقة الداخلية -->
  <circle cx="32" cy="32" r="18" stroke="#c5a059" stroke-width="1" fill="none" opacity="0.55"/>
  <!-- رمز الميزان (الاتزان) داخل الختم -->
  <line x1="24" y1="35" x2="40" y2="35" stroke="#e5b964" stroke-width="1.2" opacity="0.75" stroke-linecap="round"/>
  <line x1="32" y1="35" x2="32" y2="24" stroke="#e5b964" stroke-width="1.2" opacity="0.75" stroke-linecap="round"/>
  <line x1="26" y1="30" x2="32" y2="24" stroke="#e5b964" stroke-width="0.8" opacity="0.50" stroke-linecap="round"/>
  <line x1="38" y1="30" x2="32" y2="24" stroke="#e5b964" stroke-width="0.8" opacity="0.50" stroke-linecap="round"/>
  <!-- الكفتان -->
  <path d="M24 30 C24 30, 22 33, 26 33 C30 33, 28 30, 24 30Z" fill="#c5a059" opacity="0.40"/>
  <path d="M40 30 C40 30, 38 33, 42 33 C46 33, 44 30, 40 30Z" fill="#c5a059" opacity="0.40"/>
  <!-- النجمة العلوية (الحكمة) -->
  <polygon points="32,8 33.2,12.5 37,12.5 34,15 35.2,19.5 32,17 28.8,19.5 30,15 27,12.5 30.8,12.5"
           fill="#c5a059" opacity="0.45"/>
</svg>`;

    /* =========================================================================
       3. LIVE IMAGE CATALOG — صور Unsplash الحية والمستقرة
       ========================================================================= */

    const IMAGES = {
        // تمثال فيلسوف رخامي بإضاءة جانبية درامية
        stoicBust: {
            src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80',
            thumb: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=80&q=30',
            alt: 'تمثال رخامي لفيلسوف رواقي بإضاءة درامية',
            fallbackColor: '#0a0a0e',
            css: 'filter: grayscale(100%) contrast(125%) brightness(42%); mix-blend-mode: luminosity;'
        },
        // ورق بردي متآكل الأطراف
        papyrusTexture: {
            src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
            thumb: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=80&q=30',
            alt: 'نسيج ورق بردي عتيق متآكل الأطراف',
            fallbackColor: '#1a150e',
            css: 'mix-blend-mode: multiply; opacity: 0.15;'
        },
        // أعمدة إغريقية بإضاءة معتمة
        greekColumns: {
            src: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&w=1400&q=80',
            thumb: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&w=80&q=30',
            alt: 'أعمدة إغريقية عتيقة في ضوء خافت',
            fallbackColor: '#080808',
            css: 'filter: grayscale(100%) contrast(130%) brightness(35%); opacity: 0.20;'
        },
        // طيف الحكيم (خلف مربع النص)
        sageGhost: {
            src: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=1000&q=80',
            thumb: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=80&q=30',
            alt: 'طيف وجه حكيم في ظلال خافتة',
            fallbackColor: '#0c0c10',
            css: 'filter: grayscale(100%) contrast(150%); opacity: 0.04; mix-blend-mode: luminosity;'
        },
        // لهب حرق الماضي
        burningFlame: {
            src: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
            thumb: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=80&q=30',
            alt: 'لهب في عتمة ليلية',
            fallbackColor: '#120808',
            css: 'mix-blend-mode: screen; opacity: 0.15;'
        },
        // بوصلة العهد
        compass: {
            src: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
            thumb: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=80&q=30',
            alt: 'بوصلة نحاسية عتيقة على خريطة',
            fallbackColor: '#0e0e0a',
            css: 'filter: grayscale(100%) contrast(120%); opacity: 0.12;'
        },
        // ختم الملاذ (للمجلس السري)
        sanctuarySeal: {
            src: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=800&q=80',
            thumb: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=80&q=30',
            alt: 'ختم شمعي عتيق',
            fallbackColor: '#100a06',
            css: 'opacity: 0.30;'
        }
    };

    /* =========================================================================
       4. IMAGE INJECTION ENGINE — محرك الحقن مع Lazy Loading & Fallbacks
       ========================================================================= */

    /**
     * Creates an <img> element with:
     * - Native lazy loading
     * - Fallback background color
     * - Low-quality placeholder (thumb) via CSS
     * - Error recovery (hides broken image, shows fallback color)
     */
    function createBrandImage(imageKey, extraClasses = '', extraStyles = '') {
        const img = IMAGES[imageKey];
        if (!img) return null;

        const el = document.createElement('div');
        el.className = `brand-img brand-img--${imageKey} ${extraClasses}`.trim();
        el.setAttribute('role', 'img');
        el.setAttribute('aria-label', img.alt);
        el.style.cssText = `
            background-color: ${img.fallbackColor};
            background-image: url('${img.thumb}');
            background-size: cover;
            background-position: center;
            position: relative;
            overflow: hidden;
            ${extraStyles}
        `;

        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt;
        imgEl.loading = 'lazy';
        imgEl.decoding = 'async';
        imgEl.style.cssText = `
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            ${img.css}
            transition: opacity 1.2s ease;
            opacity: 0;
        `;

        // On load: cross-fade from thumb to full image
        imgEl.onload = function() {
            this.style.opacity = '';
            // Parse the css string to re-apply opacity from img.css
            const match = img.css.match(/opacity:\s*([\d.]+)/);
            this.style.opacity = match ? match[1] : '1';
        };

        // On error: hide broken image, fallback color stays
        imgEl.onerror = function() {
            this.style.display = 'none';
        };

        el.appendChild(imgEl);
        return el;
    }

    /**
     * Injects an SVG string into a target container
     */
    function injectSVG(containerId, svgString, width, height) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = svgString;
        const svg = container.querySelector('svg');
        if (svg) {
            if (width)  svg.setAttribute('width', width);
            if (height) svg.setAttribute('height', height);
        }
    }

    /* =========================================================================
       5. FAVICON INJECTION — حقن الأيقونة ديناميكياً
       ========================================================================= */

    function injectFavicon() {
        // Remove any existing favicon
        const existing = document.querySelectorAll('link[rel*="icon"]');
        existing.forEach(el => el.remove());

        // Encode the icon SVG as a data URI
        const encoded = 'data:image/svg+xml,' + encodeURIComponent(LOGO_ICON);

        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = encoded;
        document.head.appendChild(link);
    }

    /* =========================================================================
       6. AUTO-INIT — Bootstrap on DOMContentLoaded
       ========================================================================= */

    function init() {
        // 1. Inject favicon
        injectFavicon();

        // 2. Inject full logo into any element with id="brandLogo"
        injectSVG('brandLogo', LOGO_FULL, '220', '65');

        // 3. Inject icon logo into any element with id="brandIcon"
        injectSVG('brandIcon', LOGO_ICON, '32', '32');

        // 4. Inject AI Spirit into any element with id="aiSpirit"
        injectSVG('aiSpirit', SYMBOL_AI_SPIRIT, '48', '48');

        // 5. Inject Achievement Seal into any element with class="achievement-seal-slot"
        document.querySelectorAll('.achievement-seal-slot').forEach(slot => {
            slot.innerHTML = SYMBOL_ACHIEVEMENT_SEAL;
            const svg = slot.querySelector('svg');
            if (svg) {
                svg.setAttribute('width', slot.dataset.size || '48');
                svg.setAttribute('height', slot.dataset.size || '48');
            }
        });

        // 6. Auto-inject brand images into slots
        document.querySelectorAll('[data-brand-img]').forEach(slot => {
            const key = slot.dataset.brandImg;
            const imgEl = createBrandImage(key, '', 'width:100%;height:100%;');
            if (imgEl) {
                slot.style.position = 'relative';
                slot.style.overflow = 'hidden';
                imgEl.style.position = 'absolute';
                imgEl.style.inset = '0';
                slot.prepend(imgEl);
            }
        });

        // 7. Mechanical Theme Switch (Replaces old manuscriptToggle)
        setTimeout(() => {
            // Remove old toggle if it exists
            const oldToggle = document.getElementById('manuscriptToggle');
            if (oldToggle) oldToggle.remove();

            const footerLinks = document.querySelector('.master-footer-links');
            if (!footerLinks) return;

            const currentTheme = localStorage.getItem('mind_theme_preference');
            const isManuscript = currentTheme === 'manuscript';

            const switchContainer = document.createElement('div');
            switchContainer.className = 'mech-switch-container';
            switchContainer.innerHTML = `
                <span class="mech-label" style="opacity: 0.5;">ليلي</span>
                <button type="button" class="mech-switch" data-active="${isManuscript}" aria-label="تبديل وضع المخطوطة" title="تبديل المظهر"></button>
                <span class="mech-label" style="opacity: 0.8;">مخطوطة</span>
            `;

            footerLinks.insertAdjacentElement('afterend', switchContainer);
            switchContainer.style.marginTop = '20px';
            switchContainer.style.justifyContent = 'center';

            const mechBtn = switchContainer.querySelector('.mech-switch');
            
            mechBtn.addEventListener('click', () => {
                const isActive = mechBtn.getAttribute('data-active') === 'true';
                const newState = !isActive;
                
                mechBtn.setAttribute('data-active', newState);
                
                if (newState) {
                    document.documentElement.setAttribute('data-mode', 'manuscript');
                    localStorage.setItem('mind_theme_preference', 'manuscript');
                    // Sync with old core.js so it doesn't break
                    localStorage.setItem('mib_manuscript_mode', '1');
                } else {
                    document.documentElement.removeAttribute('data-mode');
                    localStorage.setItem('mind_theme_preference', 'dark');
                    localStorage.setItem('mib_manuscript_mode', '0');
                }
            });
        }, 100);
    }

    document.addEventListener('DOMContentLoaded', init);

    /* =========================================================================
       7. PUBLIC API
       ========================================================================= */

    window.MindBrand = {
        logos: {
            full: LOGO_FULL,
            icon: LOGO_ICON,
            mono: LOGO_MONO
        },
        symbols: {
            aiSpirit: SYMBOL_AI_SPIRIT,
            achievementSeal: SYMBOL_ACHIEVEMENT_SEAL
        },
        images: IMAGES,
        createImage: createBrandImage,
        injectSVG: injectSVG,
        injectFavicon: injectFavicon
    };

})();

