"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/products/star-rating"
import { formatPrice } from "@/lib/utils"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const defaultVariant = product.variants[0]
  if (!defaultVariant) return null

  const price = defaultVariant.price
  const compareAtPrice = defaultVariant.compareAtPrice
  const isOnSale = compareAtPrice && compareAtPrice > price
  const image = product.images[0]

  return (
    <Link href={`/${product.slug}`} className="group flex flex-col h-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200/80 transition-all duration-300 group-hover:border-neutral-300 group-hover:shadow-md">
        <Image
          src={image?.url ?? PLACEHOLDER_IMAGE}
          alt={image?.alt ?? product.name}
          fill
          className="object-contain p-2 sm:p-3 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {isOnSale && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-white/95 text-[10px] sm:text-xs font-semibold shadow-xs"
          >
            Oferta
          </Badge>
        )}
      </div>

      <div className="mt-2.5 flex flex-1 flex-col justify-between">
        <div>
          <div className="scale-90 origin-left">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>
          <h3 className="mt-1 text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="mt-2 pt-1 border-t border-neutral-100">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-foreground">
              {formatPrice(price, defaultVariant.currency)}
            </span>
            {isOnSale && (
              <span className="text-[11px] sm:text-xs text-muted-foreground line-through">
                {formatPrice(compareAtPrice, defaultVariant.currency)}
              </span>
            )}
          </div>
          {product.variants.length > 1 && (
            <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">
              {product.variants.length} opciones disponibles
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
