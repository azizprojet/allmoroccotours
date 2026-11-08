"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Send, Loader2, User, Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";


import { CONTACT_LIMITS, parseContactForm, type ContactFormData } from "@/config/contact-validation";

const INITIAL_FORM: ContactFormData = {
  fullName: "",
  email: "",
  whatsapp: "",
  message: "",
};

export default function ContactForm(): React.JSX.Element {
  const t = useTranslations("ContactForm");

  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const submitting = useRef(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof ContactFormData, value: string): void => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async ( event: FormEvent<HTMLFormElement>, ): Promise<void> => {

    event.preventDefault();

    if (submitting.current) return;
    const payload = parseContactForm(form);
    if (!payload) {
      toast.error(t("validationError"));
      return;
    }
    submitting.current = true;

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: { success?: boolean; message?: string } =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(t("errorDescription"));
      }

      toast.success(t("successTitle"), {
        description: t("successDescription"),
      });

      setForm({ ...INITIAL_FORM });
    } catch {
      toast.error(t("errorTitle"), {
        description: t("errorDescription"),
      });
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  const inputClassName = "w-full rounded-xl border border-border bg-surface-soft py-3 pl-10 pr-4 font-body text-sm text-text-main placeholder:text-text-muted transition-all focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10 focus:outline-none";

  const labelClassName = "mb-2 block font-body text-sm font-semibold text-heading-soft";

  return (
    <div
      id="contact-form"
      className="relative flex h-full flex-col overflow-hidden rounded-xl bg-card px-6 py-6 shadow-lg shadow-desert/10 ring-1 ring-border sm:px-8"
    >
      {/* Header */}
      <div className="relative">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-heading">
          {t("title")}
          <span className="bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
            {" "}
            {t("titleHighlight")}
          </span>
        </h2>

        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
          {t("description")}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative mt-8 flex flex-1 flex-col space-y-6"
      >
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Full Name */}
          <div className="group relative">
            <label htmlFor="contact-full-name" className={labelClassName}>
              {t("fullName")}
            </label>

            <div className="relative">
              <User
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              />

              <input
                id="contact-full-name"
                name="fullName"
                type="text"
                required
                maxLength={CONTACT_LIMITS.fullName}
                autoComplete="name"
                value={form.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                placeholder={t("fullNamePlaceholder")}
                className={inputClassName}
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="group relative">
            <label htmlFor="contact-email" className={labelClassName}>
              {t("email")}
            </label>

            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-primary"
                aria-hidden="true"
              />

              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={CONTACT_LIMITS.email}
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder={t("emailPlaceholder")}
                className={inputClassName}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="group relative">
          <label htmlFor="contact-whatsapp" className={labelClassName}>
            {t("whatsapp")}
          </label>

          <div className="relative">
            <Phone
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />

            <input
              id="contact-whatsapp"
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              maxLength={CONTACT_LIMITS.whatsapp}
              value={form.whatsapp}
              onChange={(event) => updateField("whatsapp", event.target.value)}
              placeholder={t("whatsappPlaceholder")}
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>

        {/* Message */}
        <div className="group relative flex flex-1 flex-col">
          <label htmlFor="contact-message" className={labelClassName}>
            {t("message")}
          </label>

          <div className="relative flex flex-1">
            <MessageSquare
              className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-text-muted transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />

            <textarea
              id="contact-message"
              name="message"
              required
              minLength={CONTACT_LIMITS.messageMin}
              maxLength={CONTACT_LIMITS.message}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder={t("messagePlaceholder")}
              className={`${inputClassName} min-h-[100px] flex-1 resize-y`}
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-gold-soft px-6 py-3 font-body text-sm font-bold text-primary-foreground shadow-sm transition-all hover:cursor-pointer hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />

          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t("submitting")}
            </>
          ) : (
            <>
              <Send
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
              {t("submit")}
            </>
          )}
        </button>

        {/* Reassurance */}
        <p className="text-center font-body text-xs leading-relaxed text-text-muted">
          {t("privacyNote")}
        </p>
      </form>
    </div>
  );
}
