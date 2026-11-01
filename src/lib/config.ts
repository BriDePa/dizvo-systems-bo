// ============================================================================
// Configuración de la Tienda — Fuente única de verdad para configuración global.
// Dizvo Systems
// ============================================================================

export const siteConfig = {
  // Marca
  name: "Dizvo Systems",
  tagline: "Laptops, Computadoras y Componentes de Hardware",
  description:
    "Dizvo Systems — Tu empresa de confianza para laptops, computadoras de alto rendimiento, componentes de hardware y soluciones tecnológicas.",

  // Barra de anuncios superior (dejar en "" para ocultar)
  announcement: "¡Bienvenidos a Dizvo Systems! Calidad, garantía y rendimiento en cada equipo.",

  // URLs
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",

  // Contacto
  contact: {
    email: "contacto@dizvosystems.com",
    phone: "+1 234 567 890",
    address: {
      street: "",
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
  freeShippingThreshold: 10000, // en centavos ($100.00)
  taxRate: 0.16,

  // Moneda y localización
  currency: "USD",
  locale: "es-ES",

  // Legal
  copyrightYear: new Date().getFullYear(),
} as const

export type SiteConfig = typeof siteConfig
