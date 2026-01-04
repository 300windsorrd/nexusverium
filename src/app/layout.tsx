import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LogoWatermarkLayout } from "@/components/LogoWatermarkLayout";
import { NotificationBar } from "@/components/NotificationBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buildSearchIndex, siteConfig } from "@/lib/content";

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

export const metadata: Metadata = {
  title: `${siteConfig.name} | Responsible AI for Restoration`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${siteConfig.name} | Responsible AI for Restoration`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchItems = buildSearchIndex();

  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased bg-[var(--nv-bg)] text-[var(--nv-ink)]`}
      >
        <LogoWatermarkLayout>
          <div className="sticky top-0 z-50">
            <NotificationBar
              message="Brackish water efficacy review: new dissolved oxygen gains published."
              href="/now"
            />
            <Header searchItems={searchItems} />
          </div>
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-0 sm:px-6">
            {children}
          </main>
          <Footer />
        </LogoWatermarkLayout>
        <ThemeToggle />
      </body>
    </html>
  );
}
