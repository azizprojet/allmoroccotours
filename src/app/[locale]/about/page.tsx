import { CONTACT } from "@/config/contact";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing, type Locale, getPathname } from "@/i18n/routing";
import MeetAziz from "@/components/sections/About/MeetAziz";
import OurStory from "@/components/sections/About/OurStory";
import WhyChooseUs from "@/components/sections/About/WhyChooseUs";
import WhatWeStandFor from "@/components/sections/About/WhatWeStandFor";
import CallToAction from "@/components/sections/About/CallToAction";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

const SITE_URL = CONTACT.siteUrl;
const SITE_NAME = CONTACT.siteName;

const META = {
  en: {
    title: "About Us | All Morocco Tours - Tailor-Made Moroccan Journeys",
    description:
      "Meet Aziz and the team behind All Morocco Tours. We craft authentic, tailor-made private tours and desert expeditions across Morocco.",
  },
  es: {
    title: "Sobre Nosotros | All Morocco Tours - Viajes a Medida por Marruecos",
    description:
      "Conoce a Aziz y al equipo de All Morocco Tours. Diseñamos circuitos privados a medida y expediciones por el desierto de Marruecos.",
  },
} as const;

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    href: "/about",
  });

  const canonical = new URL(canonicalPath, SITE_URL).toString();

  const enUrl = new URL(
    getPathname({
      locale: "en",
      href: "/about",
    }),
    SITE_URL,
  ).toString();

  const esUrl = new URL(
    getPathname({
      locale: "es",
      href: "/about",
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

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== "en" && locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <MeetAziz />
      <OurStory />
      <WhyChooseUs />
      <WhatWeStandFor />
      <CallToAction />
    </>
  );
}
