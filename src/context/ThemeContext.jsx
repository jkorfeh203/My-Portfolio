import { createContext, useContext, useEffect, useRef, useState } from "react";
import { THEMES, DEFAULT_THEME } from "../data/themes";

const ThemeContext = createContext(null);

function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
  // Update favicon to match the active accent color
  const accent = theme.vars["--accent"];
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect x="3" y="3" width="42" height="42" rx="9" ry="9" stroke="${accent}" stroke-width="2.5" fill="none"/><text x="8" y="33" font-family="Outfit,sans-serif" font-size="22" font-weight="800" fill="${accent}" letter-spacing="-1">JK</text></svg>`;
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgFavicon)}`;
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    document.head.appendChild(link);
  }
  link.href = dataUrl;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return THEMES.find((t) => t.id === saved) ?? DEFAULT_THEME;
  });
  const switchTimer = useRef(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Apply on first paint (before React hydrates)
  useEffect(() => {
    applyTheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (t) => {
    clearTimeout(switchTimer.current);
    document.documentElement.classList.add("theme-switching");
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t.id);
    switchTimer.current = setTimeout(() => document.documentElement.classList.remove("theme-switching"), 500);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
