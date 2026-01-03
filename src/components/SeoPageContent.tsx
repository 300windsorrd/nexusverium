import Link from "next/link";
import type { SeoPage } from "@/types";

interface SeoPageContentProps {
  section: string;
  page: SeoPage;
  related?: { title: string; href: string }[];
}

export function SeoPageContent({ section, page, related = [] }: SeoPageContentProps) {
  return (
    <div className="rounded-[24px] bg-white/90 p-6 shadow-[var(--shadow-card)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--nv-muted)]">
        {section}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-[var(--nv-ink)]">
        {page.h1}
      </h1>
      <p className="mt-3 text-sm text-[var(--nv-muted)]">{page.intro}</p>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-[16px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4">
          <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
            What you get
          </h2>
          <ul className="prose-list mt-2 text-sm text-[var(--nv-muted)]">
            {page.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[16px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4">
          <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
            How we work
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--nv-muted)]">
            {page.processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-6 rounded-[16px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4">
        <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
          FAQs
        </h2>
        <div className="mt-3 space-y-3">
          {page.faq.map((item) => (
            <div key={item.question} className="rounded-[12px] bg-white p-3 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--nv-ink)]">
                {item.question}
              </h3>
              <p className="text-sm text-[var(--nv-muted)]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-6 rounded-[16px] border border-[var(--nv-border)] bg-[var(--nv-bg)] p-4">
          <h2 className="text-lg font-semibold text-[var(--nv-primary-strong)]">
            Related
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-[var(--nv-primary)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--nv-bg)]"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
