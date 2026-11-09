import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OurStory() {
  const t = useTranslations("About");

  return (
    <section className="bg-muted py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Content: text + image gallery (reversed order on desktop) */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text with Title aligned above — comes first visually on desktop */}
          <div className="order-2 flex flex-col gap-5 lg:order-1">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              {t("ourStory")}
            </h2>
            <p className="text-lg font-medium leading-relaxed text-text-main sm:text-xl">
              {t("storyP1")}
            </p>
            <p className="leading-relaxed text-text-secondary">
              {t("storyP2")}
            </p>
            <p className="leading-relaxed text-text-secondary">
              {t("storyP3")}
            </p>
            <p className="leading-relaxed text-text-secondary">
              {t("storyP4")}
            </p>
            <p className="text-lg font-medium text-heading">
              {t("storyP5")}
            </p>
          </div>

          {/* Photo Gallery: aziz4 + aziz8 + aziz9 */}
          <div className="relative order-1 mx-auto flex w-full max-w-md flex-col gap-4 lg:order-2 lg:max-w-none">
            {/* Featured Photo */}
            <div className="relative">
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
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-gold/30"
              />
            </div>

            {/* Companion Photos: aziz8 and aziz9 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/images/aziz8.jpeg"
                  alt={t("experienceImageAlt2")}
                  width={360}
                  height={270}
                  quality={80}
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/images/aziz9.jpeg"
                  alt={t("experienceImageAlt3")}
                  width={360}
                  height={270}
                  quality={80}
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

