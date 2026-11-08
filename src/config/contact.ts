

const email = "info@allmoroccotours.com";

const phoneNumber = "+212667956847";

export const CONTACT = {
  siteUrl: "https://allmoroccotours.com",
  siteName: "All Morocco Tours",
  phone: "+212 6 67 95 68 47",
  phoneHref: `tel:${phoneNumber}`,
  whatsappHref: `https://wa.me/${phoneNumber.slice(1)}`,
  email,
  emailHref: `mailto:${email}`,
  cities: "Marrakech & Merzouga",
  mapEmbedUrl:"https://www.google.com/maps?q=travel+agencies+Gueliz+Marrakech+Morocco&output=embed",
} as const;
