"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = sessionStorage.getItem("announcement-dismissed")
    if (stored === "true") setDismissed(true)
  }, [])

  function handleDismiss() {
    setDismissed(true)
    sessionStorage.setItem("announcement-dismissed", "true")
  }

  if (!mounted || dismissed || !siteConfig.announcement) return null

  return (
    <div className="relative bg-foreground px-4 pr-10 py-2.5 text-center text-xs font-medium text-background sm:text-sm sm:pr-4">
      <p className="leading-snug">{siteConfig.announcement}</p>
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1.5 text-background/70 hover:text-background"
        aria-label="Cerrar anuncio"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
