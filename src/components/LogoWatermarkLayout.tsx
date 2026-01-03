import Image from "next/image";
import type { PropsWithChildren } from "react";

export function LogoWatermarkLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-[var(--nv-bg)]">
      <div className="pointer-events-none fixed inset-0 -z-20 flex items-center justify-center">
        <Image
          src="/image.png"
          alt=""
          aria-hidden
          width={720}
          height={720}
          className="h-[60vw] max-h-[720px] w-[60vw] max-w-[720px] rounded-full object-cover opacity-60"
          priority
        />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white/80 via-[var(--nv-bg)]/90 to-white/90" />
      <div className="relative">{children}</div>
    </div>
  );
}
