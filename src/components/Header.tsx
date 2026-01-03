"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { SearchItem } from "@/types";

interface HeaderProps {
  searchItems: SearchItem[];
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];

export function Header({ searchItems }: HeaderProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

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
    <header className="glass-surface border-b border-white/40 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-6">
        <Link href="/" className="flex items-start gap-2">
          <Image
            src="/image.png"
            alt="Nexus Verium logo"
            width={44}
            height={44}
            sizes="(min-width: 768px) 44px, (min-width: 640px) 40px, 36px"
            className="h-9 w-9 rounded-full bg-white/70 object-cover sm:h-10 sm:w-10 md:h-11 md:w-11"
          />
          <div className="leading-tight">
            <span className="block text-xs uppercase tracking-[0.2em] text-[var(--nv-muted)]">
              Nexus Verium
            </span>
            <span className="text-sm font-semibold text-[var(--nv-primary)]">
              Responsible AI for Restoration
            </span>
          </div>
        </Link>
        <nav className="ml-auto hidden items-center gap-4 md:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
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
        <div className="relative w-full max-w-[320px]">
          <label className="sr-only" htmlFor="site-search">
            Search Nexus Verium
          </label>
          <div className="flex items-center gap-2 rounded-full border border-[var(--nv-border)] bg-white px-3 py-2 shadow-sm transition focus-within:border-[var(--nv-primary)] focus-within:shadow">
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
              placeholder="Search services, research, team"
              className="w-full border-0 bg-transparent text-sm text-[var(--nv-ink)] outline-none placeholder:text-[var(--nv-muted)]"
            />
          </div>
          {focused && results.length > 0 ? (
            <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-[var(--nv-border)] bg-white shadow-xl">
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
      </div>
      <div className="flex items-center gap-3 border-t border-[var(--nv-border)] px-4 py-2 text-xs text-[var(--nv-muted)] md:hidden">
        {navLinks.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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
      </div>
    </header>
  );
}
