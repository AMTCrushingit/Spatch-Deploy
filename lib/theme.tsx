"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light", toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const saved = localStorage.getItem("rivva-theme") as Theme;
    if (saved) setTheme(saved);
  }, []);
  function toggle() {
    setTheme(t => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem("rivva-theme", next);
      return next;
    });
  }
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div data-theme={theme} style={{
        background: theme === "light" ? "#F8F6F2" : "#080810",
        color: theme === "light" ? "#1A1A2E" : "#FFFFFF",
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() { return useContext(ThemeContext); }

// Theme-aware style helpers
export function t(theme: Theme, light: string, dark: string) {
  return theme === "light" ? light : dark;
}

export const colors = {
  bg: (theme: Theme) => theme === "light" ? "#F8F6F2" : "#080810",
  bgCard: (theme: Theme) => theme === "light" ? "#FFFFFF" : "rgba(255,255,255,0.04)",
  bgSection: (theme: Theme) => theme === "light" ? "#FFFFFF" : "#0D0D1A",
  bgMuted: (theme: Theme) => theme === "light" ? "#F0EDE8" : "rgba(255,255,255,0.05)",
  border: (theme: Theme) => theme === "light" ? "#E8E2D9" : "rgba(255,255,255,0.08)",
  text: (theme: Theme) => theme === "light" ? "#1A1A2E" : "#FFFFFF",
  textMuted: (theme: Theme) => theme === "light" ? "#6B6560" : "rgba(255,255,255,0.5)",
  textFaint: (theme: Theme) => theme === "light" ? "#9A9490" : "rgba(255,255,255,0.3)",
  navBg: (theme: Theme) => theme === "light" ? "rgba(248,246,242,0.92)" : "rgba(8,8,16,0.88)",
  navBorder: (theme: Theme) => theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
  inputBg: (theme: Theme) => theme === "light" ? "#FFFFFF" : "rgba(255,255,255,0.07)",
  shadow: (theme: Theme) => theme === "light" ? "0 2px 20px rgba(0,0,0,0.08)" : "0 2px 20px rgba(0,0,0,0.4)",
  // Brand
  coral: "#FF6B4A",
  gold: "#FFB347",
  teal: "#0ABFBC",
  green: "#2ECC71",
  credii: "#E63946",
};