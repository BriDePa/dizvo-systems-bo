import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { brandRepository } from "@/lib/repositories"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Marcas Oficiales | ${siteConfig.name}`,
  description: `Explora todas las marcas líderes de tecnología y componentes disponibles en ${siteConfig.name}.`,
}

export default async function BrandsPage() {
  const brands = await brandRepository.list()

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Marcas Oficiales"
        description={`${brands.length} marcas líderes con garantía y soporte directo`}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link key={brand.id} href={`/${brand.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold">{brand.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {brand.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
