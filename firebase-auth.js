/**
 * ==============================================================================
 * MIND IN A BOX — SOVEREIGN FIREBASE AUTHENTICATION ENGINE
 * Domain: https://mindinbox.pages.dev
 * Technology: Firebase v9 Compat + GoogleAuthProvider (Strict Popup Flow)
 * Security Doctrine: 100% COOP-Compliant · Anti-Freeze Button · Event Driven
 * ==============================================================================
 */

// 1. إعدادات مشروع Firebase
const firebaseConfig = window.firebaseConfig || {
    apiKey: "AIzaSyDGgTDrDJsRvulhzK1p59AbuhJwQYSUufI",
    authDomain: "mindinbox-50d84.firebaseapp.com",
    projectId: "mindinbox-50d84",
    storageBucket: "mindinbox-50d84.firebasestorage.app",
    messagingSenderId: "1087016266441",
    appId: "1:1087016266441:web:6d5242057c39e744ee3b18"
};

// تهيئة Firebase بأمان
if (typeof firebase !== 'undefined') {
    if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
} else {
    console.warn('[MindAuth]: مكتبة Firebase لم يتم تحميلها بعد.');
}

const auth = typeof firebase !== 'undefined' ? firebase.auth() : null;
const db = typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null;

/**
 * توثيق سجل المستخدم في قاعدة بيانات Firestore
 */
async function provisionUserRecord(user) {
    if (!user || !db) return;
    try {
        const userRef = db.collection('users').doc(user.uid);
        const doc = await userRef.get();
        const isNewUser = !doc.exists;

        if (isNewUser) {
            await userRef.set({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || "السالك المعرفي",
                photoURL: user.photoURL || "",
                authProvider: "google.com",
                plan: "free_trial",
                trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.info('[MindAuth]: تم إنشاء وتوثيق مستخدم جديد في Firestore.');
            localStorage.setItem('mib_is_new_user_' + user.uid, 'true');
        } else {
            await userRef.update({
                lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
                photoURL: user.photoURL || doc.data().photoURL || ""
            });
        }
    } catch (e) {
        console.warn('[MindAuth]: تعذر حفظ سجل المستخدم في Firestore:', e.message);
    }
}

/**
 * دالة تسجيل الدخول بواسطة جوجل — نافذة منبثقة محكمة الحماية (signInWithPopup)
 */
async function signInWithGooglePopup(customButton = null) {
    const btn = customButton || document.getElementById('btnGoogleModal') || document.getElementById('btnGoogleAuth');

    if (!auth) {
        alert('محرك المصادقة غير متاح حالياً. يرجى تحديث الصفحة.');
        return;
    }

    // تفعيل حالة التحميل
    if (btn) {
        btn.disabled = true;
        btn.setAttribute('data-loading', 'true');
        btn.classList.add('loading');
    }

    try {
        console.info('[MindAuth]: بدء تسجيل الدخول بالنافذة المنبثقة...');
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        provider.setCustomParameters({ prompt: 'select_account' });

        const result = await auth.signInWithPopup(provider);

        if (result && result.user) {
            console.info('[MindAuth]: تم تسجيل الدخول بنجاح:', result.user.email);
            await provisionUserRecord(result.user);
            
            // إغلاق نافذة تسجيل الدخول المنبثقة إن وجدت
            if (window.MindDashboard && window.MindDashboard.closeLoginModal) {
                window.MindDashboard.closeLoginModal();
            }

            // إشعار اكتمال المصادقة وفحص ظهور خطاف التسويق (Onboarding Modal)
            window.dispatchEvent(new CustomEvent('mind:auth:success', { detail: { user: result.user } }));
            
            if (window.MindDashboard && window.MindDashboard.checkOnboarding) {
                window.MindDashboard.checkOnboarding(result.user);
            }
        }
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.info('[MindAuth]: المستخدم قام بإغلاق نافذة تسجيل الدخول.');
            return;
        }
        console.error('[MindAuth]: تعثر تسجيل الدخول:', error);
        alert(error.message || 'تعذر إتمام المصادقة عبر Google.');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.removeAttribute('data-loading');
            btn.classList.remove('loading');
        }
    }
}

/**
 * دالة تسجيل الخروج
 */
async function signOutUser() {
    if (!auth) return;
    try {
        await auth.signOut();
        console.info('[MindAuth]: تم تسجيل الخروج بنجاح.');
        sessionStorage.removeItem('mind_user_session');
        window.dispatchEvent(new CustomEvent('mind:auth:logout'));
        if (window.MindDashboard && window.MindDashboard.updateNavbarAuth) {
            window.MindDashboard.updateNavbarAuth(null);
        }
    } catch (error) {
        console.error('[MindAuth]: خطأ أثناء تسجيل الخروج:', error);
    }
}

/**
 * مراقب الجلسة التلقائي (Auth State Observer)
 */
if (auth) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const sessionData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || "السالك المعرفي",
                photoURL: user.photoURL || "",
                lastLogin: Date.now()
            };
            sessionStorage.setItem('mind_user_session', JSON.stringify(sessionData));
            window.currentUser = user;
        } else {
            sessionStorage.removeItem('mind_user_session');
            window.currentUser = null;
        }

        // تحديث شريط التصفح العلوي
        if (window.MindDashboard && window.MindDashboard.updateNavbarAuth) {
            window.MindDashboard.updateNavbarAuth(user);
        }

        window.dispatchEvent(new CustomEvent('mind:auth:changed', { detail: { user } }));
    });
}

// تصدير واجهة المحرك للنافذة العامة
window.MindAuth = {
    auth,
    db,
    signInWithGoogle: signInWithGooglePopup,
    signOut: signOutUser,
    provisionUserRecord
};

