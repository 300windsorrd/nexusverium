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

    // eslint-disable-next-line react-hooks/set-state-in-effect
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
  const label = theme === "dark" ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={hydrated ? `Switch to ${label.toLowerCase()}` : "Toggle color theme"}
      className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--nv-border)] bg-[var(--nv-bg)]/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--nv-ink)] shadow-[0_10px_30px_rgba(0,11,20,0.35)] transition hover:border-[var(--nv-primary)]/70 hover:text-[var(--nv-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nv-primary-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nv-bg)]"
    >
      <span className="hidden sm:inline">{hydrated ? label : "Theme"}</span>
      <span className="inline sm:hidden">
        {hydrated ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--nv-primary)] text-white shadow-[0_8px_20px_rgba(0,210,255,0.28)] transition group-hover:bg-[var(--nv-primary-strong)]">
        {theme === "light" ? (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
          </svg>
        ) : (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <path d="M12 2.4v2.5m0 14.2v2.5M4 12h2.5m11 0H20m-2.9-6.9 1.7-1.7M5.2 18.8l1.7-1.7m0-10.2-1.7-1.7m13.6 13.6-1.7-1.7" />
          </svg>
        )}
      </span>
    </button>
  );
}
