import type { Metadata } from "next";

import { ConnectedForm } from "@/components/ConnectedForm";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "New Connection | Nexus Verium",
  description:
    "Create a new connection request and notify both the sender and receiver.",
  pathname: "/connected",
});

export default function ConnectedPage() {
  return (
    <div className="space-y-8">
      <h1 className="sr-only">New Connection</h1>
      <SectionHeading
        eyebrow="Connection Requests"
        title="Create a New Connection"
        description="Share the sender and receiver details. We will send confirmations automatically."
      />
      <div className="mx-auto lg:max-w-3xl">
        <ConnectedForm />
      </div>
    </div>
  );
}
