/**
 * ====================================================================
 * MIND IN BOX — SMOKE TEST SCRIPT (Node.js)
 * Quick health check for all pages — runs in ~30 seconds
 * Run: node _tests/smoke-test.js
 * ====================================================================
 */

const https = require('https');

const BASE_URL = 'https://mindinbox.pages.dev';

const PAGES = [
    { path: '/',                name: 'الصفحة الرئيسية (Dashboard)',    critical: true  },
    { path: '/index.html',      name: 'لوحة التحكم',                    critical: true  },
    { path: '/pricing.html',    name: 'صفحة الأسعار',                   critical: true  },
    { path: '/meditation.html', name: 'محراب الخلوة',                   critical: false },
    { path: '/catharsis.html',  name: 'محراب التفريغ',                  critical: false },
    { path: '/vault.html',      name: 'الخزينة',                        critical: false },
    { path: '/mood.html',       name: 'هندسة المزاج',                   critical: false },
    { path: '/chat.html',       name: 'محراب النخبة (Chat)',            critical: true  },
    { path: '/account.html',    name: 'الحساب الشخصي',                  critical: false },
];

const CHECKS = {
    maxResponseTimeMs: 3000,
    requiredContent: 'عقل في صندوق',
    requiredHeaders: ['content-type'],
    forbiddenContent: ['Error', 'undefined', 'NaN'],
};

let passed = 0;
let failed = 0;
const results = [];

// ── FETCH WITH TIMEOUT ──
function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const req = https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body,
                    duration: Date.now() - startTime,
                });
            });
        });
        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Timeout'));
        });
    });
}

// ── RUN SMOKE TEST ──
async function runSmokeTest() {
    console.log('\n' + '═'.repeat(60));
    console.log('  🏛️  MIND IN BOX — SMOKE TEST SUITE');
    console.log(`  🌐 Target: ${BASE_URL}`);
    console.log(`  🕐 ${new Date().toLocaleString('ar-SA')}`);
    console.log('═'.repeat(60) + '\n');

    for (const page of PAGES) {
        const url = BASE_URL + page.path;
        let result = { page, checks: [], ok: true };

        try {
            const res = await fetchPage(url);

            // Check: Status 200
            if (res.status !== 200) {
                result.checks.push({ name: 'Status 200', ok: false, detail: `Got ${res.status}` });
                result.ok = false;
            } else {
                result.checks.push({ name: 'Status 200', ok: true });
            }

            // Check: Response time
            if (res.duration > CHECKS.maxResponseTimeMs) {
                result.checks.push({ name: `Time < ${CHECKS.maxResponseTimeMs}ms`, ok: false, detail: `${res.duration}ms` });
                result.ok = false;
            } else {
                result.checks.push({ name: `Time < ${CHECKS.maxResponseTimeMs}ms`, ok: true, detail: `${res.duration}ms` });
            }

            // Check: Required content (Arabic brand name)
            if (!res.body.includes(CHECKS.requiredContent)) {
                result.checks.push({ name: 'Arabic content present', ok: false });
                result.ok = false;
            } else {
                result.checks.push({ name: 'Arabic content present', ok: true });
            }

            // Check: No error strings leaked
            const leaked = CHECKS.forbiddenContent.filter(str => res.body.includes(str + ' '));
            if (leaked.length > 0) {
                result.checks.push({ name: 'No error leakage', ok: false, detail: leaked.join(', ') });
                result.ok = false;
            } else {
                result.checks.push({ name: 'No error leakage', ok: true });
            }

            // Check: Security headers present
            if (!res.headers['x-content-type-options']) {
                result.checks.push({ name: 'Security headers', ok: false, detail: 'Missing X-Content-Type-Options' });
                result.ok = false;
            } else {
                result.checks.push({ name: 'Security headers', ok: true });
            }

        } catch (err) {
            result.ok = false;
            result.error = err.message;
        }

        results.push(result);

        // Print result
        const icon = result.ok ? '✅' : (page.critical ? '🔴' : '⚠️');
        const statusText = result.ok ? 'PASS' : 'FAIL';
        console.log(`${icon} [${statusText}] ${page.name}`);

        if (!result.ok) {
            result.checks.filter(c => !c.ok).forEach(c => {
                console.log(`       ↳ ❌ ${c.name}${c.detail ? ': ' + c.detail : ''}`);
            });
            if (result.error) console.log(`       ↳ ❌ Error: ${result.error}`);
        }

        result.ok ? passed++ : failed++;
    }

    // ── SUMMARY ──
    console.log('\n' + '═'.repeat(60));
    console.log(`  📊 النتائج: ${passed} نجاح / ${failed} فشل / ${PAGES.length} إجمالي`);
    const overallOk = failed === 0;
    console.log(`  ${overallOk ? '🏆 جميع الاختبارات ناجحة!' : '🚨 يوجد ' + failed + ' اختبارات فاشلة!'}`);
    console.log('═'.repeat(60) + '\n');

    process.exit(failed > 0 ? 1 : 0);
}

runSmokeTest().catch(console.error);
