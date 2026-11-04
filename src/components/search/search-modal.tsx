"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, ArrowRight } from "lucide-react"
import { StarRating } from "@/components/products/star-rating"
import { formatPrice } from "@/lib/utils"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import type { Product } from "@/types"
import data from "@/data/products.json"

const allProducts = data.products as Product[]

const popularSearches = [
  "Laptops",
  "HP Victus",
  "Acer Nitro",
  "RTX 4060",
  "RTX 4050",
  "Intel i7",
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const results = query.trim().length > 0
    ? allProducts.filter(
        (p) =>
          p.status === "active" &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
      ).slice(0, 6)
    : []

  const handleClose = useCallback(() => {
    setQuery("")
    onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose()

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  const hasQuery = query.trim().length > 0

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative mx-auto mt-3 sm:mt-[10vh] w-full max-w-2xl px-3 sm:px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar productos"
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl border border-neutral-100">
          {/* Input */}
          <div className="flex items-center border-b px-4 py-1">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar laptops, procesadores, gráficas..."
              aria-label="Buscar productos"
              className="flex-1 border-0 bg-transparent px-3 py-3.5 text-base outline-none placeholder:text-muted-foreground/60"
            />
            {hasQuery ? (
              <button
                onClick={() => setQuery("")}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-neutral-100 hover:text-foreground"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-neutral-100 hover:text-foreground sm:hidden"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            {!hasQuery && (
              <kbd className="hidden rounded border bg-neutral-100 px-1.5 py-0.5 text-xs text-muted-foreground sm:inline">
                ESC
              </kbd>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[65vh] overflow-y-auto">
            {hasQuery && results.length > 0 && (
              <div className="p-2 space-y-1">
                {results.map((product) => {
                  const variant = product.variants[0]
                  return (
                    <Link
                      key={product.id}
                      href={`/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100 border">
                        <Image
                          src={product.images[0]?.url ?? PLACEHOLDER_IMAGE}
                          alt={product.images[0]?.alt ?? product.name}
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-foreground">
                          {product.name}
                        </p>
                        <StarRating
                          rating={product.rating}
                          reviewCount={product.reviewCount}
                          size="sm"
                        />
                      </div>
                      {variant && (
                        <span className="text-xs sm:text-sm font-bold text-foreground shrink-0">
                          {formatPrice(variant.price, variant.currency)}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}

            {hasQuery && results.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-foreground">
                  No se encontraron resultados para &ldquo;{query}&rdquo;
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Intenta buscar por modelo, marca (HP, Acer) o componente.
                </p>
              </div>
            )}

            {!hasQuery && (
              <div className="p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Búsquedas populares
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-neutral-100 active:bg-neutral-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {hasQuery && results.length > 0 && (
            <div className="border-t bg-neutral-50 px-4 py-2.5">
              <Link
                href={`/shop?q=${encodeURIComponent(query)}`}
                onClick={handleClose}
                className="flex items-center justify-between text-xs font-semibold text-primary hover:underline"
              >
                <span>Ver todos los resultados para &ldquo;{query}&rdquo;</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
