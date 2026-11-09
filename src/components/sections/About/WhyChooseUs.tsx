import { useTranslations } from "next-intl";
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function WhyChooseUs() {
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
    <section className="bg-background py-16 lg:py-12">
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

        {/* 4 Clean Borderless Columns */}
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

