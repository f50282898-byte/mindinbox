/**
 * ====================================================================
 * MIND IN BOX — LOAD TEST SCRIPT (k6)
 * Simulates: 300 concurrent users over 4 days
 * Run: k6 run _tests/load-test.js
 * Install k6: https://k6.io/docs/get-started/installation/
 * ====================================================================
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// ── CUSTOM METRICS ──
const errRate     = new Rate('error_rate');
const pageLoad    = new Trend('page_load_time');
const apiLatency  = new Trend('api_latency');
const failCount   = new Counter('failed_requests');

// ── TEST SCENARIOS ──
export const options = {
    scenarios: {
        // Scenario 1: Normal load (50 users)
        normal_load: {
            executor: 'constant-vus',
            vus: 50,
            duration: '5m',
            tags: { scenario: 'normal' },
        },

        // Scenario 2: Peak load (150 users) — starts after 5 min
        peak_load: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '2m', target: 150 },
                { duration: '10m', target: 150 },
                { duration: '2m', target: 0 },
            ],
            startTime: '5m',
            tags: { scenario: 'peak' },
        },

        // Scenario 3: Maximum load (300 users) — QA team simulation
        max_load: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '3m', target: 300 },
                { duration: '15m', target: 300 },
                { duration: '3m', target: 0 },
            ],
            startTime: '20m',
            tags: { scenario: 'max' },
        },
    },

    // Acceptance thresholds
    thresholds: {
        'http_req_duration': ['p(95)<2000'],  // 95% of requests under 2s
        'error_rate': ['rate<0.01'],           // < 1% error rate
        'http_req_failed': ['rate<0.01'],
        'page_load_time': ['p(90)<3000'],      // 90% pages load under 3s
    },
};

const BASE_URL = 'https://mindinbox.pages.dev';

const PAGES = [
    '/',
    '/index.html',
    '/pricing.html',
    '/meditation.html',
    '/catharsis.html',
    '/vault.html',
    '/mood.html',
    '/chat.html',
];

// ── MAIN TEST FUNCTION ──
export default function () {
    // Pick a random page to test
    const page = PAGES[Math.floor(Math.random() * PAGES.length)];

    const startTime = Date.now();
    const res = http.get(`${BASE_URL}${page}`, {
        headers: {
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'ar,en;q=0.9',
            'Cache-Control': 'no-cache',
        },
        timeout: '10s',
    });
    const duration = Date.now() - startTime;

    // Record metrics
    pageLoad.add(duration);
    errRate.add(res.status >= 400);

    const passed = check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 3s': (r) => r.timings.duration < 3000,
        'no server errors': (r) => r.status < 500,
        'has content': (r) => r.body && r.body.length > 100,
        'is UTF-8 Arabic': (r) => r.body && r.body.includes('عقل في صندوق'),
    });

    if (!passed) failCount.add(1);

    // Simulate real user behavior (pause between page loads)
    sleep(Math.random() * 3 + 1);
}

// ── SETUP & TEARDOWN ──
export function setup() {
    console.log(`[MindInBox LoadTest] Starting test against: ${BASE_URL}`);
    console.log('[MindInBox LoadTest] Testing ' + PAGES.length + ' pages');
}

export function teardown(data) {
    console.log('[MindInBox LoadTest] Test completed. Check results above.');
}

