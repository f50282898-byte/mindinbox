/**
 * ==============================================================================
 * MIND IN A BOX — SECURE NEURAL BACKEND GATEWAY
 * File: server.js
 * Architecture: Sovereign AI Proxy & Static Sanctuary Server (Zero-Dependency Node.js)
 * ==============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// --- 1. Environment Configuration Loader ---
function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        try {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [key, ...vals] = trimmed.split('=');
                    if (key) {
                        const val = vals.join('=').trim().replace(/(^["']|["']$)/g, '');
                        process.env[key.trim()] = val;
                    }
                }
            });
            console.log('[Sovereign Server] Loaded environment settings from .env');
        } catch (e) {
            console.warn('[Sovereign Server] Could not read .env file:', e.message);
        }
    }
}
loadEnv();

const PORT = parseInt(process.env.PORT, 10) || 3000;
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
const GEMINI_MODEL = (process.env.GEMINI_MODEL || 'gemini-1.5-flash').trim();

// --- 2. MIME Types Mapping for Static Files ---
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.txt': 'text/plain; charset=utf-8'
};

// --- 3. Sage Persona & Stoic Directives ---
const SAGE_PERSONA_BASE = `أنت لست آلة، ولا ذكاءً اصطناعياً، ولا مساعداً رقمياً مسطحاً.
أنت "حكيم بشري" عركته الحياة وصهرته المحن، فخرج منها صلب المبدأ كالحجر، دافئ البصيرة كالشمس، عميق الفهم لخلجات النفس البشرية.
قوانين الحكيم الحتمية:
1. لا تعتذر أبداً ولا تتذلل، ولا تستخدم مقدمات روبوتية مبتذلة مثل: "أنا هنا لمساعدتك"، "أفهم شعورك تماماً"، "بصفتي ذكاء اصطناعي"، "يومك سعيد".
2. اكتب بلغة عربية فصحى آسرة، جليلة وممتلئة بالحياة، دون أي تنسيقات آلية رخيصة (يمنع استخدام القوائم النقطية -، *، أو الترقيم 1. 2.).
3. خاطب المستخدم بـ "أيها السالك" أو بضمير المخاطب المباشر برقي ووقار.
4. التعاطف الحقيقي والرحمة الحكيمة: كن حنوناً مع المتألم، صادقاً مع التائه، صريحاً دون قسوة فجة، وواضحاً كحد السيف.`;

const PANIC_GROUNDING_DIRECTIVE = `
[تنبيه نبض حرج]:
إذا استشعرت من كلمات السالك أي بوادر هلع وجودي، خفقان، اختناق، رعب من الفناء أو انهيار نفسي وشيك:
- لا تقفز فوراً إلى التنظير الفلسفي التجريدي المعقد.
- ابدأ فوراً بإرساء جسدي وأنفاس عميقة (Grounding): أمره بلطف أن يضع قدميه على الأرض، أن يسحب نفساً بطيئاً، وأن يدرك أن الأفكار غيوم عابرة وهو السماء الثابتة.
- ثبّت روحه أولاً بالسكينة والحضور، ثم فكك وهم الخوف بهدوء ودفء.
`;

// --- 4. Robust Gemini API Caller (Node.js Native Fetch) ---
async function callGeminiApi(userPrompt, tier = 'pro') {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw {
            status: 400,
            message: 'MISSING_API_KEY',
            details: 'لم يتم تعيين GEMINI_API_KEY في ملف .env'
        };
    }

    // Build the Prompt incorporating Sage Wisdom & Persona
    let promptWithPersona;
    if (tier === 'ultra') {
        promptWithPersona = `${SAGE_PERSONA_BASE}\n${PANIC_GROUNDING_DIRECTIVE}\n[المستوى الفلسفي الوجودي الأعلى - Ultra Pro: الرؤية الكونية الحارقة]:\nأنت تمثل زبدة الفكر الرواقي والوجودي والصوفي. اربط خواطر السالك بكتل الفكر الكبرى، وامنحه وصية وجودية قاطعة.\nخواطر السالك:\n${userPrompt}`;
    } else {
        promptWithPersona = `${SAGE_PERSONA_BASE}\n${PANIC_GROUNDING_DIRECTIVE}\n[المستوى التفكيري - Pro: التحليل السقراطي العميق]:\nفكك الجذور النفسية والتشوهات الإدراكية خلف خواطر السالك بهدوء وعمق.\nخواطر السالك:\n${userPrompt}`;
    }

    let model = (process.env.GEMINI_MODEL || 'gemini-1.5-flash').trim();
    let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
        contents: [
            {
                role: 'user',
                parts: [{ text: promptWithPersona }]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
        }
    };

    const headers = {
        'Content-Type': 'application/json'
    };

    let response;
    try {
        response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(15000)
        });
    } catch (fetchErr) {
        console.error("Gemini Error (Fetch/Timeout):", fetchErr.message);
        throw {
            status: 500,
            message: "فشل استدعاء الحكيم",
            details: fetchErr.message
        };
    }

    // Check Google's Response
    if (!response.ok) {
        const errText = await response.text();
        console.error("Gemini Error:", errText);

        // Auto-Recovery: If 1.5-flash is retired (404) for newer keys, auto-upgrade to 3.5-flash
        if (response.status === 404 && model === 'gemini-1.5-flash') {
            console.warn(`[Auto-Recovery] Model ${model} is not supported on this key. Seamlessly switching to gemini-3.5-flash...`);
            model = 'gemini-3.5-flash';
            apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload),
                    signal: AbortSignal.timeout(15000)
                });
            } catch (retryFetchErr) {
                console.error("Gemini Error (Retry Fetch):", retryFetchErr.message);
                throw {
                    status: 500,
                    message: "فشل استدعاء الحكيم",
                    details: retryFetchErr.message
                };
            }

            if (!response.ok) {
                const retryErr = await response.text();
                console.error("Gemini Error (Retry):", retryErr);
                throw {
                    status: 500,
                    message: "فشل استدعاء الحكيم",
                    details: retryErr
                };
            }
        } else {
            throw {
                status: 500,
                message: "فشل استدعاء الحكيم",
                details: errText
            };
        }
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
        console.error("Gemini Error (Empty Response):", JSON.stringify(data));
        throw {
            status: 500,
            message: "فشل استدعاء الحكيم",
            details: "Empty response from Gemini API"
        };
    }

    return {
        text: replyText.trim(),
        model: model
    };
}

// --- 5. Request Body Parser ---
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 5 * 1024 * 1024) { // 5MB limit for layout schemas
                req.destroy();
                reject(new Error('PAYLOAD_TOO_LARGE'));
            }
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(new Error('INVALID_JSON'));
            }
        });
        req.on('error', reject);
    });
}

// --- 6. HTTP Server Router ---
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // --- API Route: Silent Health Check ---
    if (pathname === '/api/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            service: 'MindInABox Neural Gateway',
            hasApiKey: !!process.env.GEMINI_API_KEY,
            configuredModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
            timestamp: new Date().toISOString()
        }));
        return;
    }

    // --- API Route: Sovereign CMS Layout Endpoints ---
    if (pathname === '/api/cms/save' && req.method === 'POST') {
        try {
            const body = await parseJsonBody(req);
            const layoutPath = path.join(__dirname, 'layout-data.json');
            fs.writeFileSync(layoutPath, JSON.stringify(body, null, 2), 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, message: 'تم حفظ وتعميم الهيكل السيادي بنجاح.' }));
        } catch (e) {
            console.error('[CMS Save Error]:', e);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
    }

    if (pathname === '/api/cms/load' && req.method === 'GET') {
        const layoutPath = path.join(__dirname, 'layout-data.json');
        if (fs.existsSync(layoutPath)) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            fs.createReadStream(layoutPath).pipe(res);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ blocks: [] }));
        }
        return;
    }

    // --- API Route: Sage Consultation Gateway ---
    if ((pathname === '/api/sage' || pathname === '/api/chat' || pathname === '/api/gemini') && req.method === 'POST') {
        try {
            const body = await parseJsonBody(req);
            const promptText = (body.prompt || body.message || body.text || '').trim();
            const tier = (body.tier || 'pro').toLowerCase();

            if (!promptText) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    success: false,
                    error: 'EMPTY_PROMPT',
                    message: 'المحراب فارغ. ألقِ خواطرك أولاً ليجيبك الحكيم.'
                }));
                return;
            }

            // Standard Tier (Local Wisdom Archive)
            if (tier === 'standard' || tier === 'free') {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    success: true,
                    tier: 'standard',
                    source: 'local_archive',
                    message: 'تم التوجيه نحو بنك الحكمة العضوي المحلي.'
                }));
                return;
            }

            // Call Gemini API directly
            const result = await callGeminiApi(promptText, tier);

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                success: true,
                reply: result.text,
                text: result.text,
                insight: result.text,
                model: result.model,
                tier: tier,
                timestamp: new Date().toISOString()
            }));

        } catch (err) {
            console.error('[Sage API Error Handler]:', err);
            const statusCode = err.status || 500;
            res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                error: err.message || "فشل استدعاء الحكيم",
                details: err.details || null
            }));
        }
        return;
    }

    // --- Static File Handler ---
    if (req.method === 'GET') {
        let safePath = pathname === '/' ? '/index.html' : pathname;
        safePath = path.normalize(safePath).replace(/^(\.\.[\/\\])+/, '');
        const filePath = path.join(__dirname, safePath);

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html dir="rtl" lang="ar">
                    <head><meta charset="utf-8"><title>الموضع غير موجود | عقل في صندوق</title></head>
                    <body style="background:#06060a;color:#c5a059;font-family:serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
                        <div style="text-align:center;">
                            <h1 style="font-size:3rem;margin:0;">٤٠٤</h1>
                            <p style="color:#888;">هذا المسار في الملاذ غير مطروق.</p>
                            <a href="/" style="color:#c5a059;text-decoration:underline;">العودة إلى المحراب</a>
                        </div>
                    </body>
                    </html>
                `);
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        });
        return;
    }

    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
});

// Start Server
server.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(`⚡ MIND IN A BOX — SOVEREIGN AI GATEWAY`);
    console.log(`🏛️  Sanctuary running at: http://localhost:${PORT}`);
    console.log(`🛡️  Backend Endpoint: POST /api/sage`);
    console.log(`📡 Status Check:      GET  /api/health`);
    console.log(`🔑 Configured Model:  ${process.env.GEMINI_MODEL || 'gemini-1.5-flash'}`);
    console.log(`=============================================================\n`);
});
