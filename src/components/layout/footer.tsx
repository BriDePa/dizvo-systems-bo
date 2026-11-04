import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/lib/config"

function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const footerLinks = {
  shop: [
    { name: "Todos los Productos", href: "/shop" },
    { name: "Laptops", href: "/laptops" },
    { name: "Computadoras", href: "/computadoras" },
    { name: "Componentes", href: "/componentes" },
    { name: "Marcas", href: "/brands" },
  ],
  company: [
    { name: "Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
    { name: "Preguntas Frecuentes", href: "/faq" },
  ],
  legal: [
    { name: "Política de Envíos", href: "/policies/shipping" },
    { name: "Garantías y Devoluciones", href: "/policies/returns" },
    { name: "Política de Privacidad", href: "/policies/privacy" },
    { name: "Términos de Servicio", href: "/policies/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Marca */}
          <div className="sm:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#25D366]">
              <span>WhatsApp: +591 {siteConfig.contact.displayWhatsapp}</span>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Catálogo</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Información</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">Garantía y Legal</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {siteConfig.copyrightYear} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground p-1" aria-label="Twitter">
              <IconTwitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground p-1" aria-label="Instagram">
              <IconInstagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground p-1" aria-label="Facebook">
              <IconFacebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground p-1" aria-label="YouTube">
              <IconYouTube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
