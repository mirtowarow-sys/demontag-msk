export type SocialLink = {
  type: "whatsapp" | "telegram" | "vk" | "instagram" | "youtube" | "other";
  label: string;
  href: string;
};

export type Contacts = {
  phoneDisplay: string;
  phoneE164: string;
  email: string;
  whatsapp?: SocialLink;
  socials: SocialLink[];
  city?: string;
  address?: string;
};

export const contacts: Contacts = {
  phoneDisplay: "+7 (995) 599-92-57",
  phoneE164: "+79955999257",
  email: "info@demontagmsk.ru",
  whatsapp: {
    type: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/89955999257",
  },
  socials: [
    {
      type: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/89955999257",
    },
    {
      type: "whatsapp",
      label: "WhatsApp (с текстом)",
      href: "https://wa.me/89313955933?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B2%D0%B0%D1%88%D0%B8%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8.",
    },
  ],
  city: "Москва и МО",
};

