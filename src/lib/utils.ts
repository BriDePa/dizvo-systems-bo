import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { siteConfig } from "@/lib/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  priceInCents: number,
  currency?: string
): string {
  const curr = currency ?? siteConfig.currency

  if (
    curr === "Bs" ||
    curr === "Bs." ||
    curr === "BS" ||
    curr === "BOB" ||
    curr === "VES" ||
    siteConfig.currency === "Bs." ||
    siteConfig.currency === "Bs"
  ) {
    const formatted = (priceInCents / 100).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return `Bs. ${formatted}`
  }

  try {
    return new Intl.NumberFormat(siteConfig.locale, {
      style: "currency",
      currency: curr,
    }).format(priceInCents / 100)
  } catch {
    const formatted = (priceInCents / 100).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return `Bs. ${formatted}`
  }
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
