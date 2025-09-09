export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, opts?: { lang?: string; rate?: number; pitch?: number; volume?: number }) {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts?.lang ?? 'id-ID';
  u.rate = opts?.rate ?? 1;
  u.pitch = opts?.pitch ?? 1;
  u.volume = opts?.volume ?? 1;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  if (!canSpeak()) return false;
  return window.speechSynthesis.speaking;
}
