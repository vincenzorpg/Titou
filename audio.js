// Synthétiseur d'effets sonores rétro / anime via Web Audio API (100% hors-ligne)
const SoundFX = (() => {
  let ctx = null;
  let enabled = true;

  function ensureCtx() {
    if (!enabled) return null;
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function tone(freq, duration, type = 'triangle', volume = 0.14, delay = 0) {
    const c = ensureCtx();
    if (!c) return;
    const now = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  return {
    setEnabled(val) {
      enabled = !!val;
    },
    isEnabled() {
      return enabled;
    },
    click() {
      tone(520, 0.06, 'square', 0.06);
    },
    correct(combo = 1) {
      const boost = Math.min(combo * 35, 210);
      tone(440 + boost, 0.11, 'triangle', 0.16, 0);
      tone(587 + boost, 0.14, 'triangle', 0.18, 0.08);
    },
    crit() {
      // Effet Serious Punch / Dragon Slayer
      tone(180, 0.16, 'sawtooth', 0.2, 0);
      tone(523, 0.12, 'square', 0.14, 0.06);
      tone(784, 0.18, 'triangle', 0.18, 0.14);
      tone(1046, 0.25, 'triangle', 0.18, 0.22);
    },
    wrong() {
      tone(220, 0.14, 'sawtooth', 0.12, 0);
      tone(165, 0.22, 'sawtooth', 0.12, 0.12);
    },
    victory() {
      const notes = [523, 659, 784, 1046];
      notes.forEach((n, i) => tone(n, 0.22, 'triangle', 0.16, i * 0.11));
    },
    levelUp() {
      const notes = [440, 554, 659, 880, 1108];
      notes.forEach((n, i) => tone(n, 0.18, 'square', 0.11, i * 0.08));
    }
  };
})();
