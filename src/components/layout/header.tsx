"use client"

import Link from "next/link"
import { Search, ShoppingBag, User, Menu, Heart, LogOut, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchModal } from "@/components/search/search-modal"
import { cn } from "@/lib/utils"
import { shopLinks, mobileMenuSections } from "@/lib/navigation"
import { siteConfig } from "@/lib/config"
import { useTranslations } from "next-intl"
import { useState, useEffect, useCallback } from "react"
import type { Category } from "@/types"
import { useCartStore } from "@/store/cart"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/navigation"

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
  const openCart = useCartStore((s) => s.openCart)
  const getItemCount = useCartStore((s) => s.getItemCount)
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const itemCount = mounted ? getItemCount() : 0

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
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent hover:text-foreground lg:hidden"
            aria-label={t("openMenu")}
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="!w-full !gap-0 sm:!w-80" showCloseButton={false}>
            <div className="shrink-0 px-6 pt-5 pb-2">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                &larr; {tCommon("close")}
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-8">
              {mobileMenuSections.map((section, sectionIdx) => (
                <div key={section.label}>
                  {sectionIdx > 0 && <div className="my-4 border-t" />}
                  <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {section.label}
                  </p>
                  <div className="ml-3">
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
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            className="flex-1 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                          {hasSubcats && (
                            <button
                              onClick={() => setExpandedCategory(isExpanded ? null : item.name)}
                              className="p-2 text-muted-foreground hover:text-foreground"
                              aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.name}`}
                              aria-expanded={isExpanded}
                            >
                              <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                            </button>
                          )}
                        </div>
                        {hasSubcats && isExpanded && (
                          <div className="mb-2 ml-4 flex flex-col border-l pl-4">
                            {subcats.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/${sub.slug}`}
                                className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
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
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
            aria-label={t("searchProducts")}
          >
            <Search className="h-5 w-5" />
          </button>

          <a
            href="https://wa.me/59165991669?text=Hola%20Dizvo%20Systems!%20Quisiera%20hacer%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#20ba5a]"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* NOTA: Wishlist, Login/Registro/Usuario y Carrito ocultos a petición del usuario.
              Para reactivarlos en el futuro, descomentar los bloques correspondientes. */}

          {/*
          <Link
            href="/wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:inline-flex"
            aria-label={t("wishlist")}
          >
            <Heart className="h-5 w-5" />
          </Link>

          {mounted && isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:inline-flex"
                aria-label={t("accountMenu")}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                  {user?.firstName?.[0] ?? "U"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/account")}>
                  {tCommon("signIn")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/account/orders")}>
                  {tCommon("orders")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/account/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); router.push("/") }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {tCommon("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/login"
              className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:inline-flex"
              aria-label={tCommon("signIn")}
            >
              <User className="h-5 w-5" />
            </Link>
          )}

          <button
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
            aria-label={t("openCart")}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`${itemCount} ${itemCount === 1 ? "item" : "items"} in cart`}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
          */}
        </div>
      </div>
    </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
