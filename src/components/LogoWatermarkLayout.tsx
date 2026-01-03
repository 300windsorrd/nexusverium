import Image from "next/image";
import type { PropsWithChildren } from "react";

export function LogoWatermarkLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-[var(--nv-bg)]">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(900px_700px_at_50%_20%,rgba(0,42,71,0.95),rgba(0,11,20,0.98)_70%)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 flex items-center justify-center">
        <Image
          src="/image.png"
          alt=""
          aria-hidden
          width={720}
          height={720}
          className="nv-float h-[60vw] max-h-[720px] w-[60vw] max-w-[720px] rounded-full object-cover opacity-30 mix-blend-screen"
          priority
        />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 nv-circuit-grid" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[var(--nv-surface)]/40 via-[var(--nv-bg)]/80 to-[var(--nv-bg)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
