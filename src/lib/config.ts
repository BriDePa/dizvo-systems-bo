// ============================================================================
// Configuración de la Tienda — Fuente única de verdad para configuración global.
// Dizvo Systems
// ============================================================================

export const siteConfig = {
  // Marca
  name: "Dizvo Systems",
  tagline: "Laptops, Computadoras y Componentes de Hardware",
  description:
    "Dizvo Systems — Tienda online especializada en laptops gaming, computadoras y componentes. Realizamos envíos a nivel nacional y entregas en puntos acordados.",

  // Barra de anuncios superior (dejar en "" para ocultar)
  announcement: "¡Envíos a todo el país y entregas personales en puntos acordados! Consulta por WhatsApp al 65991669.",

  // URLs
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",

  // Contacto y WhatsApp
  contact: {
    email: "contacto@dizvosystems.com",
    phone: "+591 65991669",
    whatsapp: "59165991669",
    displayWhatsapp: "65991669",
    address: {
      street: "Entregas personales en puntos acordados / Envíos a todo el país",
      suite: "",
      city: "",
      state: "",
      zip: "",
    },
  },

  // Redes sociales (dejar en "" para ocultar)
  social: {
    twitter: "",
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
  },

  // Envíos e impuestos
  freeShippingThreshold: 500000, // en centavos (Bs. 5.000,00)
  taxRate: 0.13,

  // Moneda y localización
  currency: "Bs.",
  locale: "es-BO",

  // Legal
  copyrightYear: new Date().getFullYear(),
} as const

export type SiteConfig = typeof siteConfig
