import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Users,
  Compass,
  Heart,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";

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

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return <AboutContent params={params} />;
}

async function AboutContent({
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

/* ────────────────────────────────────────────
   Section 1 — Meet Aziz
   ──────────────────────────────────────────── */
function MeetAziz() {
  const t = useTranslations("About");

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center lg:mb-16">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            {t("meetAziz")}
          </h1>
        </div>

        {/* Content: image + text */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/aziz1.jpeg"
                alt={t("azizImageAlt")}
                width={720}
                height={540}
                quality={80}
                sizes="(max-width: 768px) 90vw, 45vw"
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-gold/30"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-text-main sm:text-xl">
              {t("azizIntro")}
            </p>
            <p className="leading-relaxed text-text-secondary">
              {t("azizBody")}
            </p>
            <p className="text-lg font-medium text-heading">
              {t("azizClosing")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 2 — Our Story / Experience
   ──────────────────────────────────────────── */
function OurStory() {
  const t = useTranslations("About");

  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            {t("ourStory")}
          </h2>
        </div>

        {/* Content: text + image (reversed order on desktop) */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text — comes first visually on desktop */}
          <div className="order-2 flex flex-col gap-5 lg:order-1">
            <p className="text-lg leading-relaxed text-text-main sm:text-xl">
              {t("storyIntro")}
            </p>
            <p className="leading-relaxed text-text-secondary">
              {t("storyBody")}
            </p>
            <p className="text-lg font-medium text-heading">
              {t("storyClosing")}
            </p>
          </div>

          {/* Photo */}
          <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/aziz4.jpeg"
                alt={t("experienceImageAlt")}
                width={720}
                height={540}
                quality={80}
                sizes="(max-width: 768px) 90vw, 45vw"
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-2xl border-2 border-gold/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 3 — Why Choose Us
   ──────────────────────────────────────────── */
function WhyChooseUs() {
  const t = useTranslations("About");

  const reasons = [
    {
      icon: Sparkles,
      title: t("why1Title"),
      desc: t("why1Desc"),
    },
    {
      icon: MapPin,
      title: t("why2Title"),
      desc: t("why2Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("why3Title"),
      desc: t("why3Desc"),
    },
    {
      icon: CheckCircle2,
      title: t("why4Title"),
      desc: t("why4Desc"),
    },
  ];

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            {t("whyChooseUsTitle")}
          </h2>
          <p className="mt-4 text-base text-text-secondary sm:text-lg">
            {t("whyChooseUsSubtitle")}
          </p>
        </div>

        {/* 4 Clean Borderless Columns — No box borders, no icon borders */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-start gap-3">
                <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="font-heading text-2xl font-semibold text-heading">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 4 — What We Stand For
   ──────────────────────────────────────────── */
function WhatWeStandFor() {
  const t = useTranslations("About");

  const values = [
    {
      number: "01",
      icon: HeartHandshake,
      title: t("stand1Title"),
      desc: t("stand1Desc"),
    },
    {
      number: "02",
      icon: Users,
      title: t("stand2Title"),
      desc: t("stand2Desc"),
    },
    {
      number: "03",
      icon: Compass,
      title: t("stand3Title"),
      desc: t("stand3Desc"),
    },
    {
      number: "04",
      icon: Heart,
      title: t("stand4Title"),
      desc: t("stand4Desc"),
    },
  ];

  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
            {t("standForTitle")}
          </h2>
          <p className="mt-4 text-base text-text-secondary sm:text-lg">
            {t("standForSubtitle")}
          </p>
        </div>

        {/* Stacked Horizontal Bars — Zero border-radius */}
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between gap-4 border-l-4 border-gold bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary md:flex-row md:items-center md:gap-8"
              >
                <div className="flex items-center gap-4 md:w-5/12">
                  <span className="font-heading text-xl font-bold tracking-wider text-gold transition-colors group-hover:text-primary">
                    {val.number}
                  </span>
                  <Icon
                    className="h-6 w-6 text-gold transition-colors group-hover:text-primary shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-xl font-semibold text-heading sm:text-2xl">
                    {val.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base md:w-7/12">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Section 5 — Call to Action
   ──────────────────────────────────────────── */
function CallToAction() {
  const t = useTranslations("About");

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-semibold text-heading sm:text-4xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-secondary">
          {t("ctaDescription")}
        </p>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
        >
          {t("ctaButton")}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
