import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LogoWatermarkLayout } from "@/components/LogoWatermarkLayout";
import { NotificationBar } from "@/components/NotificationBar";
import { buildSearchIndex, siteConfig } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Responsible AI for Restoration`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
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
        className={`${inter.variable} antialiased bg-[var(--nv-bg)] text-[var(--nv-ink)]`}
      >
        <LogoWatermarkLayout>
          <div className="sticky top-0 z-50">
            <NotificationBar
              message="Brackish water efficacy review: new dissolved oxygen gains published."
              href="/now"
            />
            <Header searchItems={searchItems} />
          </div>
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
            {children}
          </main>
          <Footer />
        </LogoWatermarkLayout>
      </body>
    </html>
  );
}
