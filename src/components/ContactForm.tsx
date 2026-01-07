import React from "react"

export function ContactForm() {
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
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Email
            <input
              type="email"
              name="email"
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Phone
            <input
              type="tel"
              name="phone"
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
          <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
            Company
            <input
              type="text"
              name="company"
              className="input-control rounded-[12px] border border-[var(--nv-border)] bg-transparent px-3 py-2 text-base text-[var(--nv-ink)] transition focus:border-[var(--nv-primary-strong)]"
            />
          </label>
        </div>
        <label className="input-row flex flex-col gap-2 text-sm text-[var(--nv-muted)]">
          Message
          <textarea
            name="message"
            rows={4}
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
  )
}
