import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import MeetAziz from "@/components/sections/About/MeetAziz";
import OurStory from "@/components/sections/About/OurStory";
import WhyChooseUs from "@/components/sections/About/WhyChooseUs";
import WhatWeStandFor from "@/components/sections/About/WhatWeStandFor";
import CallToAction from "@/components/sections/About/CallToAction";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  const canonicalUrl =
    locale === "en"
      ? "https://allmoroccotours.com/about"
      : "https://allmoroccotours.com/es/sobre-nosotros";

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: "https://allmoroccotours.com/about",
        es: "https://allmoroccotours.com/es/sobre-nosotros",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonicalUrl,
      siteName: "All Morocco Tours",
      images: [
        {
          url: "/images/aziz4.jpeg",
          width: 1200,
          height: 630,
          alt: t("experienceImageAlt"),
        },
      ],
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
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
