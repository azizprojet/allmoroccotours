import { getContactMailConfig } from "@/config/contact.server";
import { parseContactForm } from "@/config/contact-validation";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Node.js is the default runtime; explicit runtime is incompatible with Cache Components.

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (char) => entities[char]);
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: "Invalid JSON request." }, { status: 400 });
    }
    const data = parseContactForm(body);
    if (!data) {
      return NextResponse.json({ success: false, message: "Please check your contact details and message length." }, { status: 400 });
    }
    const { fullName, email, whatsapp, message } = data;
    const { host: smtpHost, user: smtpUser, password: smtpPassword, recipient: contactEmail, port: smtpPort } = getContactMailConfig();



    if (!smtpHost || !smtpUser || !smtpPassword || !contactEmail ||
        !Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
      console.error("Missing or invalid SMTP environment variables");
      return NextResponse.json({ success: false, message: "We couldn't send your message. Please try again later." }, { status: 500 });
    }
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
      connectionTimeout: 30000,
      greetingTimeout: 20000,
      socketTimeout: 20000,
    });
    await transporter.verify();
    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeWhatsapp = escapeHtml(whatsapp || "Not provided");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    await transporter.sendMail({
      from: `"Website Contact" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New travel request from ${fullName}`,
      text: `New Travel Request\n\nName: ${fullName}\nEmail: ${email}\nWhatsApp: ${whatsapp || "Not provided"}\n\nMessage:\n${message}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <h2>New Travel Request</h2>
        <p><strong>Name:</strong><br />${safeFullName}</p>
        <p><strong>Email:</strong><br />${safeEmail}</p>
        <p><strong>WhatsApp:</strong><br />${safeWhatsapp}</p>
        <p><strong>Message:</strong></p><p>${safeMessage}</p>
      </div>`,
    });
    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch {
    console.error("Contact email delivery failed");
    return NextResponse.json({ success: false, message: "We couldn't send your message. Please try again later." }, { status: 500 });
  }
}
