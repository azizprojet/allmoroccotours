import { CONTACT } from "@/config/contact";
import { useTranslations } from "next-intl";


export default function FindUs(): React.JSX.Element {
  const t = useTranslations("FindUs");
  return (
    <section >
      <div className="overflow-hidden sm:mt-12">
        <div className="h-[340px] w-full sm:h-[430px] lg:h-[420px]">
          <iframe
            src={CONTACT.mapEmbedUrl}
            title={t("mapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
