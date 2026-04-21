import { useState, useEffect } from "react";

const KEY = "jk-bookmarks";

export function useBookmarks(scholarships) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Drop IDs that no longer exist in the live data
  useEffect(() => {
    if (!scholarships || scholarships.length === 0) return;
    const validIds = new Set(scholarships.map(s => s.id));
    setBookmarks(prev => {
      const cleaned = prev.filter(id => validIds.has(id));
      if (cleaned.length !== prev.length) localStorage.setItem(KEY, JSON.stringify(cleaned));
      return cleaned;
    });
  }, [scholarships]);

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const isBookmarked = (id) => bookmarks.includes(id);

  return [bookmarks, toggleBookmark, isBookmarked];
}
