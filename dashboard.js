/**
 * ==============================================================================
 * MIND IN A BOX — SOVEREIGN DASHBOARD INTERACTIVE ENGINE
 * Manages: Navbar Auth Capsule, Profile Dropdown, Modals, 
 *          Neuromarketing Onboarding Hook, and Interactive Cards
 * ==============================================================================
 */

const MindDashboard = (() => {
    // عناصر DOM الأساسية
    let authNavContainer, loginModal, onboardingModal, profileDropdown;
    let habitCheckboxes, habitProgressBar, habitProgressText;
    let moodButtons, moodFrequencyValue, moodStateDisplay;
    let sageInput, sageSendBtn, sageResponseText;

    function init() {
        cacheDOM();
        bindEvents();
        initHabitsTracker();
        initMoodEngine();
        initSageAdvisor();
        initDateDisplay();
        
        // التحقق من الجلسة المخزنة فوراً
        const cachedSession = sessionStorage.getItem('mind_user_session');
        if (cachedSession) {
            try {
                const user = JSON.parse(cachedSession);
                updateNavbarAuth(user);
            } catch (e) {}
        }
    }

    function cacheDOM() {
        authNavContainer = document.getElementById('authNavContainer');
        loginModal = document.getElementById('loginModal');
        onboardingModal = document.getElementById('onboardingModal');
        profileDropdown = document.getElementById('profileDropdown');

        habitCheckboxes = document.querySelectorAll('.habit-check');
        habitProgressBar = document.getElementById('habitProgressBar');
        habitProgressText = document.getElementById('habitProgressText');

        moodButtons = document.querySelectorAll('.mood-btn');
        moodFrequencyValue = document.getElementById('moodFrequencyValue');
        moodStateDisplay = document.getElementById('moodStateDisplay');

        sageInput = document.getElementById('sageInput');
        sageSendBtn = document.getElementById('sageSendBtn');
        sageResponseText = document.getElementById('sageResponseText');
    }

    function bindEvents() {
        // إغلاق القوائم المنسدلة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (profileDropdown && !profileDropdown.contains(e.target) && !e.target.closest('#userAvatarBtn')) {
                profileDropdown.classList.remove('active');
            }
        });

        // زر تبديل اللغة في القائمة المنسدلة
        const langToggleBtn = document.getElementById('langToggleBtn');
        if (langToggleBtn) {
            langToggleBtn.addEventListener('click', () => {
                if (window.MindI18n) window.MindI18n.toggleLanguage();
            });
        }

        // زر تسجيل الخروج في القائمة
        const logoutBtn = document.getElementById('menuLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (window.MindAuth) window.MindAuth.signOut();
                if (profileDropdown) profileDropdown.classList.remove('active');
            });
        }

        // أزرار إغلاق النوافذ المنبثقة
        document.querySelectorAll('.modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                closeAllModals();
            });
        });

        // إغلاق المودال عبر النقر على الخلفية
        [loginModal, onboardingModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeAllModals();
                });
            }
        });

        // زر Google داخل الـ Login Modal
        const btnGoogleModal = document.getElementById('btnGoogleModal');
        if (btnGoogleModal) {
            btnGoogleModal.addEventListener('click', () => {
                if (window.MindAuth) window.MindAuth.signInWithGoogle(btnGoogleModal);
            });
        }

        // أزرار خطاف التسويق والنمو (Onboarding Modal)
        const btnClaimTrial = document.getElementById('btnClaimTrial');
        if (btnClaimTrial) {
            btnClaimTrial.addEventListener('click', () => {
                activateTrialMembership();
            });
        }

        const btnDirectMonthly = document.getElementById('btnDirectMonthly');
        if (btnDirectMonthly) {
            btnDirectMonthly.addEventListener('click', () => {
                window.location.href = 'pricing.html';
            });
        }
    }

    /**
     * تحديث حالة شريط التصفح العلوي (Logged Out Button vs Logged In Avatar)
     */
    function updateNavbarAuth(user) {
        if (!authNavContainer) authNavContainer = document.getElementById('authNavContainer');
        if (!authNavContainer) return;

        if (user) {
            const avatarUrl = user.photoURL || '';
            const initial = (user.displayName || user.email || 'س').charAt(0).toUpperCase();

            authNavContainer.innerHTML = `
                <div class="user-profile-capsule">
                    <button type="button" id="userAvatarBtn" class="user-avatar-btn" aria-label="ملف المستخدم">
                        ${avatarUrl ? 
                            `<img src="${avatarUrl}" alt="${user.displayName || 'مستخدم'}" class="avatar-img">` :
                            `<div class="avatar-placeholder">${initial}</div>`
                        }
                        <span class="user-status-indicator"></span>
                    </button>
                </div>
            `;

            const avatarBtn = document.getElementById('userAvatarBtn');
            if (avatarBtn) {
                avatarBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleProfileDropdown(user);
                });
            }
        } else {
            authNavContainer.innerHTML = `
                <button type="button" id="btnOpenLoginModal" class="btn-sovereign-nav" data-i18n="navLoginBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-inline-end: 6px;"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                    <span>${window.MindI18n ? window.MindI18n.t('navLoginBtn') : 'تسجيل الدخول / البدء'}</span>
                </button>
            `;

            const openBtn = document.getElementById('btnOpenLoginModal');
            if (openBtn) {
                openBtn.addEventListener('click', () => openLoginModal());
            }

            if (profileDropdown) profileDropdown.classList.remove('active');
        }
    }

    function toggleProfileDropdown(user) {
        if (!profileDropdown) profileDropdown = document.getElementById('profileDropdown');
        if (!profileDropdown) return;

        // تحديث بيانات المستخدم في القائمة
        const userNameEl = document.getElementById('dropdownUserName');
        const userEmailEl = document.getElementById('dropdownUserEmail');
        if (userNameEl) userNameEl.textContent = user.displayName || 'السالك السيادي';
        if (userEmailEl) userEmailEl.textContent = user.email || '';

        profileDropdown.classList.toggle('active');
    }

    function openLoginModal() {
        if (loginModal) loginModal.classList.add('active');
    }

    function closeLoginModal() {
        if (loginModal) loginModal.classList.remove('active');
    }

    function closeAllModals() {
        if (loginModal) loginModal.classList.remove('active');
        if (onboardingModal) onboardingModal.classList.remove('active');
    }

    /**
     * التحقق من ظهور خطاف التسويق لأول مرة (Neuromarketing Onboarding Hook)
     */
    function checkOnboarding(user) {
        if (!user) return;
        const onboardKey = 'mib_onboarded_' + user.uid;
        const alreadyOnboarded = localStorage.getItem(onboardKey);

        if (!alreadyOnboarded) {
            setTimeout(() => {
                if (onboardingModal) onboardingModal.classList.add('active');
            }, 600);
        }
    }

    function activateTrialMembership() {
        if (window.currentUser) {
            localStorage.setItem('mib_onboarded_' + window.currentUser.uid, 'trial_activated');
        }
        closeAllModals();
        alert('تهانينا! تم تفعيل ١٤ يوماً من التجربة المطلقة لكافة محاريب الوعي والذكاء السيادي.');
    }

    /**
     * وحدة "محاريب الجرد" - التتبع التفاعلي
     */
    function initHabitsTracker() {
        const savedHabits = JSON.parse(localStorage.getItem('mib_habits_today') || '{}');

        habitCheckboxes.forEach((cb, idx) => {
            if (savedHabits[idx]) cb.checked = true;

            cb.addEventListener('change', () => {
                savedHabits[idx] = cb.checked;
                localStorage.setItem('mib_habits_today', JSON.stringify(savedHabits));
                calculateHabitProgress();
            });
        });

        calculateHabitProgress();
    }

    function calculateHabitProgress() {
        if (!habitCheckboxes.length) return;
        const checkedCount = Array.from(habitCheckboxes).filter(cb => cb.checked).length;
        const percentage = Math.round((checkedCount / habitCheckboxes.length) * 100);

        if (habitProgressBar) habitProgressBar.style.width = `${percentage}%`;
        if (habitProgressText) habitProgressText.textContent = `${percentage}%`;
    }

    /**
     * وحدة "هندسة المزاج" - الترددات والكيمياء النفسية
     */
    const moodSpectralMap = {
        peace: { freq: '432 Hz', ar: 'سكينة مطلقة وتفريغ للضجيج', en: 'Absolute Serenity & Noise Purge' },
        focus: { freq: '14 Hz (Beta)', ar: 'تركيز استراتيجي فائق ووقار', en: 'Ultra Deep Strategic Focus' },
        dignity: { freq: '528 Hz', ar: 'وقار رواقي وثبات داخلي', en: 'Stoic Dignity & Inner Equilibrium' },
        restoration: { freq: '7.83 Hz (Schumann)', ar: 'استرداد الطاقة الحيوية للخلايا', en: 'Vital Energy Restoration' },
        shock: { freq: 'Threshold 999', ar: 'صدمة فلسفية لإيقاظ الوعي الخامل', en: 'Philosophical Awakening Shock' }
    };

    function initMoodEngine() {
        moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                moodButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const moodKey = btn.getAttribute('data-mood');
                const data = moodSpectralMap[moodKey] || moodSpectralMap.peace;

                if (moodFrequencyValue) moodFrequencyValue.textContent = data.freq;
                if (moodStateDisplay) {
                    const isRTL = document.documentElement.lang === 'ar';
                    moodStateDisplay.textContent = isRTL ? data.ar : data.en;
                }

                localStorage.setItem('mib_current_mood', moodKey);
            });
        });

        const savedMood = localStorage.getItem('mib_current_mood') || 'peace';
        const targetBtn = document.querySelector(`.mood-btn[data-mood="${savedMood}"]`);
        if (targetBtn) targetBtn.click();
    }

    /**
     * وحدة "المستشار الذكي" - تفاعل فوري مع الحكيم
     */
    function initSageAdvisor() {
        if (!sageSendBtn || !sageInput) return;

        const handleSageConsult = async () => {
            const query = sageInput.value.trim();
            if (!query) return;

            sageSendBtn.disabled = true;
            if (sageResponseText) {
                const waitText = window.MindI18n ? window.MindI18n.t('card3Waiting') : 'ينظر الحكيم في الأزل...';
                sageResponseText.innerHTML = `<span class="sage-thinking">${waitText}</span>`;
            }

            try {
                // إذا كان محرك ai.js متصلاً
                if (window.SageCore && window.SageCore.query) {
                    const reply = await window.SageCore.query(query);
                    if (sageResponseText) sageResponseText.textContent = reply;
                } else {
                    // استجابة رواقية فلسفية فورية مدمجة
                    setTimeout(() => {
                        const stoicReplies = [
                            "«ما يقلقك ليس الأمور بذاتها، بل نظرتك إليها. تخلص من الحكم المسبق تسترد سيادتك فوراً.»",
                            "«إذا كان الأمر بيدك فما الداعي للقلق؟ وإذا كان خارج سيطرتك فما جدوى الجزع؟ ركز على ما تملكه.»",
                            "«الهدوء ليس غياب الفوضى، بل حضور السيادة في قلب العاصفة. تماسك، فأنت عقل في صندوق.»",
                            "«الرغبة في إرضاء الجميع هي بداية العبودية. السيادة تبدأ حين تكتفي بالانسجام مع الحقيقة.»"
                        ];
                        const randomReply = stoicReplies[Math.floor(Math.random() * stoicReplies.length)];
                        if (sageResponseText) sageResponseText.textContent = randomReply;
                    }, 800);
                }
            } catch (err) {
                if (sageResponseText) sageResponseText.textContent = "«توقف برهة وتنفس بعمق؛ الحكيم حاضر دائماً في سكونك.»";
            } finally {
                sageSendBtn.disabled = false;
                sageInput.value = '';
            }
        };

        sageSendBtn.addEventListener('click', handleSageConsult);
        sageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSageConsult();
        });
    }

    function initDateDisplay() {
        const dateEl = document.getElementById('sanctuaryDate');
        if (!dateEl) return;
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('ar-SA', options);
    }

    return {
        init,
        updateNavbarAuth,
        openLoginModal,
        closeLoginModal,
        checkOnboarding
    };
})();

// تشغيل بعد تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
    MindDashboard.init();
});

window.MindDashboard = MindDashboard;

