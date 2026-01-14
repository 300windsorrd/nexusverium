import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { SeoHead } from "@/components/SeoHead";
import { industries, siteConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const industryKeywords = Array.from(
    new Set(
        industries.flatMap((item) => [
            ...item.primaryKeywords,
            ...item.secondaryKeywords,
        ]),
    ),
);

const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/Logo.png`,
};

const industryListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nexus Verium Industries",
    description: "Who we work with: Agencies, Researchers, and Communities.",
    itemListElement: industries.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.metaDescription || item.intro,
        url: `${siteConfig.url}/industries/${item.slug}`,
    })),
};

const industriesJsonLd = [organizationLd, industryListLd];

export const metadata: Metadata = buildMetadata({
    title: "Industries | Nexus Verium",
    description:
        "We partner with environmental agencies, research institutions, and local communities to restore waterways.",
    pathname: "/industries",
    keywords: industryKeywords,
});

export default function IndustriesIndexPage() {
    return (
        <>
            <SeoHead jsonLd={industriesJsonLd} />
            <div className="space-y-10">
                <h1 className="sr-only">Nexus Verium Industries</h1>

                <section className="nv-reveal nv-reveal--delay-1 rounded-[24px] border border-[var(--nv-border)] bg-[linear-gradient(160deg,var(--nv-surface),var(--nv-bg))] p-6 shadow-[var(--shadow-card)]">
                    <SectionHeading
                        eyebrow="Who We Work With"
                        title="Partners in Restoration"
                        description="We collaborate with those who manage, study, and live near our waterways. Explore how we tailor our approach for different partners."
                    />

                    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {industries.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/industries/${item.slug}`}
                                className="group flex flex-col rounded-[18px] border border-[var(--nv-border)]/60 bg-[var(--nv-bg)]/70 p-6 shadow-[0_12px_28px_rgba(0,11,20,0.55)] transition-all hover:-translate-y-1 hover:border-[var(--nv-primary-strong)]/50 hover:shadow-[0_16px_32px_rgba(0,210,255,0.15)]"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-[var(--nv-ink)] group-hover:text-[var(--nv-primary-strong)]">
                                        {item.title}
                                    </h3>
                                </div>

                                <p className="mb-6 flex-grow text-sm text-[var(--nv-muted)]">
                                    {item.metaDescription || item.intro}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {item.primaryKeywords.slice(0, 2).map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="rounded-full border border-[var(--nv-border)]/50 bg-[var(--nv-surface)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--nv-muted)]"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center text-sm font-semibold text-[var(--nv-primary-strong)] opacity-0 transition-opacity group-hover:opacity-100">
                                    View Details <span className="ml-1" aria-hidden>-&gt;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
