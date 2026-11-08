import { useTranslations } from "next-intl";
import { CONTACT } from "@/config/contact";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";


export default function ContactHero(): React.JSX.Element {
  const t = useTranslations("ContactHero");

  return (
    <section className="relative w-full overflow-hidden">
      {/* IMAGE */}
      <div className="relative min-h-[360px] w-full lg:min-h-[420px]">
        <Image
          src="/images/desert.jpeg"
          alt={t("imageAlt")}
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* DÉGRADÉ */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/5 to-secondary/1"
        />

        {/* CONTENU */}
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 lg:min-h-[420px] lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-white">
                {t("label")}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t("title")}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {t("description")}
            </p>

            {/* WHATSAPP */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover"
              >
                <FaWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t("button")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
