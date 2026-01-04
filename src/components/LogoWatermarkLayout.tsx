import Image from "next/image";
import type { PropsWithChildren } from "react";

export function LogoWatermarkLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-[var(--nv-bg)] transition-colors duration-300">
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(900px 700px at 50% 20%, var(--nv-watermark-radial-start), var(--nv-watermark-radial-stop) 70%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-20 flex items-center justify-center">
        <Image
          src="/Logo.png"
          alt=""
          aria-hidden
          width={720}
          height={720}
          className="nv-float nv-watermark-image h-[60vw] max-h-[720px] w-[60vw] max-w-[720px] rounded-full object-cover"
          priority
        />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 nv-circuit-grid" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[var(--nv-surface)]/40 via-[var(--nv-bg)]/80 to-[var(--nv-bg)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
