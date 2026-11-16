"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Props = { locale: Locale; dict: Dict["contact"]["form"] };
type Status = "idle" | "sending" | "success" | "error";

const packageIds = ["", "website", "automation", "telegram", "platform"];

export function ContactForm({ locale, dict }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [pkg, setPkg] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("package") ?? "";
    if (packageIds.includes(p)) setPkg(p);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      setStatus("error");
      setError(dict.required);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(dict.error);
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <p>{dict.success}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <label className="field">
          <span>{dict.name} *</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label className="field">
          <span>{dict.company}</span>
          <input name="company" autoComplete="organization" />
        </label>
      </div>
      <div className="form__row">
        <label className="field">
          <span>{dict.email} *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span>{dict.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label className="field">
        <span>{dict.package}</span>
        <select name="package" value={pkg} onChange={(e) => setPkg(e.target.value)}>
          {dict.packageOptions.map((label, i) => (
            <option key={packageIds[i]} value={packageIds[i]}>{label}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>{dict.message} *</span>
        <textarea name="message" rows={5} placeholder={dict.messagePlaceholder} required />
      </label>
      {/* Honeypot: hidden from people, filled by bots */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      {status === "error" && <p className="form__error" role="alert">{error}</p>}

      <button className="btn btn--dark btn--lg" type="submit" disabled={status === "sending"}>
        {status === "sending" ? dict.sending : dict.submit}
        {status !== "sending" && <ArrowRight className="btn__icon" />}
      </button>
    </form>
  );
}
