import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LogoWatermarkLayout } from "@/components/LogoWatermarkLayout";
import { buildSearchIndex, siteConfig } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const logoVars = {
  "--nv-logo-watermark-image-dark": `url("${withBasePath("/images/logo%20white.png")}")`,
  "--nv-logo-watermark-image-light": `url("${withBasePath("/images/logo%20black.png")}")`,
} as React.CSSProperties;

export const metadata: Metadata = {
  title: `${siteConfig.name} | Environmental Engineering & Restoration Organization`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "favicon.ico",
  },
  openGraph: {
    title: `${siteConfig.name} | Environmental Engineering & Restoration Organization`,
    description: siteConfig.description,
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
  },
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchItems = buildSearchIndex();

  return (
    <html lang="en" style={logoVars}>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased bg-[var(--nv-bg)] text-[var(--nv-ink)]`}
      >
        <LogoWatermarkLayout>
          <Header searchItems={searchItems} />
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
            {children}
          </main>
          <Footer />
        </LogoWatermarkLayout>
      </body>
    </html>
  );
}
