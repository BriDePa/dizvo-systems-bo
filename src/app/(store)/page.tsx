import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductGrid } from "@/components/products/product-grid"
import { NewsletterForm } from "@/components/layout/newsletter-form"
import { productRepository, categoryRepository } from "@/lib/repositories"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"
import { siteConfig } from "@/lib/config"

export const revalidate = 3600

export default async function HomePage() {
  const categories = await categoryRepository.list()
  const featuredProducts = await productRepository.getFeatured(5)

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[440px] sm:min-h-[540px] items-center justify-center bg-gradient-to-b from-neutral-100 to-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Badge variant="secondary" className="mb-4 text-xs sm:text-sm font-medium py-1 px-3">
            Envíos a todo el país y entregas personales en puntos acordados
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-tight">
            Laptops Gaming y Tecnología en Bolivia
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Especialistas en laptops de alto rendimiento (HP Victus, Acer Nitro), computadoras y componentes. 
            Precios directos en <strong>Bs.</strong> con atención y pedidos inmediatos por WhatsApp.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center w-full max-w-sm mx-auto sm:max-w-none">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-6 rounded-xl text-sm sm:text-base font-bold shadow-sm active:scale-95 transition-all"
              asChild
            >
              <Link href="/shop" className="flex items-center justify-center gap-2">
                <span>Ver Catálogo de Laptops</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-sm active:scale-95 transition-all"
              asChild
            >
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  "Hola Dizvo Systems! Quisiera consultar sobre su catálogo de laptops y disponibilidad."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Consultar al WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Laptops y Productos Destacados */}
      <section className="mx-auto w-full max-w-[1440px] px-3.5 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Laptops y Equipos Destacados
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Modelos listos para entrega con procesadores Intel y tarjetas gráficas GeForce RTX
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-primary hover:underline shrink-0"
          >
            Ver catálogo completo &rarr;
          </Link>
        </div>
        <div className="mt-6 sm:mt-8">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto w-full max-w-[1440px] px-3.5 py-10 sm:px-6 sm:py-14 lg:px-8 border-t">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Explorar por Categoría
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Encuentra laptops, monitores, partes y accesorios para tu setup
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground shrink-0"
          >
            Ver todas &rarr;
          </Link>
        </div>
        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200/80 transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={category.image?.url ?? PLACEHOLDER_IMAGE}
                  alt={category.image?.alt ?? category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Beneficios y Modalidad de Trabajo */}
      <section className="border-t bg-neutral-50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold">Entregas en Puntos Acordados</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
                No tenemos tienda física: coordinamos entregas personales y seguras en puntos acordados para tu comodidad.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold">Envíos a Todo el País</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
                Despachamos tu equipo con embalaje protegido de alto impacto y número de guía para seguimiento continuo.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold">Equipos Nuevos y Garantizados</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
                Laptops y hardware 100% originales con garantía oficial directa y soporte post-venta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Boletín */}
      <section className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4 py-12 sm:py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
            Suscríbete a nuestras novedades
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 max-w-md">
            Recibe avisos sobre nuevas llegadas de laptops, ofertas especiales y componentes.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
