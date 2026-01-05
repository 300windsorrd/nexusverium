import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/metadata";

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
      <div className="mx-auto lg:max-w-3xl">
        <ContactForm />
      </div>
    </div>
  );
}
