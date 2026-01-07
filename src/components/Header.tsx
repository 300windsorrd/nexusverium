"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { SearchItem } from "@/types";
import { ThemeToggle } from "@/components/ThemeToggle";
import { basePath, withBasePath } from "@/lib/paths";

interface HeaderProps {
  searchItems: SearchItem[];
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/now", label: "Timeline" },
  { href: "/contact", label: "Contact" },
];

function normalizePath(path: string) {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

function stripBasePath(path: string) {
  if (!basePath) return path;
  if (path === basePath) return "/";
  if (path.startsWith(`${basePath}/`)) {
    return path.slice(basePath.length);
  }
  return path;
}

export function Header({ searchItems }: HeaderProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = normalizePath(stripBasePath(pathname || "/"));

  const results = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return searchItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(clean) ||
          item.description.toLowerCase().includes(clean),
      )
      .slice(0, 8);
  }, [query, searchItems]);

  return (
    <header className="glass-surface sticky top-0 z-50 border-b border-[var(--nv-border)]/60 bg-[var(--nv-surface)]/80 backdrop-blur-md shadow-[var(--nv-card-shadow)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
        <Link href="/" className="flex items-start gap-2">
          <Image
            src={withBasePath("/Logo.png")}
            alt="Nexus Verium logo"
            width={44}
            height={44}
            sizes="(min-width: 768px) 44px, (min-width: 640px) 40px, 36px"
            className="h-9 w-9 rounded-full bg-[var(--nv-bg)]/40 object-cover sm:h-10 sm:w-10 md:h-11 md:w-11"
          />
          <div className="leading-tight">
            <span className="block text-xs uppercase tracking-[0.2em] text-[var(--nv-muted)]">
              Nexus Verium
            </span>
            <span className="text-sm font-semibold text-[var(--nv-primary-strong)]">
              Environmental Engineering & Restoration Organization
            </span>
          </div>
        </Link>
        <div className="flex w-full flex-col gap-3 sm:ml-auto sm:flex-row sm:items-center sm:gap-4">
          <div className="relative w-full flex-1 max-w-full sm:max-w-[460px]">
            <label className="sr-only" htmlFor="site-search">
              Search Nexus Verium
            </label>
            <div className="flex items-center gap-2 rounded-full border border-[var(--nv-border)] bg-[var(--nv-bg)]/60 px-3 py-2 shadow-sm transition focus-within:border-[var(--nv-primary-strong)] focus-within:shadow-[0_0_0_1px_rgba(0,210,255,0.4)]">
              <svg
                aria-hidden
                className="h-4 w-4 text-[var(--nv-muted)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
              <input
                id="site-search"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Search pillars, research, team"
                className="w-full border-0 bg-transparent text-sm text-[var(--nv-ink)] outline-none placeholder:text-[var(--nv-muted)]"
              />
            </div>
            {focused && results.length > 0 ? (
              <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-[var(--nv-border)] bg-[var(--nv-surface)] shadow-[0_20px_60px_rgba(0,11,20,0.65)]">
                <ul className="divide-y divide-[var(--nv-border)]">
                  {results.map((item) => (
                    <li key={`${item.type}-${item.title}`}>
                      <Link
                        href={item.href}
                        className="block px-4 py-3 hover:bg-[var(--nv-bg)]"
                      >
                        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-[var(--nv-muted)]">
                          <span>{item.type}</span>
                          <span>View</span>
                        </div>
                        <p className="text-sm font-semibold text-[var(--nv-ink)]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--nv-muted)]">
                          {item.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="hidden items-center gap-3 md:ml-auto md:flex">
            <nav className="flex items-center gap-4">
              {navLinks.map((item) => {
                const active = currentPath === normalizePath(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nv-nav-link nv-nav-link--desktop ${
                      active
                        ? "nv-nav-link--active nv-nav-link--elevated"
                        : "nv-nav-link--inactive"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="flex items-center justify-end border-t border-[var(--nv-border)]/70 px-4 py-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--nv-border)] bg-[var(--nv-bg)]/70 transition hover:border-[var(--nv-primary-strong)] animate-pulse"
            aria-haspopup="true"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menu de navegacion"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[var(--nv-primary-strong)]/30 shadow-[0_0_25px_rgba(0,210,255,0.85)] animate-pulse"
            />
            <span className="sr-only">Menú móvil</span>
            <Image
              src={withBasePath("/Logo.png")}
              alt="Logo de Nexus Verium"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
              style={{ transform: "rotate(-0.3turn)" }}
              priority
            />
          </button>
        </div>
        {mobileMenuOpen ? (
          <div className="divide-y divide-[var(--nv-border)]/70 border-t border-[var(--nv-border)]/70 bg-[var(--nv-surface)]">
            <nav className="flex flex-col gap-2 px-4 py-3">
              {navLinks.map((item) => {
                const active = currentPath === normalizePath(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`nv-nav-link nv-nav-link--mobile ${
                      active
                        ? "nv-nav-link--active"
                        : "nv-nav-link--inactive"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-3">
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
