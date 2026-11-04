"use client"

import { useState } from "react"
import Image from "next/image"
import type { ProductImage } from "@/types"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: ProductImage[]
  productName?: string
}

export function ProductGallery({ images, productName = "Producto" }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const currentImage = images[selectedIndex]

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Imagen Principal */}
      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 border shadow-xs">
        <Image
          src={currentImage?.url ?? PLACEHOLDER_IMAGE}
          alt={currentImage?.alt ?? productName}
          fill
          className="object-contain p-2 sm:p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          priority
        />
      </div>

      {/* Miniaturas con scroll horizontal táctil para celular */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none -mx-1 px-1 touch-pan-x">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-neutral-50 transition-all",
                selectedIndex === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100"
              )}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={image.url ?? PLACEHOLDER_IMAGE}
                alt={image.alt ?? `${productName} miniatura ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="(max-width: 640px) 64px, 80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
