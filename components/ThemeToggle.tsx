"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("nexus-theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.className = saved;
    }
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem("nexus-theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 bg-bg-elevated rounded-lg border border-border-subtle flex items-center justify-center cursor-pointer hover:bg-bg-card transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 9.5A6 6 0 016.5 2 6 6 0 1014 9.5z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )}
    </button>
  );
}
