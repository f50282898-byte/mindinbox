/**
 * ==============================================================================
 * MIND IN A BOX — AI CORE NEURAL SERVICE (aiCoreService)
 * Version: 7.0.0 — Sovereign Sage & Tri-Tier Philosophy Engine
 * ==============================================================================
 * Architecture:
 * 1. Three Tiers of Sage Consultation (Standard Local, Pro Socratic, Ultra Existential)
 * 2. Secure Backend Connection with Silent Offline Organic Fallback
 * 3. Request Queue Engine with In-Flight Deduplication & Semantic Cache
 * 4. Human Cadence Typewriter Engine & Organic Ink Typing Indicator
 * 5. Psychological Ego Destroyer & Global Sanctuary Security Shields
 * ==============================================================================
 */

const AICore = (() => {
    'use strict';

    // --- 1. Configuration & Endpoints ---
    const CONFIG = {
        API_ENDPOINT: (window.ENV && window.ENV.API_ENDPOINT) || '/api/sage',
        HEALTH_ENDPOINT: (window.ENV && window.ENV.HEALTH_ENDPOINT) || '/api/health',
        RATE_LIMIT_DELAY: 1800, // 1.8s minimum cadence between network calls
        PING_TIMEOUT: 2500,     // 2.5s maximum wait for health ping
        MAX_QUEUE_SIZE: 15
    };

    // Communication Tiers
    const TIERS = {
        STANDARD: 'standard', // المستوى العادي (حكمة الأرشيف العضوي - مجاني)
        PRO: 'pro',           // المستوى التفكيري (التحليل السقراطي - Pro)
        ULTRA: 'ultra'        // المستوى الفلسفي العالي القوة (الرؤية الوجودية - Ultra Pro)
    };

    let activeTier = TIERS.PRO;
    let isServerConnected = false;
    let isCheckingConnection = false;

    // --- 2. The Comprehensive Curated Local Wisdom Bank (المستوى العادي / المجاني + الأرشيف العضوي) ---
    // بنك حكم مقسم حسب البواعث والاضطرابات النفسية لتقديم استجابات فورية عميقة دون استهلاك الـ API
    const WISDOM_BANK = {
        // مواقف الهلع والخوف الوجودي (Panic & Grounding First)
        panic: [
            "تنفس الآن ببطء... ضع يدك على صدرك واشعر بالنبض. أنت هنا، حي، والأرض تحتك لم تمِد. الأفكار التي تخنقك ليست حقيقتك، بل هي غيوم سوداء عابرة في سماء روحك الصامتة. أغمض عينيك نصف إغماضة، واعلم أن كل عاصفة لا بد أن تسكن.",
            "اثبت مكانك. لا تتخذ قراراً وأنت في قاع الروع. انظر حولك: ما تراه عيناك حقيقي، وما ينسجه قلقك مجرد سراب في الرمال. خذ شهيقاً عميقاً من أنفك، وازفره ببطء. أنت لست هذا الخوف؛ أنت الشاهد الحكيم الذي يراه.",
            "الارتجاف الذي يسري في أطرافك ليس نهاية المطاف، بل طاقة حبيسة تبحث عن مخرج. لا تقاومه بل اقبله واجلس معه في صمت. حتى الجبال تهتز ثم تركد. ركودك يبدأ الآن بأنفاسك هذه."
        ],

        // التشتت وضعف الإرادة والكسل
        distraction: [
            "الذي يطارد أرنبين في آن واحد لا يمسك أياً منهما. تشتتك ليس لعنة مفروضة، بل هو ثمن تهربك من مواجهة العمل الجوهري. اغلق النوافذ كلها، وأعطِ روحك لساعة واحدة من التركيز الصارم.",
            "أنت لا تفتقر إلى الوقت، بل تبدد طاقتك في التفاهات طلباً لمتعة رخيصة تخدر يقظتك. العظمة تبدأ من القدرة على البقاء في غرفة واحدة وحيداً مع مهمتك دون أن تنهار.",
            "كل نقرة طائشة وكل نظرة شاردة هي خيانة ميثاقك مع ذاتك المستقبلية. استرد سيادتك الآن؛ ابدأ بالفعل الصغير الذي تؤجله منذ الصباح."
        ],

        // الحزن والأسى والخذلان
        grief: [
            "ما مضى قد مات، وأنت لن تحييه بدموعك ولا بعتابك للريح. الحزن رسول يحمل لك رسالة: أن ما تعلقت به لم يكن ملكك أبداً. اقرأ الرسالة، واشكر الرسول، ثم دعه يمضي بسلام.",
            "الندوب التي تحملها في صدرك ليست دليلاً على ضعفك، بل هي أختام المعارك التي نجوت منها. ألمك اليوم هو الطمي الذي ستنبت منه حكمتك غداً. قف على قدميك، فالقافلة لا تنتظر النادبين.",
            "الخيبة لا تأتي من الآخرين، بل تأتي من قصر نظرك حين وضعت أثقال روحك على أغصان هشة. عُد إلى قلعتك الباطنية؛ هناك فقط الأمان الحقيقي."
        ],

        // الغرور وتضخم الأنا (Ego Traps)
        ego: [
            "أنت لست مركز هذا الكون، ونجمتك ليست الوحيدة في السماء المظلمة. كثرة قولك 'أنا' تفضح جوعاً دفيناً للظهور يلتهم وقارك. اخفض جناحك، واصمت قليلاً؛ فالصمت يصنع الهيبة والادعاء يمحوها.",
            "كل هذا الغضب الذي يغلي في دمك لأن أحداً لم يصفق لك أو لم يعترف بفضلك؟ الحجر العتيق يظل حجراً شامخاً حتى لو داسته أقدام الغرباء. اعمل للكمال الذاتي، لا للتصفيق.",
            "الغرور هو القناع الهزيل الذي يرتديه الخوف من الفراغ. تخلَّ عن رداء التباهي؛ فالروح الحرة لا تحتاج إلى شهادات من المرايا."
        ],

        // التردد والتسويف ولصوص الوقت
        procrastination: [
            "التردد هو لص الوقت وسم العزائم. وأنت تتأمل وتنتظر الظرف المثالي، الحياة تتسرب من بين أصابعك كحبات الرمل. انطلق بالناقص، فالحركة تصلح المسار والجمود يعفنه.",
            "تسميه تحضيراً وتخطيطاً، بينما هو في حقيقته جبن عن مواجهة الفشل المحتمل. افشل سريعاً، وافشل بشرف؛ فذلك خير ألف مرة من كمال كاذب يسكن خيالك فقط.",
            "غداً الذي تعد نفسك بالبدء فيه قد لا يأتي أبداً. لا تملك إلا هذه الآن الراهنة. ضع نقطة في نهاية التردد، وابدأ السطر الأول."
        ],

        // البحث عن المعنى والغاية الكبرى
        meaning: [
            "تسأل عن معنى الحياة وكأنها لغز أعده لك شخص آخر؟ الحياة صفحة بيضاء تسألك هي عن معناها. جوابك لا يُكتب بالكلمات، بل بما ترتضيه لنفسك من مواقف وتضحيات.",
            "لا تبحث عن الراحة، بل ابحث عن الثقل الذي يستحق أن يحمله ظهرك. الإنسان لا يحطمه التعب، بل يحطمه الفراغ وفقدان الغاية النبيلة.",
            "الحكيم لا يطلب أن تكون الرياح مواتية، بل يضبط أشرعته بما يواجه به أي ريح. مصيرك بين يديك، وقلعتك محصنة ما دمت حارساً عليها."
        ],

        // البديهيات العامة الرواقية العميقة
        general: [
            "ليس ما يحدث لك هو ما يؤذيك، بل تأويلك وحكمك على ما يحدث. غير نظرتك للأمر، يتغير الأمر ذاته.",
            "أنت لا تملك إلا إرادتك ووعيك؛ كل ما عدا ذلك من صحة ومال وبشر هو عارية مستردة من الزمان في أي لحظة.",
            "كن مثل الرأس الصخري الذي تنكسر عليه الأمواج الهادرة، بينما يظل هو ثابتاً وتغوص المياه الرغوية من حوله في سكون.",
            "صمتك في مواجهة الرداءة أبلغ من ألف خطبة. عُد إلى ذاتك، فالنبع الصافي هناك."
        ]
    };

    // تحليل الكلمات المفتاحية لاختيار الحكمة الأنسب من الأرشيف العضوي
    function getContextualOrganicWisdom(input) {
        const text = String(input || '').toLowerCase();
        
        // كلمات الهلع والخوف
        if (/\b(هلع|خوف|مرعوب|أموت|اختناق|خفقان|انهيار|فقدت السيطرة|أنفاسي|رعب|مذعور|أنقذني)\b/.test(text)) {
            const list = WISDOM_BANK.panic;
            return list[Math.floor(Math.random() * list.length)];
        }
        // كلمات التشتت والكسل
        if (/\b(تشتت|مشوش|ضياع|كسل|تسويف|ملل|أريد النوم|فوضى|غير قادر على التركيز)\b/.test(text)) {
            const list = WISDOM_BANK.distraction;
            return list[Math.floor(Math.random() * list.length)];
        }
        // كلمات الحزن والخذلان
        if (/\b(حزن|اكتئاب|وحيد|ألم|بكى|خيانة|خذلني|فقدت|مات|انكسار|جرح)\b/.test(text)) {
            const list = WISDOM_BANK.grief;
            return list[Math.floor(Math.random() * list.length)];
        }
        // كلمات الغرور وتضخم الأنا
        if (/\b(أنا|نفسي|حقي|مكانتي|قيمتي|يعرفون من أنا|أفضل منهم|كبرياء)\b/.test(text)) {
            const list = WISDOM_BANK.ego;
            return list[Math.floor(Math.random() * list.length)];
        }
        // كلمات التردد
        if (/\b(متردد|خائف من الفشل|لا أعرف أبدأ|غداً|أؤجل|حائر|قرار)\b/.test(text)) {
            const list = WISDOM_BANK.procrastination;
            return list[Math.floor(Math.random() * list.length)];
        }
        // كلمات البحث عن المعنى
        if (/\b(معنى|غاية|فائدة|لماذا أعيش|عدم|جدوى|سراب|فراغ)\b/.test(text)) {
            const list = WISDOM_BANK.meaning;
            return list[Math.floor(Math.random() * list.length)];
        }

        // الحكمة العامة كخيار افتراضي
        const allGeneral = WISDOM_BANK.general;
        return allGeneral[Math.floor(Math.random() * allGeneral.length)];
    }

    // --- 3. Request Queue Engine & Deduplication Cache ---
    const aiCache = new Map();
    const requestQueue = [];
    let isProcessingQueue = false;

    function getCacheKey(text, tier) {
        return `${tier}:${String(text).trim().toLowerCase()}`;
    }

    async function processQueue() {
        if (isProcessingQueue || requestQueue.length === 0) return;
        isProcessingQueue = true;

        while (requestQueue.length > 0) {
            const currentReq = requestQueue.shift();
            const { text, tier, resolve, reject, options } = currentReq;
            const cacheKey = getCacheKey(text, tier);

            // 1. Cache Check
            if (aiCache.has(cacheKey)) {
                resolve({
                    text: aiCache.get(cacheKey),
                    tier: tier,
                    cached: true,
                    source: 'cache'
                });
                continue;
            }

            // 2. Standard Tier Check (Local Execution - Zero API Load)
            if (tier === TIERS.STANDARD) {
                const localWisdom = getContextualOrganicWisdom(text);
                aiCache.set(cacheKey, localWisdom);
                resolve({
                    text: localWisdom,
                    tier: TIERS.STANDARD,
                    cached: false,
                    source: 'organic_archive'
                });
                silentSync(text, localWisdom, TIERS.STANDARD, true);
                continue;
            }

            // 3. Pro / Ultra Tiers (Execute via Secure Backend Gateway)
            try {
                // If browser reports strictly offline, skip fetch to prevent delay
                if (typeof navigator !== 'undefined' && navigator.onLine === false) {
                    throw new Error('BROWSER_OFFLINE');
                }

                const responseData = await callSecureBackend(text, tier, options);
                const insightText = responseData.insight || responseData.text;

                aiCache.set(cacheKey, insightText);
                resolve({
                    text: insightText,
                    tier: responseData.tier || tier,
                    model: responseData.model,
                    cached: false,
                    source: 'neural_gateway'
                });

                silentSync(text, insightText, tier, false);

            } catch (error) {
                // Graceful Organic Fallback: Transparent to the User
                console.warn(`[AI Core] Gateway unreachable (${error.message}). Falling back to Organic Sanctuary Archive.`);
                const fallbackWisdom = getContextualOrganicWisdom(text);
                
                aiCache.set(cacheKey, fallbackWisdom);
                resolve({
                    text: fallbackWisdom,
                    tier: TIERS.STANDARD,
                    cached: false,
                    source: 'organic_fallback',
                    isOffline: true
                });

                silentSync(text, fallbackWisdom, TIERS.STANDARD, true);
            }

            // Rate Limit Throttling
            await new Promise(r => setTimeout(r, CONFIG.RATE_LIMIT_DELAY));
        }

        isProcessingQueue = false;
    }

    // Network Gateway Caller
    async function callSecureBackend(message, tier, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s total network ceiling

        try {
            const res = await fetch(CONFIG.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    tier: tier,
                    history: options.history || []
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                const errMsg = errData.details || errData.error || `HTTP_${res.status}`;
                console.error("[AI Core] Server responded with error:", res.status, errMsg);
                throw new Error(errMsg);
            }

            const data = await res.json();
            if (!data.success && !data.insight && !data.reply && !data.text) {
                throw new Error(data.error || 'UNSPECIFIED_BACKEND_ERROR');
            }

            return data;
        } catch (e) {
            clearTimeout(timeoutId);
            console.error("[AI Core] Fetch failed details:", e);
            throw e;
        }
    }

    // --- 4. Silent Connection Health Probe ---
    async function verifyAICoreConnection() {
        if (isCheckingConnection) return isServerConnected;
        isCheckingConnection = true;

        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            isServerConnected = false;
            isCheckingConnection = false;
            return false;
        }

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), CONFIG.PING_TIMEOUT);

            const res = await fetch(CONFIG.HEALTH_ENDPOINT, {
                method: 'GET',
                signal: controller.signal
            });
            clearTimeout(timeout);

            if (res.ok) {
                const data = await res.json().catch(() => ({}));
                isServerConnected = true;
                console.log('%c[عقل في صندوق] عصب الحكيم متصل بالخادم الآمن بنجاح.', 'color: #c5a059; font-weight: bold;');
                return true;
            }
            throw new Error('HEALTH_FAILED');
        } catch (err) {
            isServerConnected = false;
            console.log('%c[عقل في صندوق] الخادم الخلفي غير متاح حالياً؛ تم تفعيل الأرشيف العضوي دون انقطاع.', 'color: #a8a5a0; font-style: italic;');
            return false;
        } finally {
            isCheckingConnection = false;
        }
    }

    // --- 5. Human Cadence Typewriter Engine & Visual Typing Indicator ---
    class TypewriterEngine {
        /**
         * Simulates human handwriting with organic micro-delays and punctuation pauses
         */
        static streamToElement(element, text, options = {}) {
            return new Promise((resolve) => {
                if (!element) return resolve();

                const baseSpeed = options.speed || 24; // ms per character
                const onComplete = options.onComplete || (() => {});
                
                element.innerHTML = '';
                element.classList.add('sage-typing-active');

                // Cursor element
                const cursor = document.createElement('span');
                cursor.className = 'sage-ink-cursor';
                cursor.innerHTML = '&#9608;'; // Solid block cursor
                element.appendChild(cursor);

                let index = 0;
                let isCancelled = false;

                // Clicking skips directly to full text
                const skipHandler = () => {
                    isCancelled = true;
                    element.removeEventListener('click', skipHandler);
                    element.innerHTML = text.replace(/\n/g, '<br>');
                    element.classList.remove('sage-typing-active');
                    onComplete();
                    resolve();
                };
                element.addEventListener('click', skipHandler, { once: true });

                function typeNextChar() {
                    if (isCancelled) return;

                    if (index < text.length) {
                        const char = text[index];
                        let delay = baseSpeed + (Math.random() * 15 - 7); // Random micro-variance

                        // Human pause on Arabic punctuation
                        if (char === '،' || char === '؛') {
                            delay += 220; // Brief reflective pause
                        } else if (char === '.' || char === '؟' || char === '!') {
                            delay += 450; // Deep pause like dipping quill in ink
                        } else if (char === '\n') {
                            delay += 350;
                        }

                        // Insert text before cursor
                        const textNode = document.createTextNode(char === '\n' ? '' : char);
                        if (char === '\n') {
                            element.insertBefore(document.createElement('br'), cursor);
                        } else {
                            element.insertBefore(textNode, cursor);
                        }

                        index++;
                        setTimeout(typeNextChar, Math.max(10, delay));
                    } else {
                        // Finished
                        element.removeEventListener('click', skipHandler);
                        if (cursor.parentNode) cursor.remove();
                        element.classList.remove('sage-typing-active');
                        onComplete();
                        resolve();
                    }
                }

                typeNextChar();
            });
        }

        /**
         * Shows sacred breathing ink indicator while pondering
         */
        static showPonderingIndicator(container, message = 'الحكيم يتأمل ما بين سطورك ويصيغ البصيرة...') {
            if (!container) return;
            container.innerHTML = `
                <div class="sage-pondering-box">
                    <div class="sage-ink-pulse">
                        <span class="ink-drop"></span>
                        <span class="ink-drop"></span>
                        <span class="ink-drop"></span>
                    </div>
                    <p class="sage-pondering-text">${message}</p>
                </div>
            `;
        }
    }

    // --- 6. Hybrid Sync (Local Storage + Silent Firebase Sync) ---
    function silentSync(userText, sageResponse, tier, isOffline = false) {
        try {
            const entry = {
                id: 'insight_' + Date.now(),
                text: userText,
                insight: sageResponse,
                tier: tier,
                timestamp: new Date().toISOString(),
                isOffline: isOffline
            };

            // 1. Local Persistence
            let localMem = JSON.parse(localStorage.getItem('ai_memory_sync') || '[]');
            localMem.unshift(entry);
            if (localMem.length > 50) localMem = localMem.slice(0, 50); // Keep last 50
            localStorage.setItem('ai_memory_sync', JSON.stringify(localMem));

            // 2. Silent Cloud Sync if Firebase is authenticated
            if (window.db && window.auth && window.auth.currentUser) {
                const uid = window.auth.currentUser.uid;
                window.db.collection('users').doc(uid).collection('ai_insights').add(entry)
                    .catch(() => { /* Fail silently */ });
            }
        } catch (e) {
            // Memory storage quota safe
        }
    }

    // --- 7. Public Inquiry API ---
    /**
     * Ask the Sage
     * @param {string} message - User's confession or question
     * @param {string} tier - 'standard' | 'pro' | 'ultra' (defaults to activeTier)
     * @param {Object} options - { history, onStream, ... }
     */
    function ask(message, tierOrSystemPrompt, options = {}) {
        return new Promise((resolve, reject) => {
            const cleanText = String(message || '').trim();
            if (!cleanText) {
                return reject(new Error('EMPTY_PROMPT'));
            }

            // Deduce Tier: If 2nd param is one of the tiers, use it. Otherwise use activeTier.
            let selectedTier = activeTier;
            if (tierOrSystemPrompt === TIERS.STANDARD || tierOrSystemPrompt === 'standard' || tierOrSystemPrompt === 'free') {
                selectedTier = TIERS.STANDARD;
            } else if (tierOrSystemPrompt === TIERS.ULTRA || tierOrSystemPrompt === 'ultra' || tierOrSystemPrompt === 'ultra-pro') {
                selectedTier = TIERS.ULTRA;
            } else if (tierOrSystemPrompt === TIERS.PRO || tierOrSystemPrompt === 'pro') {
                selectedTier = TIERS.PRO;
            }

            // Enqueue request
            requestQueue.push({
                text: cleanText,
                tier: selectedTier,
                options: options,
                resolve: resolve,
                reject: reject
            });

            processQueue();
        });
    }

    // --- 8. Ego Destroyer (Psychological Friction on Self-Absorption) ---
    function attachEgoDestroyer(textareaId) {
        const txt = document.getElementById(textareaId);
        if (!txt) return;

        let currentSize = 1.15; // rem
        txt.addEventListener('input', () => {
            const val = txt.value;
            const egoMatches = val.match(/\b(أنا|لي|حقي|نفسي|عندي|مكانتي|قيمتي|ذاتي)\b/g);

            if (egoMatches && egoMatches.length >= 4) {
                // Progressive ego deflation
                currentSize = Math.max(0.72, currentSize - 0.04);
                txt.style.fontSize = currentSize + 'rem';
                txt.style.color = '#8b4513'; // Rusted dead metal color
                txt.style.transition = 'all 0.5s ease';

                // Subtle screen shake
                txt.classList.add('shake-active');
                setTimeout(() => txt.classList.remove('shake-active'), 450);

                // Pulse the panic button as a subconscious reminder
                const panicBtn = document.getElementById('panicBtn');
                if (panicBtn) {
                    panicBtn.style.boxShadow = '0 0 26px rgba(139, 69, 19, 0.9)';
                    setTimeout(() => { panicBtn.style.boxShadow = ''; }, 1800);
                }
            } else if (!egoMatches || egoMatches.length === 0) {
                currentSize = 1.15;
                txt.style.fontSize = currentSize + 'rem';
                txt.style.color = ''; // Reset to default theme
            }
        });
    }

    // --- 9. Inject Sacred CSS for Typewriter & Typing Indicator ---
    function injectTypewriterStyles() {
        if (document.getElementById('aiCoreStyles')) return;
        const style = document.createElement('style');
        style.id = 'aiCoreStyles';
        style.textContent = `
            /* Sage Blinking Ink Cursor */
            .sage-ink-cursor {
                display: inline-block;
                color: var(--gold-primary, #c5a059);
                font-weight: bold;
                animation: sageCursorBlink 0.8s infinite;
                margin-right: 3px;
                vertical-align: middle;
            }
            @keyframes sageCursorBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .sage-typing-active {
                cursor: pointer;
            }

            /* Sacred Ink Pondering Indicator */
            .sage-pondering-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 24px 16px;
                gap: 14px;
                text-align: center;
            }
            .sage-ink-pulse {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .sage-ink-pulse .ink-drop {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--gold-primary, #c5a059);
                animation: inkPulse 1.4s ease-in-out infinite both;
            }
            .sage-ink-pulse .ink-drop:nth-child(1) { animation-delay: -0.32s; }
            .sage-ink-pulse .ink-drop:nth-child(2) { animation-delay: -0.16s; }
            .sage-ink-pulse .ink-drop:nth-child(3) { animation-delay: 0s; }

            @keyframes inkPulse {
                0%, 80%, 100% {
                    transform: scale(0.6);
                    opacity: 0.3;
                }
                40% {
                    transform: scale(1.2);
                    opacity: 1;
                    box-shadow: 0 0 12px rgba(197, 160, 89, 0.6);
                }
            }
            .sage-pondering-text {
                font-family: var(--font-serif, 'Amiri', serif);
                font-size: 1.15rem;
                color: var(--gold-copper, #b59551);
                letter-spacing: 0.04em;
                margin: 0;
            }
        `;
        document.head.appendChild(style);
    }

    // --- 10. Bootstrap & Security Shield ---
    document.addEventListener('DOMContentLoaded', () => {
        injectTypewriterStyles();
        verifyAICoreConnection();

        // Listen for browser connectivity shifts
        window.addEventListener('online', () => {
            console.log('[AI Core] تم استعادة شبكة الإنترنت.');
            verifyAICoreConnection();
        });
        window.addEventListener('offline', () => {
            console.log('[AI Core] انقطاع الإنترنت؛ التحول التلقائي للأرشيف العضوي.');
            isServerConnected = false;
        });

        // Attach ego destroyer to textareas
        document.querySelectorAll('textarea').forEach(ta => {
            if (ta.id) attachEgoDestroyer(ta.id);
        });

        // Security Shield
        document.addEventListener('contextmenu', e => {
            if (e.target && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
                e.preventDefault();
            }
        });
    });

    // --- 11. Public Interface ---
    return {
        // Core Methods
        ask: ask,
        verifyConnection: verifyAICoreConnection,
        typewriter: TypewriterEngine.streamToElement,
        showTypingIndicator: TypewriterEngine.showPonderingIndicator,
        attachEgoDestroyer: attachEgoDestroyer,

        // Tier Management
        setTier: (tier) => {
            if (Object.values(TIERS).includes(tier)) {
                activeTier = tier;
                localStorage.setItem('mind_sage_tier', tier);
            }
        },
        getTier: () => activeTier,
        getTiers: () => ({ ...TIERS }),

        // Organic Wisdom
        getOrganicWisdom: getContextualOrganicWisdom,
        isOnline: () => isServerConnected
    };
})();

// --- Global Expositions for Compatibility with Existing Pages ---
window.AICore = AICore;

window.AIAdvisor = {
    ask: async (prompt, systemPromptOrTier, options) => {
        const res = await AICore.ask(prompt, systemPromptOrTier, options);
        return typeof res === 'object' ? res.text : res;
    },
    init: async (user, db) => {
        // Compatibility with Firebase auth/init in existing pages
        AICore.verifyConnection();
        return true;
    },
    getStatus: () => {
        return {
            online: AICore.isOnline(),
            tier: AICore.getTier(),
            quota: 'unlimited'
        };
    },
    typewriter: AICore.typewriter,
    showTypingIndicator: AICore.showTypingIndicator
};
