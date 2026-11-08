import Image from "next/image";
import { CONTACT } from "@/config/contact";
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";



const CITY_TOURS = [
  { city: "marrakech", label: "fromMarrakech" },
  { city: "fes", label: "fromFes" },
  { city: "casablanca", label: "fromCasablanca" },
  { city: "tangier", label: "fromTangier" },
  { city: "agadir", label: "fromAgadir" },
] as const;

const CURRENT_YEAR = 2026;

export default function Footer(): React.JSX.Element {
  const tContact = useTranslations("ContactInformation");
  const tHeader = useTranslations("Header");
  const tFooter = useTranslations("Footer");

  return (
    <footer className="w-full bg-footer text-footer-foreground border-t border-footer-border">

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* 1. BRAND & LOGO (Col span 4) */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link href="/" aria-label={tHeader("homeLabel")}><Image src="/logo.png" width={220} height={130} alt="All Morocco Tours" className="h-auto w-44 rounded-lg bg-background p-2" /></Link>
            <p className="text-sm leading-relaxed text-footer-muted">
              {tFooter("description")}
            </p>

            {/* Social Links */}
            {/* Contact link */}
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-footer-muted mb-3">
                {tFooter("whatsappUs")}
              </span>
              <div className="flex items-center gap-2.5">
                <SocialLink
                  href={CONTACT.whatsappHref}
                  label="WhatsApp"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>

          {/* 2. QUICK NAVIGATION (Col span 2) */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-lg font-semibold text-footer-foreground">
              {tFooter("quickLinksTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <FooterNavLink href="/" label={tHeader("home")} />
              </li>
              <li>
                <FooterNavLink href="/tours" label={tHeader("tours")} />
              </li>
              <li>
                <FooterNavLink href="/shared-tours" label={tHeader("sharedTours")} />
              </li>
              <li>
                <FooterNavLink href="/day-trips" label={tHeader("dayTrips")} />
              </li>
              <li>
                <FooterNavLink
                  href="/customize-your-tour"
                  label={tHeader("customTour")}
                />
              </li>
              <li>
                <FooterNavLink href="/blog" label={tHeader("blog")} />
              </li>
              <li>
                <FooterNavLink href="/about" label={tHeader("about")} />
              </li>
              <li>
                <FooterNavLink href="/contact" label={tHeader("contact")} />
              </li>
            </ul>
          </div>

          {/* 3. TOURS BY DEPARTURE CITY  */}
          <div className="lg:col-span-3">
            <h2 className="font-heading text-lg font-semibold text-footer-foreground">
              {tFooter("popularToursTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CITY_TOURS.map(({ city, label }) => (
                <li key={city}>
                  <Link
                    href={{
                      pathname: "/tours/from/[city]",
                      params: { city },
                    }}
                    className="inline-block text-footer-muted transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    {tHeader(label)}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <span>{tHeader("allTours")}</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. CONTACT & CONCIERGE  */}
          <div className="lg:col-span-3">
            <h2 className="font-heading text-lg font-semibold text-footer-foreground">
              {tFooter("contactTitle")}
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm text-footer-muted">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex items-start gap-3 transition-colors hover:text-gold"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card/5 text-gold border border-footer-border transition-colors group-hover:border-gold/40 group-hover:bg-gold/10">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-footer-muted/80">
                      {tFooter("directCall")}
                    </span>
                    <span className="font-medium text-footer-foreground group-hover:text-gold">
                      {CONTACT.phone}
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 transition-colors hover:text-whatsapp"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card/5 text-whatsapp border border-footer-border transition-colors group-hover:border-whatsapp/40 group-hover:bg-whatsapp/10">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-footer-muted/80">
                      WhatsApp
                    </span>
                    <span className="font-medium text-footer-foreground group-hover:text-whatsapp">
                      {CONTACT.phone}
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={CONTACT.emailHref}
                  className="group flex items-start gap-3 transition-colors hover:text-gold"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card/5 text-gold border border-footer-border transition-colors group-hover:border-gold/40 group-hover:bg-gold/10">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-footer-muted/80">
                      {tFooter("emailLabel")}
                    </span>
                    <span className="break-all font-medium text-footer-foreground group-hover:text-gold">
                      {CONTACT.email}
                    </span>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-3 pt-1">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card/5 text-gold border border-footer-border">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-footer-muted/80">
                    {tFooter("addressTitle")}
                  </span>
                  <span className="font-medium text-footer-foreground">
                    {tContact("locationValue", { cities: CONTACT.cities })}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card/5 text-gold border border-footer-border">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-footer-muted/80">
                    {tFooter("availability")}
                  </span>
                  <span className="font-medium text-footer-foreground">
                    {tFooter("workingHours")}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM COPYRIGHT & LEGAL ─── */}
      <div className="border-t border-footer-border/80 bg-footer py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8 text-xs text-footer-muted">
          <p className="text-center sm:text-left">
            &copy; {CURRENT_YEAR} All Morocco Tours. {tFooter("rights")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">

            <span className="hidden sm:inline text-footer-border">&bull;</span>
            <span className="text-footer-muted/70">
              {tFooter("tagline")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterNavLink({
  href,
  label,
}: {
  href: "/" | "/tours" | "/shared-tours" | "/day-trips" | "/customize-your-tour" | "/blog" | "/about" | "/contact";
  label: string;
}): React.JSX.Element {
  return (
    <Link
      href={href}
      className="inline-block text-footer-muted transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
    >
      {label}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}): React.JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-footer-border bg-card/5 text-footer-muted transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {icon}
    </a>
  );
}

/* ─── Social & Brand Icons ─── */

function WhatsAppIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

