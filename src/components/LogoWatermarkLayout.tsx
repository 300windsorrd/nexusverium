import type { PropsWithChildren } from "react";

export function LogoWatermarkLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-[var(--nv-bg)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 bg-[url('/logo.svg')] bg-center bg-contain bg-no-repeat opacity-60"
        style={{ backgroundAttachment: "fixed" }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white/80 via-[var(--nv-bg)]/90 to-white/90" />
      <div className="relative">{children}</div>
    </div>
  );
}
