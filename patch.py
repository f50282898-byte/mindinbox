import sys, re

def update_vault():
    try:
        with open('c:\\templet\\vault.html', 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open('c:\\templet\\vault.html', 'r', encoding='windows-1256') as f:
            content = f.read()

    # Inject the Secret Council and fading logic
    secret_council_html = '''
        <!-- Council & Organic Fade CSS -->
        <style>
            .secret-council {
                position: relative;
                border: 1px solid var(--gold-border);
                background: var(--bg-surface-elevated);
                border-radius: 4px;
                overflow: hidden;
                margin-top: 40px;
                padding: 40px;
                text-align: center;
                min-height: 400px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .premium-lock {
                position: absolute; inset: 0; z-index: 10;
                background: url('https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=800&q=80') center/cover;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
            }
            .premium-lock::before {
                content: ''; position: absolute; inset: 0; background: rgba(5,5,5,0.85);
            }
            .lock-content {
                position: relative; z-index: 11; text-align: center;
            }
            .lock-content svg { width: 64px; height: 64px; stroke: var(--gold-primary); margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(181,149,81,0.5)); }
            
            .memory-entry.faded {
                filter: blur(5px); opacity: 0.6; cursor: pointer; transition: all 1s ease;
            }
            .memory-entry.faded.revealed {
                filter: blur(0); opacity: 1;
            }
        </style>

        <section class="secret-council anti-ai-border">
            <audio id="fireAudio" loop src="https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"></audio>
            
            <div id="premiumLock" class="premium-lock">
                <div class="lock-content">
                    <svg viewBox='0 0 24 24' fill='none' stroke-width='1.5'><rect x='3' y='11' width='18' height='11' rx='2' ry='2'/><path d='M7 11V7a5 5 0 0 1 10 0v4'/></svg>
                    <h2 style="font-family: var(--font-serif); color: var(--gold-light); font-size: 2rem;">المجلس السري</h2>
                    <p style="color: var(--text-tertiary); margin-top: 10px; font-size: 1.1rem;">هذا الفضاء مغلق. يتطلب الارتقاء بعهدك والانضمام لطبقة السالكين.</p>
                </div>
            </div>

            <div id="councilContent" style="display: none; position: relative; z-index: 5;">
                <h2 style="font-family: var(--font-serif); color: #e74c3c; font-size: 2.5rem; text-shadow: 0 0 20px rgba(231,76,60,0.5);">المجلس السري</h2>
                <p style="color: var(--text-secondary); margin-top: 20px; font-size: 1.2rem; line-height: 1.8;">مرحباً بك أيها السالك.<br>هنا تحترق الأنا، وتتلاقى الأرواح في صمت. استمع لصوت النار.</p>
            </div>
        </section>
    '''
    
    if 'secret-council' not in content:
        content = content.replace('</main>', secret_council_html + '\n</main>')

    # Add the JS logic
    js_logic = '''
            const isPremium = localStorage.getItem('sys_premium') === 'true';
            if (isPremium) {
                const pLock = document.getElementById('premiumLock');
                const cContent = document.getElementById('councilContent');
                if(pLock) pLock.style.display = 'none';
                if(cContent) cContent.style.display = 'block';
                const fire = document.getElementById('fireAudio');
                if(fire) {
                    fire.volume = 0.3;
                    document.body.addEventListener('click', () => { fire.play().catch(()=>{}); }, {once: true});
                }
            }

            document.querySelectorAll('.memory-entry').forEach((entry, idx) => {
                if (idx > 1) { 
                    entry.classList.add('faded');
                    let holdTimer;
                    entry.addEventListener('mousedown', () => {
                        holdTimer = setTimeout(() => { entry.classList.add('revealed'); }, 2000);
                    });
                    entry.addEventListener('mouseup', () => clearTimeout(holdTimer));
                    entry.addEventListener('mouseleave', () => clearTimeout(holdTimer));
                    entry.addEventListener('touchstart', () => {
                        holdTimer = setTimeout(() => { entry.classList.add('revealed'); }, 2000);
                    });
                    entry.addEventListener('touchend', () => clearTimeout(holdTimer));
                }
            });
    '''
    if 'faded' not in content:
        content = content.replace('initOrganicMemories() {', 'initOrganicMemories() {\n' + js_logic)

    with open('c:\\templet\\vault.html', 'w', encoding='utf-8') as f:
        f.write(content)

def update_core():
    try:
        with open('c:\\templet\\core.js', 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open('c:\\templet\\core.js', 'r', encoding='windows-1256') as f:
            content = f.read()

    # 1. Update Security Shield
    security_replacement = '''    const SecurityShield = (() => {
        function init() {
            setTimeout(() => {
                console.log('%cتوقف.', 'color: #e74c3c; font-size: 50px; font-family: serif; font-weight: bold; text-shadow: 0 0 15px rgba(231,76,60,0.8);');
                console.log('%cأنت تحاول تفكيك الجدران بدلاً من مواجهة نفسك. هذا الملاذ محمي بقوانين صارمة. عُد إلى وعيك وانشغل بإصلاح ذاتك.', 'color: #c5a059; font-size: 18px;');
            }, 1000);
            
            document.addEventListener('contextmenu', e => {
                if(e.target && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
            });
            document.addEventListener('keydown', e => {
                if(e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
                    e.preventDefault();
                }
            });
        }
        return { init };
    })();'''
    
    content = re.sub(r'const SecurityShield = \(\(\) => \{.*?(?=\/\* ===)', security_replacement + '\n\n    ', content, flags=re.DOTALL)

    # 2. Update Biometric Sync
    bio_replacement = '''    const BiometricSync = (() => {
        function injectBreath() {
            if (document.getElementById('bioBreathOverlay')) return;
            const div = document.createElement('div');
            div.id = 'bioBreathOverlay';
            div.className = 'bio-breath-overlay';
            document.body.prepend(div);
        }
        function applyMidnightDim() {
            const hour = new Date().getHours();
            if (hour >= 0 && hour < 5 && localStorage.getItem('sys_midnight_calm') !== 'false') {
                const dimOverlay = document.createElement('div');
                dimOverlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.15);z-index:9998;pointer-events:none;mix-blend-mode:multiply;';
                document.body.appendChild(dimOverlay);
            }
        }
        function init() {
            injectBreath();
            applyMidnightDim();
        }
        return { init };
    })();'''
    
    content = re.sub(r'const BiometricSync = \(\(\) => \{.*?(?=\/\* ===|function boot)', bio_replacement + '\n\n    ', content, flags=re.DOTALL)

    with open('c:\\templet\\core.js', 'w', encoding='utf-8') as f:
        f.write(content)


def update_pricing():
    try:
        with open('c:\\templet\\pricing.html', 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open('c:\\templet\\pricing.html', 'r', encoding='windows-1256') as f:
            content = f.read()
            
    # Add Compass BG to pricing card
    compass_bg = "background: linear-gradient(180deg, rgba(10, 10, 15, 0.6) 0%, #030304 100%), url('https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200') center/cover;"
    content = content.replace('background: linear-gradient(180deg, rgba(10, 10, 15, 0.6) 0%, #030304 100%);', compass_bg)

    # Upsell logic replacing immediate location.href
    upsell_html = '''
    <div id="upsellModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:99999; flex-direction:column; justify-content:center; align-items:center; backdrop-filter:blur(10px);">
        <div style="background:var(--bg-surface); padding:40px; border:1px solid var(--gold-primary); border-radius:4px; text-align:center; max-width:500px;">
            <h2 style="color:var(--gold-light); font-family:var(--font-serif); font-size:2rem; margin-bottom:15px;">قبل ختم الميثاق...</h2>
            <p style="color:var(--text-secondary); margin-bottom:30px; line-height:1.8; font-size:1.1rem;">هل ترغب في ضم "كراسة الانضباط الرواقية" لعهدك؟ منهج مكتوب بدم السالكين يرافقك خطوة بخطوة. (بـ 7$ فقط)</p>
            <div style="display:flex; gap:15px; justify-content:center;">
                <button onclick="finalize(true)" style="background:var(--gold-primary); color:#000; font-weight:bold; border:none; padding:12px 24px; cursor:pointer;">ضم الكراسة والمتابعة</button>
                <button onclick="finalize(false)" style="background:transparent; color:var(--text-tertiary); border:1px solid rgba(255,255,255,0.2); padding:12px 24px; cursor:pointer;">لا، سأمضي وحدي</button>
            </div>
        </div>
    </div>
    <script>
        function finalize(withUpsell) {
            localStorage.setItem('sys_premium', 'true');
            if(withUpsell) alert('تم ضم الكراسة للعهد بنجاح.');
            window.location.href = 'dashboard.html';
        }
    </script>
    '''
    
    if 'upsellModal' not in content:
        content = content.replace('</body>', upsell_html + '\n</body>')
        content = content.replace("window.location.href = 'dashboard.html';", "document.getElementById('upsellModal').style.display = 'flex';")

    with open('c:\\templet\\pricing.html', 'w', encoding='utf-8') as f:
        f.write(content)

update_vault()
update_core()
update_pricing()

