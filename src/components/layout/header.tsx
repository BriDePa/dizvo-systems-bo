"use client"

import Link from "next/link"
import { Search, Menu, ChevronDown, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SearchModal } from "@/components/search/search-modal"
import { cn } from "@/lib/utils"
import { shopLinks, mobileMenuSections } from "@/lib/navigation"
import { siteConfig } from "@/lib/config"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import type { Category } from "@/types"

interface HeaderProps {
  /** All categories (top-level + subcategories) from the repository layer */
  categories?: Category[]
}

export function Header({ categories = [] }: HeaderProps) {
  const allCategories = categories
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Mobile menu trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-accent hover:text-foreground active:bg-accent/80 lg:hidden"
              aria-label={t("openMenu")}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="!w-full !max-w-xs !p-0 flex flex-col" showCloseButton={false}>
              <div className="flex items-center justify-between border-b px-5 py-4 shrink-0">
                <span className="font-bold text-base tracking-tight text-foreground">{siteConfig.name}</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
                  aria-label={tCommon("close")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                {mobileMenuSections.map((section, sectionIdx) => (
                  <div key={section.label}>
                    {sectionIdx > 0 && <div className="my-3 border-t" />}
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.label}
                    </p>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const slug = item.href.replace("/", "")
                        const parentCat = allCategories.find((c) => c.slug === slug)
                        const subcats = parentCat
                          ? allCategories.filter((c) => c.parentId === parentCat.id)
                          : []
                        const hasSubcats = subcats.length > 0
                        const isExpanded = expandedCategory === item.name

                        return (
                          <div key={item.name}>
                            <div className="flex items-center justify-between">
                              <Link
                                href={item.href}
                                className="flex-1 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary active:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.name}
                              </Link>
                              {hasSubcats && (
                                <button
                                  onClick={() => setExpandedCategory(isExpanded ? null : item.name)}
                                  className="p-2 text-muted-foreground hover:text-foreground"
                                  aria-label={`${isExpanded ? "Contraer" : "Expandir"} ${item.name}`}
                                  aria-expanded={isExpanded}
                                >
                                  <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                                </button>
                              )}
                            </div>
                            {hasSubcats && isExpanded && (
                              <div className="mb-2 ml-3 flex flex-col border-l pl-3 space-y-1">
                                {subcats.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    href={`/${sub.slug}`}
                                    className="py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Acceso directo a WhatsApp al pie del menú móvil */}
              <div className="border-t bg-neutral-50 px-5 py-4 shrink-0">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hola%20Dizvo%20Systems!%20Quisiera%20hacer%20una%20consulta.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#20ba5a] active:scale-95"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp: {siteConfig.contact.displayWhatsapp}</span>
                </a>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Entregas en puntos acordados y envíos a toda Bolivia
                </p>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl font-bold tracking-tight text-foreground truncate max-w-[190px] sm:max-w-none">
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex lg:gap-6">
            {shopLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-foreground/70 hover:bg-accent hover:text-foreground active:bg-accent/80"
              aria-label={t("searchProducts")}
            >
              <Search className="h-5 w-5" />
            </button>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hola%20Dizvo%20Systems!%20Quisiera%20hacer%20una%20consulta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#20ba5a] active:scale-95"
              aria-label="Contactar por WhatsApp"
            >
              <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
