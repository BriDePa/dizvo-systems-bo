"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Heart } from "lucide-react"
import { toast } from "sonner"
import { useCartStore } from "@/store/cart"
import { useWishlistStore } from "@/store/wishlist"
import { useRecentlyViewedStore } from "@/store/recently-viewed"
import { RecentlyViewed } from "@/components/products/recently-viewed"
import { StarRating } from "@/components/products/star-rating"
import { TrustSignals } from "@/components/products/trust-signals"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductGallery } from "@/components/products/product-gallery"
import { VariantSelector } from "@/components/products/variant-selector"
import { QuantitySelector } from "@/components/products/quantity-selector"
import { ProductGrid } from "@/components/products/product-grid"
import { formatPrice } from "@/lib/utils"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import type { Product, Brand, Category } from "@/types"

interface ProductDetailViewProps {
  product: Product
  relatedProducts: Product[]
  brand: Brand | null
  categoryAncestors?: Category[]
}

export function ProductDetailView({
  product,
  relatedProducts,
  brand,
  categoryAncestors = [],
}: ProductDetailViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  )
  const [quantity, setQuantity] = useState(1)

  const addToCart = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)
  const wishlistItems = useWishlistStore((s) => s.items)
  const addToWishlist = useWishlistStore((s) => s.addItem)
  const removeFromWishlist = useWishlistStore((s) => s.removeItem)

  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addItem)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isWishlisted = mounted && wishlistItems.some((i) => i.productId === product.id)

  // Track recently viewed
  useEffect(() => {
    addRecentlyViewed({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.variants[0]?.price ?? 0,
      imageUrl: product.images[0]?.url ?? "",
      imageAlt: product.images[0]?.alt ?? product.name,
    })
  }, [product.id])

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  )
  if (!selectedVariant) return null

  const isOnSale =
    selectedVariant.compareAtPrice &&
    selectedVariant.compareAtPrice > selectedVariant.price
  const inStock =
    selectedVariant.inventory.quantity > 0 ||
    selectedVariant.inventory.allowBackorder

  function handleAddToCart() {
    addToCart({
      variantId: selectedVariant!.id,
      productId: product.id,
      name: product.name,
      variantName: selectedVariant!.name,
      image: product.images[0] ?? { url: "", alt: product.name },
      slug: product.slug,
      price: selectedVariant!.price,
      quantity,
    })
    openCart()
  }

  function handleToggleWishlist() {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast("Removed from wishlist")
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: selectedVariant!.price,
        image: product.images[0] ?? { url: "", alt: product.name },
      })
      toast.success("Added to wishlist")
    }
  }

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Shop", href: "/shop" },
    ...categoryAncestors.map((c) => ({ name: c.name, href: `/${c.slug}` })),
    { name: product.name, href: `/${product.slug}` },
  ])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: selectedVariant.sku,
    brand: brand ? { "@type": "Brand", name: brand.name } : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: (selectedVariant.price / 100).toFixed(2),
      priceCurrency: selectedVariant.currency,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
      />
      {/* Breadcrumb — shows category ancestry; product name is in the H1 below */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/shop" />}>Catálogo</BreadcrumbLink>
          </BreadcrumbItem>
          {categoryAncestors.map((cat, idx) => {
            const isLast = idx === categoryAncestors.length - 1
            return (
              <div key={cat.id} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{cat.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={`/${cat.slug}`} />}>
                      {cat.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product */}
      <div className="mt-2 grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Info */}
        <div className="flex flex-col">
          <div>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          {brand && (
            <Link
              href={`/${brand.slug}`}
              className="mt-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              {brand.name}
            </Link>
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">
              {formatPrice(selectedVariant.price, selectedVariant.currency)}
            </span>
            {isOnSale && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(
                    selectedVariant.compareAtPrice!,
                    selectedVariant.currency
                  )}
                </span>
                <Badge variant="secondary">
                  {Math.round(
                    (1 -
                      selectedVariant.price /
                        selectedVariant.compareAtPrice!) *
                      100
                  )}
                  % de descuento
                </Badge>
              </>
            )}
          </div>

          <p className="mt-4 text-muted-foreground">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mt-6 mb-6">
              <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariantId}
                onSelect={setSelectedVariantId}
              />
            </div>
          )}

          {/* Botón personalizado de WhatsApp por producto */}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={`https://wa.me/59165991669?text=${encodeURIComponent(
                `Hola Dizvo Systems! Me interesa el producto: *${product.name}* (${selectedVariant.name}) - Precio: ${formatPrice(selectedVariant.price, selectedVariant.currency)}. ¿Podemos coordinar la entrega o envío?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#20ba5a] hover:shadow-lg active:scale-[0.98]"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Pedir / Consultar por WhatsApp</span>
            </a>
            <p className="text-center text-xs text-muted-foreground">
              Entregas personales en puntos acordados y envíos asegurados a todo el país
            </p>
          </div>
          <Separator className="my-6" />

          <TrustSignals />
        </div>
      </div>

      {/* Full HTML description (below gallery/add-to-cart) */}
      {product.body && (
        <section className="mt-16 border-t pt-12">
          <div className="mx-auto max-w-3xl">
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: product.body }}
            />
          </div>
        </section>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight">
            También te puede interesar
          </h2>
          <div className="mt-6">
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}

      {/* Recently viewed */}
      <RecentlyViewed excludeProductId={product.id} />
    </div>
  )
}
