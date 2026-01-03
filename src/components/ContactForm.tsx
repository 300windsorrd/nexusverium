"use client";

import { useState } from "react";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  captchaToken: string;
  honeypot: string;
}

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
  captchaToken: "",
  honeypot: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          captchaToken: form.captchaToken || "captcha-placeholder",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Unable to submit form right now.");
      }
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  };

  const requiredMarker = <span className="text-[var(--nv-accent)]">*</span>;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] bg-[#f0f2f6] p-6 shadow-[var(--shadow-card)]"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--nv-ink)]">
          Name {requiredMarker}
          <input
            required
            name="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="rounded-[12px] border border-[var(--nv-border)] bg-white px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:border-[var(--nv-primary)] focus:ring-2 focus:ring-[var(--nv-primary)]/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--nv-ink)]">
          Email {requiredMarker}
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="rounded-[12px] border border-[var(--nv-border)] bg-white px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:border-[var(--nv-primary)] focus:ring-2 focus:ring-[var(--nv-primary)]/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--nv-ink)]">
          Phone {requiredMarker}
          <input
            required
            name="phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="rounded-[12px] border border-[var(--nv-border)] bg-white px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:border-[var(--nv-primary)] focus:ring-2 focus:ring-[var(--nv-primary)]/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--nv-ink)]">
          Company {requiredMarker}
          <input
            required
            name="company"
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="rounded-[12px] border border-[var(--nv-border)] bg-white px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:border-[var(--nv-primary)] focus:ring-2 focus:ring-[var(--nv-primary)]/20"
          />
        </label>
      </div>
      <div className="mt-4 grid gap-4">
        <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--nv-ink)]">
          Subject {requiredMarker}
          <input
            required
            name="subject"
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="rounded-[12px] border border-[var(--nv-border)] bg-white px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:border-[var(--nv-primary)] focus:ring-2 focus:ring-[var(--nv-primary)]/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-[var(--nv-ink)]">
          Message {requiredMarker}
          <textarea
            required
            name="message"
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="h-32 rounded-[12px] border border-[var(--nv-border)] bg-white px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:border-[var(--nv-primary)] focus:ring-2 focus:ring-[var(--nv-primary)]/20"
          />
        </label>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <div className="rounded-[12px] border border-dashed border-[var(--nv-border)] bg-white px-4 py-3 text-sm text-[var(--nv-muted)]">
          CAPTCHA placeholder — integrate Cloudflare Turnstile or reCAPTCHA and
          set the resulting token to the hidden <code>captchaToken</code> field.
        </div>
        <input
          type="hidden"
          name="captchaToken"
          value={form.captchaToken}
          onChange={(e) => handleChange("captchaToken", e.target.value)}
        />
        <div className="sr-only" aria-hidden>
          <label>
            Leave this blank
            <input
              tabIndex={-1}
              value={form.honeypot}
              onChange={(e) => handleChange("honeypot", e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-4">
        {status === "error" && error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : null}
        {status === "success" ? (
          <p className="text-sm text-green-700">Message received. Thank you!</p>
        ) : null}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-[var(--nv-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--nv-primary-strong)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
