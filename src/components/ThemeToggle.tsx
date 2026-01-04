"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "nv-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial: Theme =
      stored === "dark" || stored === "light"
        ? (stored as Theme)
        : prefersLight
          ? "light"
          : "dark";

    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, hydrated]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const nextLabel = theme === "dark" ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--nv-border)] bg-[var(--nv-bg)]/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--nv-ink)] shadow-[0_10px_30px_rgba(0,11,20,0.35)] transition hover:border-[var(--nv-primary)]/70 hover:text-[var(--nv-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nv-primary-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nv-bg)]"
    >
      <span className="hidden sm:inline">{hydrated ? nextLabel : "Theme"}</span>
      <span className="inline sm:hidden">
        {hydrated ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--nv-primary)] text-[var(--nv-bg)] shadow-[0_8px_20px_rgba(0,210,255,0.28)] transition group-hover:bg-[var(--nv-primary-strong)]">
        {theme === "dark" ? (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1-9.45-9.45 1 1 0 0 0-.14-1.05A1 1 0 0 0 10 2a10 10 0 1 0 12 12 1 1 0 0 0-.36-1z" />
          </svg>
        ) : (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 0 1-2 0V5.5a1 1 0 0 1 1-1zm0 11a1 1 0 0 1 1 1V18a1 1 0 0 1-2 0v-1.5a1 1 0 0 1 1-1zm7.5-5.5a1 1 0 0 1 1 1h-1.5a1 1 0 0 1 0-2H20.5zm-12.5 0a1 1 0 0 1 1 1H6a1 1 0 0 1 0-2h1.5zm9.6-4.6a1 1 0 0 1 1.4 1.4l-1.06 1.06a1 1 0 1 1-1.42-1.42zM8.96 14.54a1 1 0 0 1 1.4 1.42l-1.06 1.06a1 1 0 0 1-1.42-1.42zm8.88 1.48a1 1 0 0 1 0 1.41l-1.06 1.06a1 1 0 0 1-1.42-1.41l1.06-1.06a1 1 0 0 1 1.42 0zM9.3 6.22a1 1 0 0 1 0 1.42L8.24 8.7A1 1 0 0 1 6.82 7.3L7.88 6.22a1 1 0 0 1 1.42 0zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
          </svg>
        )}
      </span>
    </button>
  );
}
