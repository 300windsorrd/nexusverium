import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Get In Contact | Nexus Verium",
  description:
    "Get In Contact/ Careers: Environmental restoration projects; AI-assisted sustainability initiatives; Responsible AI integration for your organization; Research collaboration or pilot programs. Let's Build Responsibly.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <h1 className="sr-only">Get In Contact</h1>
      <SectionHeading
        eyebrow="Let's Build Responsibly"
        title="Contact Nexus Verium"
        description="If you're interested in: Environmental restoration projects; AI-assisted sustainability initiatives; Responsible AI integration for your organization; Research collaboration or pilot programs. AI for restoration. AI for people. AI for the future."
      />
      <div className="mx-auto lg:max-w-3xl">
        <ContactForm />
      </div>
    </div>
  );
}
