export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  label: string
  items: NavItem[]
}

// Fuente única de navegación para encabezado, menú móvil y enlaces
export const shopLinks: NavItem[] = [
  { name: "Laptops", href: "/laptops" },
  { name: "Computadoras", href: "/computadoras" },
  { name: "Componentes", href: "/componentes" },
  { name: "Monitores", href: "/monitores" },
  { name: "Periféricos", href: "/perifericos" },
]

export const accountLinks: NavItem[] = [
  { name: "Mi Cuenta", href: "/account" },
  { name: "Lista de Deseos", href: "/wishlist" },
  { name: "Mis Pedidos", href: "/account/orders" },
]

export const infoLinks: NavItem[] = [
  { name: "Marcas", href: "/brands" },
  { name: "Nosotros", href: "/about" },
  { name: "Contacto", href: "/contact" },
  { name: "Preguntas Frecuentes", href: "/faq" },
]

export const mobileMenuSections: NavSection[] = [
  { label: "Categorías", items: shopLinks },
  // { label: "Cuenta", items: accountLinks }, // Ocultado temporalmente
  { label: "Información", items: infoLinks },
]
