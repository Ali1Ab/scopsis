import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const THEME_KEY = "todo_theme";

function applyThemeToDocument(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved === "dark" || saved === "light") return saved;
    // default to system preference
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    applyThemeToDocument(theme);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(THEME_KEY, theme);
      }
    } catch {
      // ignore
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return { theme, setTheme, toggleTheme } as const;
}
