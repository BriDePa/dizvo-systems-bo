"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setTimeout(() => {
      toast.success("Gracias por suscribirte a nuestras novedades.")
      setEmail("")
      setLoading(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col sm:flex-row gap-2.5">
      <input
        type="email"
        placeholder="Ingresa tu correo electrónico"
        aria-label="Correo electrónico para novedades"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <Button variant="secondary" type="submit" disabled={loading} className="h-11 px-6 font-semibold shrink-0">
        {loading ? "..." : "Suscribirme"}
      </Button>
    </form>
  )
}
