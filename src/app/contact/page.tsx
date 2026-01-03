import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Contact | Nexus Verium",
  description:
    "Contact Nexus Verium about environmental restoration projects, responsible AI evaluations, and research partnerships.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <h1 className="sr-only">Contact Nexus Verium</h1>
      <SectionHeading
        eyebrow="Contact"
        title="Reach the Nexus Verium team"
        description="We respond within 2 business days. Please share site context and desired outcomes so we can connect you with the right lead."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-semibold text-[var(--nv-ink)]">
            How we engage
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-[var(--nv-muted)]">
            <li>
              <strong className="text-[var(--nv-primary)]">Pillar One:</strong>{" "}
              Wetlands, brackish water, environmental restoration, and QA.
            </li>
            <li>
              <strong className="text-[var(--nv-primary)]">Pillar Two:</strong>{" "}
              Human readiness and resilience research (long-term, not clinical
              care).
            </li>
            <li>
              <strong className="text-[var(--nv-primary)]">Pillar Three:</strong>{" "}
              Responsible cognitive systems—careful, research-stage, and always
              human-led.
            </li>
            <li>Preferred contact: email {siteConfig.name} at contact@nexusverium.com.</li>
            <li>
              Please include data availability, partners involved, and timelines
              if reaching out about a project.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
