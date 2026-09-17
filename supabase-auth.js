/**
 * ==============================================================================
 * MIND IN A BOX — SUPABASE GOOGLE OAUTH MODULE
 * File: supabase-auth.js
 * Architecture: Supabase Client, Google OAuth Redirect, and Session Listener
 * Production URL: https://mindinbox.pages.dev
 * ==============================================================================
 */

// 1. ضع مفاتيح مشروعك في Supabase هنا
const SUPABASE_URL = window.SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// 2. تهيئة عميل Supabase من مكتبة CDN
let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.info('[Supabase]: Client initialized successfully.');
} else {
    console.warn('[Supabase]: CDN library not detected yet. Ensure the CDN script is included before this file.');
}

/**
 * 3. دالة تسجيل الدخول بواسطة Google
 */
async function signInWithGoogle() {
    if (!supabaseClient) {
        console.error('[Supabase]: العميل غير مهيأ. تأكد من تحميل مكتبة Supabase CDN ومفاتيح المشروع.');
        alert('محرك المصادقة قيد التهيئة؛ تأكد من وضع مفاتيح Supabase.');
        return;
    }

    try {
        console.log('[Supabase]: بدء توجيه المستخدم إلى بوابة Google OAuth...');

        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // الرابط المعتمد لإعادة التوجيه بعد المصادقة
                redirectTo: 'https://mindinbox.pages.dev/dashboard.html',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'select_account'
                }
            }
        });

        if (error) throw error;

    } catch (error) {
        console.error('[Supabase Google Auth Error]:', error.message || error);
        alert('تعذر بدء الاتصال ببوابة Google: ' + (error.message || 'خطأ غير معروف'));
    }
}

/**
 * 4. الاستماع لحالة الجلسة والتقاط عودة المستخدم (Session Observer)
 */
if (supabaseClient) {
    // التقاط أحداث المصادقة عند العودة من Google
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        console.log(`[Supabase Auth Event]: ${event}`);

        if (event === 'SIGNED_IN' && session) {
            console.info('[Supabase]: تم التحقق من هوية المستخدم بنجاح:', session.user.email);

            // حفظ التوكن أو توجيه المستخدم مباشرة إلى لوحة التحكم
            if (!window.location.pathname.includes('dashboard.html')) {
                window.location.replace('https://mindinbox.pages.dev/dashboard.html');
            }
        }

        if (event === 'SIGNED_OUT') {
            console.log('[Supabase]: تم تسجيل الخروج.');
        }
    });

    // فحص فوري للجلسة عند فتح الصفحة (للتأكد إذا كان مسجلاً مسبقاً)
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        if (session && !window.location.pathname.includes('dashboard.html')) {
            console.info('[Supabase]: جلسة نشطة متوفرة بالفعل، جارٍ الانتقال للوحة التحكم...');
            window.location.replace('https://mindinbox.pages.dev/dashboard.html');
        }
    });
}

// 5. ربط تلقائي للزر في الصفحة فور اكتمال تحميل الـ DOM
document.addEventListener('DOMContentLoaded', () => {
    // يبحث عن الزر بالمعرف الشهير btnGoogleAuth أو btnGoogle
    const googleBtn = document.getElementById('btnGoogleAuth') || document.getElementById('btnGoogle');
    if (googleBtn) {
        googleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signInWithGoogle();
        });
        console.info('[Supabase]: تم ربط زر Google بنجاح.');
    }
});

// تصدير الواجهة للاستخدام العام
window.MindAuth = {
    client: supabaseClient,
    signInWithGoogle: signInWithGoogle
};

