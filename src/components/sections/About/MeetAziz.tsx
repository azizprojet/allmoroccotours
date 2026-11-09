import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MeetAziz() {
  const t = useTranslations("About");

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          {/* Text with Title aligned above */}
          <div className="flex flex-col gap-5">
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              {t("meetAziz")}
            </h1>
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

