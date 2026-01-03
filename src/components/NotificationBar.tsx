import Link from "next/link";

interface NotificationBarProps {
  message: string;
  href?: string;
}

export function NotificationBar({ message, href }: NotificationBarProps) {
  return (
    <div className="w-full bg-[var(--nv-primary)] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 text-xs sm:text-sm">
        <span>{message}</span>
        {href ? (
          <Link
            href={href}
            className="rounded-full border border-white/30 px-3 py-1 text-[11px] font-semibold tracking-wide transition hover:bg-white/15"
          >
            Read more
          </Link>
        ) : null}
      </div>
    </div>
  );
}
