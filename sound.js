/**
 * ==============================================================================
 * MIND IN A BOX — SOVEREIGN HARMONIC SOUND ENGINE (Web Audio API)
 * Zero Dependencies · Pure Mathematical Synthesis · Studio Grade Resonance
 * Frequencies: 432 Hz, 528 Hz, 14 Hz Beta, 7.83 Hz Schumann
 * ==============================================================================
 */

const SovereignAudio = (() => {
    'use strict';

    let audioCtx = null;
    let isMuted = false;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    /**
     * 1. النغمة الترددية النقية (Harmonic Frequency Pulse)
     * تدعم ترددات السكينة والوقار: 432Hz و 528Hz وغيرها
     */
        let currentOsc = null;
    let currentGain = null;

    function playTone(frequency, duration = 1.8, type = 'sine', gainLevel = 0.18, loopInfinite = false) {
        if (isMuted) return;
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            // Stop existing infinite loop if there is one
            if (currentOsc && currentGain) {
                const now = ctx.currentTime;
                currentGain.gain.cancelScheduledValues(now);
                currentGain.gain.setValueAtTime(currentGain.gain.value, now);
                currentGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
                currentOsc.stop(now + 0.6);
                currentOsc = null;
                currentGain = null;
            }

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = type;
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(Math.min(frequency * 3, 3000), ctx.currentTime);

            const now = ctx.currentTime;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.5);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);

            if (!loopInfinite) {
                gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
                osc.stop(now + duration + 0.05);
            } else {
                // Keep reference for stopping later
                currentOsc = osc;
                currentGain = gain;
            }
        } catch (e) {
            console.warn('[SovereignAudio]: يتعذر تشغيل التردد:', e);
        }
    }

    /**
     * 2. نقرة تفاعلية فخمة (Tactile Obsidian Click) لجميع الأزرار
     */
    function playClick() {
        if (isMuted) return;
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.04);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {}
    }

    /**
     * 3. جرس إنجاز العهد (Golden Achievement Chime)
     * ثلاثي نغمي ذهبي ناعم عند تحديد العادات وإنجاز المهام
     */
    function playChime() {
        if (isMuted) return;
        const ctx = getAudioContext();
        if (!ctx) return;

        const chord = [528, 660, 792]; // سلم متناغم
        chord.forEach((freq, i) => {
            setTimeout(() => {
                playTone(freq, 1.2, 'sine', 0.10);
            }, i * 70);
        });
    }

    /**
     * 4. نغمة حضور المستشار الحكيم (Mystic Sage Resonance)
     */
    function playSageDrone() {
        if (isMuted) return;
        playTone(216, 2.5, 'sine', 0.15); // قرار الـ 432 Hz
        setTimeout(() => playTone(432, 2.2, 'triangle', 0.08), 150);
    }

    /**
     * 5. الربط التلقائي بجميع أزرار المنصة
     */
    function autoBind() {
        // ربط أزرار المزاج بالترددات المخصصة (مع فتح AudioContext مباشرةً)
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // استيقاظ AudioContext فوري مع الضغطة
                const ctx = getAudioContext();
                if (ctx && ctx.state === 'suspended') {
                    ctx.resume().then(() => {
                        _playMoodSound(btn.getAttribute('data-mood'));
                    });
                } else {
                    _playMoodSound(btn.getAttribute('data-mood'));
                }
            });
        });

        // ربط مربعات الاختيار في محاريب الجرد
        document.querySelectorAll('.habit-check').forEach(chk => {
            chk.addEventListener('change', () => {
                const ctx = getAudioContext();
                if (ctx && ctx.state === 'suspended') {
                    ctx.resume().then(() => { if (chk.checked) playChime(); else playClick(); });
                } else {
                    if (chk.checked) playChime(); else playClick();
                }
            });
        });

        // ربط باقي الأزرار بالنقرة الفاخرة
        document.querySelectorAll('button:not(.mood-btn), .btn, .card-action-btn, .btn-logout, .modal-close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctx = getAudioContext();
                if (ctx && ctx.state === 'suspended') {
                    ctx.resume().then(() => {
                        if (btn.id === 'sageSendBtn' || btn.id === 'btnSendChat') playSageDrone();
                        else playClick();
                    });
                } else {
                    if (btn.id === 'sageSendBtn' || btn.id === 'btnSendChat') playSageDrone();
                    else playClick();
                }
            });
        });
    }

    function _playMoodSound(mood) {
        const INF = true;
        if (mood === 'peace')       playTone(432, 2.0, 'sine', 0.20, INF);
        else if (mood === 'dignity')     playTone(528, 2.0, 'sine', 0.20, INF);
        else if (mood === 'focus')       playTone(280, 1.5, 'sine', 0.16, INF);
        else if (mood === 'restoration') playTone(136.1, 2.2, 'sine', 0.22, INF);
        else if (mood === 'shock')       playTone(880, 0.8, 'sawtooth', 0.08, INF);
        else playClick();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoBind);
    } else {
        autoBind();
    }

    return {
        playTone,
        playClick,
        playChime,
        playSageDrone,
        toggleMute: () => { isMuted = !isMuted; return isMuted; },
        isMuted: () => isMuted
    };
})();

window.SovereignAudio = SovereignAudio;

