"use client";

import { createClient } from "@supabase/supabase-js";

import { ChangeEvent, FormEvent, useState } from "react";

type ResponseState = {
  type: "success" | "error";
  message: string;
};

type FieldKey = "name" | "email" | "phone" | "company" | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

const validators: Record<FieldKey, (value: string) => string> = {
  name: (value) => (value.trim() ? "" : "¿Cómo te llamas?"),
  email: (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Necesitamos tu correo electrónico.";
    }
    const emailPattern =
      /^[\w.%+!#'-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(trimmed)
      ? ""
      : "Ingresa un correo válido.";
  },
  phone: (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Dinos cómo contactarte vía teléfono.";
    }
    const digitsOnly = trimmed.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      return "Usa al menos 7 dígitos.";
    }
    return "";
  },
  company: (value) =>
    value.trim() ? "" : "Cuéntanos en qué empresa trabajas.",
  message: (value) =>
    value.trim() ? "" : "¿Qué te gustaría compartir con nosotros?",
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<ResponseState | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Initialize Supabase Client
  // Using environment variables or falling back to the provided keys for immediate deployment fix.
  // Note: ideally these should be strictly in env vars.
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://dnpxmnvvnrkvxbxzotoa.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucHhtbnZ2bnJrdnhieHpvdG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1OTIwOTMsImV4cCI6MjA4MzE2ODA5M30.Diesqm0X89LsnKDNzoSsIZu8OpNGZc7jkRpujiVe3Rg";

  const supabase = createClient(supabaseUrl, supabaseKey);

  const getInputClasses = (error?: string) =>
    `input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)] focus:outline-none ${
      error
        ? "border-[var(--nv-accent)] bg-[var(--nv-surface)]/80 shadow-[0_0_0_10px_rgba(234,76,137,0.2)]"
        : "hover:border-[var(--nv-primary-strong)]"
    }`;

  const gatherFieldErrors = (): FieldErrors => ({
    name: validators.name(name),
    email: validators.email(email),
    phone: validators.phone(phone),
    company: validators.company(company),
    message: validators.message(message),
  });

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    setFieldErrors((prev) => ({
      ...prev,
      name: validators.name(value),
    }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setFieldErrors((prev) => ({
      ...prev,
      email: validators.email(value),
    }));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    setFieldErrors((prev) => ({
      ...prev,
      phone: validators.phone(value),
    }));
  };

  const handleCompanyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCompany(value);
    setFieldErrors((prev) => ({
      ...prev,
      company: validators.company(value),
    }));
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessage(value);
    setFieldErrors((prev) => ({
      ...prev,
      message: validators.message(value),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const errors = gatherFieldErrors();
    const hasErrors = Object.values(errors).some((value) => Boolean(value));

    if (hasErrors) {
      setFieldErrors(errors);
      setResponseState({
        type: "error",
        message: "Por favor corrige los campos marcados.",
      });
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
      // Direct submission to Supabase for Static Export compatibility
      const { error } = await supabase.from("Contacted").insert({
        name,
        email,
        phone: phone.trim(),
        company,
        Message: message.trim(), // Note: Case sensitive column matching backend logic
      });

      if (error) {
        throw new Error(error.message);
      }

      setResponseState({
        type: "success",
        message: "Thank you, your information was received successfully..",
      });
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      setFieldErrors({});
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
Tell us about your project and we'll get in touch.        </p>
        <div className="input-grid grid gap-4 md:grid-cols-2">
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              className={getInputClasses(fieldErrors.name)}
              aria-invalid={Boolean(fieldErrors.name)}
            />
            {fieldErrors.name && (
              <span className="text-[var(--nv-accent)] text-xs leading-tight">
                {fieldErrors.name}
              </span>
            )}
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={getInputClasses(fieldErrors.email)}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email && (
              <span className="text-[var(--nv-accent)] text-xs leading-tight">
                {fieldErrors.email}
              </span>
            )}
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Phone
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              required
              className={getInputClasses(fieldErrors.phone)}
              aria-invalid={Boolean(fieldErrors.phone)}
            />
            {fieldErrors.phone && (
              <span className="text-[var(--nv-accent)] text-xs leading-tight">
                {fieldErrors.phone}
              </span>
            )}
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Company
            <input
              type="text"
              name="company"
              value={company}
              onChange={handleCompanyChange}
              required
              className={getInputClasses(fieldErrors.company)}
              aria-invalid={Boolean(fieldErrors.company)}
            />
            {fieldErrors.company && (
              <span className="text-[var(--nv-accent)] text-xs leading-tight">
                {fieldErrors.company}
              </span>
            )}
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
            className={getInputClasses(fieldErrors.message)}
            aria-invalid={Boolean(fieldErrors.message)}
          />
          {fieldErrors.message && (
            <span className="text-[var(--nv-accent)] text-xs leading-tight">
              {fieldErrors.message}
            </span>
          )}
        </label>
        {responseState && (
          <div
            className={`rounded-[14px] border px-4 py-3 text-sm ${
              responseState.type === "success"
                ? "border-[var(--nv-primary-strong)] bg-[var(--nv-primary-strong)]/10 text-[var(--nv-primary-strong)] shadow-[0_20px_40px_rgba(17,153,133,0.25)]"
                : "border-[var(--nv-accent)] bg-[var(--nv-accent)]/10 text-[var(--nv-accent)] shadow-[0_10px_30px_rgba(248,113,113,0.25)]"
            }`}
            role="status"
            aria-live="polite"
          >
            {responseState.message}
          </div>
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
