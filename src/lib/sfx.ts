let audioCtx: AudioContext | null = null;

type WindowWithWebkit = Window & { webkitAudioContext?: typeof AudioContext };

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try {
      const w = window as WindowWithWebkit;
      const Ctor = window.AudioContext || w.webkitAudioContext;
      audioCtx = Ctor ? new Ctor() : null;
    } catch {
      audioCtx = null;
    }
  }
  return audioCtx;
}

function beep(freq: number, durationMs: number, type: OscillatorType = 'sine', volume = 0.03) {
  const ctx = getCtx();
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = volume;
  o.connect(g);
  g.connect(ctx.destination);
  const now = ctx.currentTime;
  o.start(now);
  o.stop(now + durationMs / 1000);
}

export function playCorrect(muted: boolean) {
  if (muted) return;
  beep(880, 120, 'sine');
  setTimeout(() => beep(1320, 150, 'sine'), 120);
}

export function playIncorrect(muted: boolean) {
  if (muted) return;
  beep(200, 200, 'sawtooth');
}
