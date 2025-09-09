const BEST_KEY = "quizBest";
const BEST_KEY_PREFIX = "quizBest_"; // e.g., quizBest_5, quizBest_8

export function loadBestScore(): number {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(BEST_KEY);
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function saveBestScore(score: number) {
  if (typeof window === 'undefined') return;
  try {
    const current = loadBestScore();
    if (score > current) {
      window.localStorage.setItem(BEST_KEY, String(score));
    }
  } catch {
    // ignore
  }
}

export function loadBestScoreFor(total: number): number {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(`${BEST_KEY_PREFIX}${total}`);
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function saveBestScoreFor(total: number, score: number) {
  if (typeof window === 'undefined') return;
  try {
    const current = loadBestScoreFor(total);
    if (score > current) {
      window.localStorage.setItem(`${BEST_KEY_PREFIX}${total}`, String(score));
    }
    // also keep global best
    saveBestScore(score);
  } catch {
    // ignore
  }
}
