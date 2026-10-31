import { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Home/Hero";

export default async function Home({params,}: { params: Promise<{ locale: Locale }>;}) {

  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
    </>
  );
}
