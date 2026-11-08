"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import FaqItem from "@/components/ui/FaqItem";

type Locale = "en" | "es";

type FAQ = {
  question: string;
  answer: string;
};

const FAQ_CONTENT: Record<
  Locale,
  {
    label: string;
    title: string;
    description: string;
    questions: FAQ[];
    footer: string;
  }
> = {
  en: {
    label: "GOOD TO KNOW",
    title: "A Few Things You Might Be Wondering",
    description:
      "Planning a Morocco trip comes with questions. Here are a few answers to help you get started.",

    questions: [
      {
        question: "Can I contact you without booking a tour?",
        answer:
          "Absolutely! Whether you're exploring Morocco tour options, comparing itineraries, or simply looking for local travel advice, feel free to get in touch. There's no obligation to book.",
      },
      {
        question: "Can you help me plan a private Morocco tour?",
        answer:
          "Of course! Tell us your travel dates, departure city, number of travelers, and places you'd love to visit. Our local team can help you plan a **private Morocco tour** that suits your interests and travel style.",
      },
      {
        question: "What information should I include in my message?",
        answer:
          "Just share your **travel dates, number of travelers, preferred destinations**, and any special requests. Don't worry if your plans aren't final yet — we're happy to help you explore your options.",
      },
      {
        question: "Can I contact you through WhatsApp?",
        answer:
          "Yes! You can reach our team directly through **WhatsApp** for questions about tours, itineraries, and travel arrangements. You can also use our contact form if you prefer email.",
      },
      {
        question: "Can I ask about shared tours and day trips?",
        answer:
          "Definitely! We can help you explore **shared Morocco tours, Sahara desert trips, private experiences, and day trips from Marrakech**. Send us your preferred dates and we'll discuss the available options.",
      },
      {
        question: "Can I request a tour quote before booking?",
        answer:
          "Yes! Share your travel plans and we'll help you understand the available tour options and pricing. You can request a **personalized quote** before deciding whether to book.",
      },
    ],

    footer:
      "Still have questions? Our local Morocco team would love to hear from you.",
  },

  es: {
    label: "INFORMACIÓN ÚTIL",
    title: "Algunas Preguntas que Quizás Tengas",
    description:
      "Organizar un viaje a Marruecos puede generar dudas. Aquí encontrarás algunas respuestas para empezar.",

    questions: [
      {
        question: "¿Puedo contactar con vosotros sin reservar un tour?",
        answer:
          "¡Por supuesto! Tanto si estás explorando opciones de viaje por Marruecos como si necesitas consejos locales o quieres comparar itinerarios, puedes escribirnos sin compromiso.",
      },
      {
        question: "¿Podéis ayudarme a organizar un tour privado por Marruecos?",
        answer:
          "¡Claro que sí! Cuéntanos tus fechas de viaje, ciudad de salida, número de viajeros y los lugares que te gustaría visitar. Nuestro equipo local puede ayudarte a organizar un **tour privado por Marruecos** adaptado a tus intereses.",
      },
      {
        question: "¿Qué información debo incluir en mi mensaje?",
        answer:
          "Solo necesitamos algunos detalles: **fechas de viaje, número de viajeros, destinos que te interesan** y cualquier petición especial. Si todavía no tienes todos los detalles, no te preocupes. Podemos ayudarte a definir tu viaje.",
      },
      {
        question: "¿Puedo contactar con vosotros por WhatsApp?",
        answer:
          "¡Sí! Puedes hablar directamente con nuestro equipo por **WhatsApp** para consultar sobre circuitos, itinerarios y organización del viaje. También puedes utilizar nuestro formulario de contacto si prefieres escribirnos por correo electrónico.",
      },
      {
        question: "¿Puedo consultar sobre tours compartidos y excursiones?",
        answer:
          "¡Por supuesto! Podemos ayudarte a descubrir **circuitos compartidos por Marruecos, excursiones al desierto del Sahara, tours privados y excursiones desde Marrakech**. Envíanos tus fechas y te informaremos sobre las opciones disponibles.",
      },
      {
        question: "¿Puedo solicitar un presupuesto antes de reservar?",
        answer:
          "¡Claro! Cuéntanos tus planes y te ayudaremos a conocer las opciones disponibles y sus precios. Puedes solicitar un **presupuesto personalizado** antes de tomar una decisión.",
      },
    ],

    footer:
      "¿Tienes más preguntas? A nuestro equipo local en Marruecos le encantará ayudarte.",
  },
};

export default function ContactFAQ(): React.JSX.Element {
  const locale = useLocale();
  const language: Locale = locale === "es" ? "es" : "en";

  const content = FAQ_CONTENT[language];

  const [openIndex, setOpenIndex] = useState<number | null>(-1);

  return (
    <section id="contact-faq"  aria-labelledby="contact-faq-title" className="bg-background pt-10 lg:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-7 max-w-2xl text-center lg:mb-9">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {content.label}
          </p>

          <h2
            id="contact-faq-title"
            className="font-heading text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          >
            {content.title}
          </h2>

          <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
            {content.description}
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-3">
          {content.questions.map((faq, index) => (
            <FaqItem
              key={`${language}-${index}`}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() =>
                setOpenIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
