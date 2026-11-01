import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Zap, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/config"
import { formatPrice } from "@/lib/utils"
import { ProductGrid } from "@/components/products/product-grid"
import { NewsletterForm } from "@/components/layout/newsletter-form"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { productRepository, categoryRepository } from "@/lib/repositories"

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
  },
}

export default async function HomePage() {
  const categories = await categoryRepository.list()
  const featuredProducts = await productRepository.getFeatured(4)

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex h-[600px] items-center justify-center bg-gradient-to-b from-neutral-100 to-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Envío gratis en compras sobre {formatPrice(siteConfig.freeShippingThreshold)}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            Laptops, Computadoras y Componentes
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Descubre los mejores equipos para gaming, oficina y diseño. 
            Hardware de última generación, procesadores, tarjetas gráficas y accesorios con garantía.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/shop">
                Ver Catálogo Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contáctanos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Explorar por Categoría
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Encuentra rápidamente lo que necesitas para tu equipo
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Ver todas &rarr;
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 border transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={category.image?.url ?? PLACEHOLDER_IMAGE}
                  alt={category.image?.alt ?? category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-sm font-medium group-hover:underline">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Productos Destacados
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Lo más popular y recomendado en hardware y portátiles
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Ver todos &rarr;
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Beneficios */}
      <section className="border-t bg-neutral-50 py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Garantía Asegurada</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Todos nuestros componentes y computadoras cuentan con garantía directa y soporte técnico.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Envíos Rápidos</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Despachamos tu pedido con empaque seguro y seguimiento en tiempo real.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Asesoría Personalizada</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                ¿Tienes dudas sobre compatibilidad? Nuestro equipo te asesora antes de comprar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Boletín */}
      <section className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Suscríbete a nuestras novedades
          </h2>
          <p className="mt-4 text-neutral-400">
            Recibe avisos sobre nuevas llegadas, ofertas especiales y lanzamientos de hardware.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
