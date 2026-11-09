import { useTranslations } from "next-intl";
import {
  HeartHandshake,
  Users,
  Compass,
  Heart,
} from "lucide-react";

export default function WhatWeStandFor() {
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
    <section className="bg-muted py-16 lg:py-12">
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

        {/* Stacked Horizontal Bars */}
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
                    className="h-6 w-6 shrink-0 text-gold transition-colors group-hover:text-primary"
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

