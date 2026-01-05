import type { PropsWithChildren } from "react";

export function LogoWatermarkLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative z-0 min-h-screen bg-[var(--nv-bg)] transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 nv-logo-watermark" aria-hidden />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
