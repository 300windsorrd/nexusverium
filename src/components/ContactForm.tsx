"use client";

import { ChangeEvent, useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

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

  async function fetchForm() {
    const data = { name, email, phone, company, message };
    try {
      const res = await fetch("http://localhost:3000/api/contacted", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {}
  }

  return (
    <section className="contact-panel mx-auto w-full max-w-3xl rounded-[20px] border border-[var(--nv-border)] bg-[var(--nv-surface)]/70 p-6 shadow-[var(--shadow-card)] transition hover:border-[var(--nv-primary)]">
      <form className="panel-body space-y-6">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nv-muted)]">
          Want to talk?
        </div>
        <p className="text-base leading-relaxed text-[var(--nv-ink)]">
          Cuéntanos sobre tu proyecto y nos pondremos en contacto.
        </p>
        <div className="input-grid grid gap-4 md:grid-cols-2">
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
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
            className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
          />
        </label>
        <div className="flex justify-end">
          <button
            type="submit"
            className="send-action rounded-full bg-[var(--nv-primary-strong)] px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nv-bg)] transition hover:bg-[var(--nv-accent)]"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
