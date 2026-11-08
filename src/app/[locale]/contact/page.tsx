import { CONTACT } from "@/config/contact";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactForm from "@/components/sections/Contact/ContactForms";
import ContactInformation from "@/components/sections/Contact/ContactInformation";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ContactItem } from "@/type/contact";
import FindUs from "@/components/sections/Contact/FindUs";
import ContactHero from "@/components/sections/Contact/ContactHero";
import type { Metadata } from "next";
import ContactFAQ from "@/components/sections/Contact/ContactFAQ";
import { routing, type Locale, getPathname } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

const SITE_URL = CONTACT.siteUrl;
const SITE_NAME = CONTACT.siteName;

const META = {
  en: {
    title: "Contact All Morocco Tours | Morocco Travel Experts",
    description:
      "Contact All Morocco Tours for questions about Morocco tours, Sahara desert trips, shared tours or private itineraries. Get local advice and plan your trip.",
  },
  es: {
    title: "Contacto All Morocco Tours | Expertos en Viajes a Marruecos",
    description:
      "Contacta con All Morocco Tours para consultar sobre circuitos por Marruecos, excursiones al desierto del Sahara y viajes privados. Nuestro equipo local te ayuda.",
  },
} as const;


export async function generateMetadata({params,}: PageProps): Promise<Metadata> {


  const { locale } = await params;
  if (locale !== "en" && locale !== "es") {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const t = META[locale];

  const canonicalPath = getPathname({
    locale,
    href: "/contact",
  });


  const canonical = new URL(canonicalPath, SITE_URL).toString();

  const enUrl = new URL(
    getPathname({
      locale: "en",
      href: "/contact",
    }),
    SITE_URL,
  ).toString();

  const esUrl = new URL(
    getPathname({
      locale: "es",
      href: "/contact",
    }),
    SITE_URL,
  ).toString();

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },

    openGraph: {
      type: "website",
      title: t.title,
      description: t.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
    },

    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}


type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

async function page({ params }: PageProps) {

  const { locale } = await params;

  if (locale !== "en" && locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: "ContactInformation" });
  
  const ITEMS: ContactItem[] = [
    { icon: <FaWhatsapp className="h-5 w-5" aria-hidden="true" />, label: t("whatsapp"), value: CONTACT.phone, note: t("whatsappNote"), href: CONTACT.whatsappHref },
    { icon: <Phone className="h-5 w-5" aria-hidden="true" />, label: t("phone"), value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: <Mail className="h-5 w-5" aria-hidden="true" />, label: t("email"), value: CONTACT.email, href: CONTACT.emailHref },
    { icon: <MapPin className="h-5 w-5" aria-hidden="true" />, label: t("location"), value: t("locationValue", { cities: CONTACT.cities }) },
    { icon: <Clock className="h-5 w-5" aria-hidden="true" />, label: t("availability"), value: t("availabilityValue") },
  ];

  return (
    <>
      <ContactHero />
      <section className="bg-background pt-8 lg:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <ContactForm />
          <ContactInformation ITEMS={ITEMS} />
        </div>
      </section>
      <ContactFAQ />
      <FindUs />
    </>
  );
}

export default page;
