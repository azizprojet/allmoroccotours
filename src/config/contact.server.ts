import "server-only";


export function getContactMailConfig() {
  return {
    host: process.env.SMTP_HOST?.trim(),
    user: process.env.SMTP_USER?.trim(),
    password: process.env.MAIL_PASSWORD?.trim(),
    recipient: process.env.CONTACT_EMAIL?.trim(),
    port: Number(process.env.SMTP_PORT ?? "465"),
  };
}
