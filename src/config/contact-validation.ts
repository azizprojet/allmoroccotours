export interface ContactFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  message: string;
}


export const CONTACT_LIMITS = { fullName: 120, email: 254, whatsapp: 30, message: 5000, messageMin: 10 } as const;


export function parseContactForm(value: unknown): ContactFormData | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const body = value as Record<string, unknown>;

  if (["fullName", "email", "message"].some(key => typeof body[key] !== "string")) return null;

  if (body.whatsapp !== undefined && typeof body.whatsapp !== "string") return null;

  const fullName = (body.fullName as string).trim();
  const email = (body.email as string).trim();
  const whatsapp = ((body.whatsapp as string | undefined) ?? "").trim();
  const message = (body.message as string).trim();

  if (!fullName || fullName.length > CONTACT_LIMITS.fullName || /[\r\n]/.test(fullName) ||
      email.length > CONTACT_LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      whatsapp.length > CONTACT_LIMITS.whatsapp || message.length < CONTACT_LIMITS.messageMin ||
      message.length > CONTACT_LIMITS.message) return null;

  return { fullName, email, whatsapp, message };
}
