import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Zap, Headphones, MapPin } from "lucide-react"
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
  const featuredProducts = await productRepository.getFeatured(5)

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[580px] items-center justify-center bg-gradient-to-b from-neutral-100 to-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Envíos a todo el país y entregas personales en puntos acordados
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            Laptops Gaming y Tecnología en Bolivia
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Especialistas en laptops de alto rendimiento (HP Victus, Acer Nitro), computadoras y componentes. 
            Precios directos en <strong>Bs.</strong> con atención y pedidos inmediatos por WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/shop">
                Ver Catálogo de Laptops
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold" asChild>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  "Hola Dizvo Systems! Quisiera consultar sobre su catálogo de laptops y disponibilidad."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar al WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Laptops y Productos Destacados */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Laptops y Equipos Destacados
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Modelos listos para entrega con procesadores Intel y tarjetas gráficas GeForce RTX
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Ver catálogo completo &rarr;
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 border-t">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Explorar por Categoría
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Encuentra laptops, monitores, partes y accesorios para tu setup
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

      {/* Beneficios y Modalidad de Trabajo */}
      <section className="border-t bg-neutral-50 py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Entregas en Puntos Acordados</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No tenemos tienda física: coordinamos entregas personales y seguras en puntos acordados para tu comodidad.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Envíos a Todo el País</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Despachamos tu equipo con embalaje protegido de alto impacto y número de guía para seguimiento.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Equipos Nuevos y Garantizados</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Laptops y hardware 100% originales con garantía oficial directa y soporte post-venta.
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
            Recibe avisos sobre nuevas llegadas de laptops, ofertas especiales y componentes.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
