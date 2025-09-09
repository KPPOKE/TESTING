export type FavoriteSet = Set<string>;

const KEY = "favorites";

export function loadFavorites(): FavoriteSet {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

export function saveFavorites(favs: FavoriteSet) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(Array.from(favs)));
  } catch {
    // ignore
  }
}

export function isFavorite(favs: FavoriteSet, id: string) {
  return favs.has(id);
}

export function toggleFavorite(favs: FavoriteSet, id: string): FavoriteSet {
  const next = new Set(favs);
  if (next.has(id)) next.delete(id); else next.add(id);
  return next;
}
