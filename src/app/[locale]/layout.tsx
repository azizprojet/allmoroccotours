import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { AlternateSlugsProvider } from "@/contexts/AlternateSlugsContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});



export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({children,params,}: { children: React.ReactNode; params: Promise<{ locale: string }>;}) {

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
     notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <AlternateSlugsProvider>
            <Suspense
              fallback={
                <div className="h-16 w-full lg:h-20" aria-hidden="true" />
              }
            >
              <Header />
            </Suspense>
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </AlternateSlugsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

