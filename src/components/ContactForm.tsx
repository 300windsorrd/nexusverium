"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type ResponseState = {
  type: "success" | "error";
  message: string;
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<ResponseState | null>(null);

  const endpoint =
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "/api/contact";

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleCompanyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const payload = {
      name,
      email,
      phone,
      company,
      message,
      honeypot: "",
      captchaToken: "",
    };

    setIsSubmitting(true);
    setResponseState(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        const errorMessage =
          data?.message || "Unable to send your message right now.";
        throw new Error(errorMessage);
      }

      setResponseState({
        type: "success",
        message: "Gracias, tus datos llegaron correctamente.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No pudimos enviar tus datos. Intenta de nuevo más tarde.";
      setResponseState({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-panel mx-auto w-full max-w-3xl rounded-[20px] border border-[var(--nv-border)] bg-[var(--nv-surface)]/70 p-6 shadow-[var(--shadow-card)] transition hover:border-[var(--nv-primary)]">
      <form className="panel-body space-y-6" onSubmit={handleSubmit}>
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nv-muted)]">
          Want to talk?
        </div>
        <p className="text-base leading-relaxed text-[var(--nv-ink)]">
          CuAcntanos sobre tu proyecto y nos pondremos en contacto.
        </p>
        <div className="input-grid grid gap-4 md:grid-cols-2">
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Phone
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              required
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Company
            <input
              type="text"
              name="company"
              value={company}
              onChange={handleCompanyChange}
              required
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
        </div>
        <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
          Message
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={handleMessageChange}
            required
            className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
          />
        </label>
        {responseState && (
          <p
            className={`text-sm ${
              responseState.type === "success"
                ? "text-[var(--nv-primary-strong)]"
                : "text-[var(--nv-accent)]"
            }`}
            aria-live="polite"
          >
            {responseState.message}
          </p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="send-action rounded-full bg-[var(--nv-primary-strong)] px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nv-bg)] transition hover:bg-[var(--nv-accent)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
