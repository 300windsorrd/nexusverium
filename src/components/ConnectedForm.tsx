"use client";

import { createClient } from "@supabase/supabase-js";
import { ChangeEvent, FormEvent, useState } from "react";

type ResponseState = {
  type: "success" | "error";
  message: string;
};

type FieldKey =
  | "sender_name"
  | "sender_email"
  | "receiver_name"
  | "receiver_email"
  | "subject"
  | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_SUBJECT_LENGTH = 200;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dnpxmnvvnrkvxbxzotoa.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucHhtbnZ2bnJrdnhieHpvdG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1OTIwOTMsImV4cCI6MjA4MzE2ODA5M30.Diesqm0X89LsnKDNzoSsIZu8OpNGZc7jkRpujiVe3Rg";
const supabase = createClient(supabaseUrl, supabaseKey);

export function ConnectedForm() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<ResponseState | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const getInputClasses = (error?: string) =>
    `rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)] focus:outline-none ${
      error
        ? "border-[var(--nv-accent)] bg-[var(--nv-surface)]/80 shadow-[0_0_0_10px_rgba(234,76,137,0.2)]"
        : "hover:border-[var(--nv-primary-strong)]"
    }`;

  const gatherFieldErrors = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!senderName.trim()) {
      errors.sender_name = "Sender name is required.";
    }
    if (!senderEmail.trim()) {
      errors.sender_email = "Sender email is required.";
    } else if (!EMAIL_REGEX.test(senderEmail.trim())) {
      errors.sender_email = "Sender email is invalid.";
    }
    if (!receiverName.trim()) {
      errors.receiver_name = "Receiver name is required.";
    }
    if (!receiverEmail.trim()) {
      errors.receiver_email = "Receiver email is required.";
    } else if (!EMAIL_REGEX.test(receiverEmail.trim())) {
      errors.receiver_email = "Receiver email is invalid.";
    }
    if (subject.trim().length > MAX_SUBJECT_LENGTH) {
      errors.subject = `Subject exceeds ${MAX_SUBJECT_LENGTH} chars.`;
    }
    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      errors.message = `Message exceeds ${MAX_MESSAGE_LENGTH} chars.`;
    }

    return errors;
  };

  const handleSenderNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSenderName(value);
    setFieldErrors((prev) => ({ ...prev, sender_name: undefined }));
  };

  const handleSenderEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSenderEmail(value);
    setFieldErrors((prev) => ({ ...prev, sender_email: undefined }));
  };

  const handleReceiverNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setReceiverName(value);
    setFieldErrors((prev) => ({ ...prev, receiver_name: undefined }));
  };

  const handleReceiverEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setReceiverEmail(value);
    setFieldErrors((prev) => ({ ...prev, receiver_email: undefined }));
  };

  const handleSubjectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSubject(value);
    setFieldErrors((prev) => ({ ...prev, subject: undefined }));
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessage(value);
    setFieldErrors((prev) => ({ ...prev, message: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (!supabaseUrl || !supabaseKey) {
      setResponseState({
        type: "error",
        message: "Missing Supabase configuration.",
      });
      return;
    }

    const errors = gatherFieldErrors();
    const hasErrors = Object.values(errors).some((value) => Boolean(value));
    if (hasErrors) {
      setFieldErrors(errors);
      setResponseState({
        type: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    setIsSubmitting(true);
    setResponseState(null);

    const payload: Record<string, unknown> = {
      sender_name: senderName.trim(),
      sender_email: senderEmail.trim().toLowerCase(),
      receiver_name: receiverName.trim(),
      receiver_email: receiverEmail.trim().toLowerCase(),
      metadata: {
        source: "connected-form",
      },
    };

    const cleanedSubject = subject.trim();
    if (cleanedSubject) {
      payload.subject = cleanedSubject;
    }

    const cleanedMessage = message.trim();
    if (cleanedMessage) {
      payload.message = cleanedMessage;
    }

    try {
      const { error } = await supabase.from("Connected").insert(payload);
      if (error) {
        throw new Error(error.message);
      }

      setResponseState({ type: "success", message: "Request sent." });
      setSenderName("");
      setSenderEmail("");
      setReceiverName("");
      setReceiverEmail("");
      setSubject("");
      setMessage("");
      setFieldErrors({});
    } catch (error) {
      const messageText =
        error instanceof Error
          ? error.message
          : "Unable to submit the request. Please try again.";
      setResponseState({ type: "error", message: messageText });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-[20px] border border-[var(--nv-border)] bg-[var(--nv-surface)]/70 p-6 shadow-[var(--shadow-card)] transition hover:border-[var(--nv-primary)]">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nv-muted)]">
          New Connection
        </div>
        <p className="text-base leading-relaxed text-[var(--nv-ink)]">
          Share the details below and we will notify both parties.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Sender name
            <input
              type="text"
              value={senderName}
              onChange={handleSenderNameChange}
              required
              className={getInputClasses(fieldErrors.sender_name)}
              aria-invalid={Boolean(fieldErrors.sender_name)}
            />
            {fieldErrors.sender_name && (
              <span className="text-xs leading-tight text-[var(--nv-accent)]">
                {fieldErrors.sender_name}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Sender email
            <input
              type="email"
              value={senderEmail}
              onChange={handleSenderEmailChange}
              required
              className={getInputClasses(fieldErrors.sender_email)}
              aria-invalid={Boolean(fieldErrors.sender_email)}
            />
            {fieldErrors.sender_email && (
              <span className="text-xs leading-tight text-[var(--nv-accent)]">
                {fieldErrors.sender_email}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Receiver name
            <input
              type="text"
              value={receiverName}
              onChange={handleReceiverNameChange}
              required
              className={getInputClasses(fieldErrors.receiver_name)}
              aria-invalid={Boolean(fieldErrors.receiver_name)}
            />
            {fieldErrors.receiver_name && (
              <span className="text-xs leading-tight text-[var(--nv-accent)]">
                {fieldErrors.receiver_name}
              </span>
            )}
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Receiver email
            <input
              type="email"
              value={receiverEmail}
              onChange={handleReceiverEmailChange}
              required
              className={getInputClasses(fieldErrors.receiver_email)}
              aria-invalid={Boolean(fieldErrors.receiver_email)}
            />
            {fieldErrors.receiver_email && (
              <span className="text-xs leading-tight text-[var(--nv-accent)]">
                {fieldErrors.receiver_email}
              </span>
            )}
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
          Subject (optional)
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            className={getInputClasses(fieldErrors.subject)}
            aria-invalid={Boolean(fieldErrors.subject)}
          />
          {fieldErrors.subject && (
            <span className="text-xs leading-tight text-[var(--nv-accent)]">
              {fieldErrors.subject}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
          Message (optional)
          <textarea
            rows={4}
            value={message}
            onChange={handleMessageChange}
            className={getInputClasses(fieldErrors.message)}
            aria-invalid={Boolean(fieldErrors.message)}
          />
          {fieldErrors.message && (
            <span className="text-xs leading-tight text-[var(--nv-accent)]">
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
            className="rounded-full bg-[var(--nv-primary-strong)] px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nv-bg)] transition hover:bg-[var(--nv-accent)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send request"}
          </button>
        </div>
      </form>
    </section>
  );
}
