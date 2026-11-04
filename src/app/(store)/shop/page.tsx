import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { productRepository, categoryRepository } from "@/lib/repositories"
import { ProductGrid } from "@/components/products/product-grid"
import { Pagination } from "@/components/products/pagination"
import { SortDropdown } from "@/components/products/sort-dropdown"
import type { SortOption } from "@/types"
import { siteConfig } from "@/lib/config"

interface ShopPageProps {
  searchParams: Promise<{
    page?: string
    sort?: string
    category?: string
    q?: string
  }>
}

export async function generateMetadata({
  searchParams,
}: ShopPageProps): Promise<Metadata> {
  const params = await searchParams
  const page = Number(params.page) || 1
  const canonical = page > 1 ? `${siteConfig.url}/shop?page=${page}` : `${siteConfig.url}/shop`

  return {
    title: "Catálogo de Productos",
    description: "Explora nuestra selección completa de laptops, computadoras y componentes de hardware.",
    alternates: { canonical },
  }
}

const SORT_OPTIONS: Record<string, SortOption> = {
  newest: { field: "createdAt", order: "desc" },
  "price-asc": { field: "price", order: "asc" },
  "price-desc": { field: "price", order: "desc" },
  name: { field: "name", order: "asc" },
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const sortKey = params.sort || "newest"
  const categorySlug = params.category
  const searchQuery = params.q

  const sort = SORT_OPTIONS[sortKey] ?? SORT_OPTIONS.newest

  const { items: products, pagination } = await productRepository.list(
    {
      category: categorySlug,
      search: searchQuery,
    },
    sort,
    { page, limit: 40 }
  )

  const allCategories = await categoryRepository.list()
  const categories = allCategories.filter((c) => !c.parentId)

  // Build current search params for pagination links
  const currentParams: Record<string, string> = {}
  if (sortKey !== "newest") currentParams.sort = sortKey
  if (categorySlug) currentParams.category = categorySlug
  if (searchQuery) currentParams.q = searchQuery

  return (
    <div className="mx-auto max-w-[1440px] px-3.5 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {categorySlug
              ? categories.find((c) => c.slug === categorySlug)?.name ??
                "Catálogo"
              : searchQuery
                ? `Resultados para "${searchQuery}"`
                : "Todos los Productos"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            {pagination.total} {pagination.total === 1 ? "producto encontrado" : "productos encontrados"}
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs text-muted-foreground sm:hidden">Ordenar:</span>
          <Suspense>
            <SortDropdown currentSort={sortKey} />
          </Suspense>
        </div>
      </div>

      {/* Category filter pills con scroll horizontal en móvil */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 touch-pan-x sm:flex-wrap">
        <Link
          href="/shop"
          className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            !categorySlug
              ? "border-foreground bg-foreground text-background"
              : "border-neutral-200 bg-white text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          Todos
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.slug}`}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              categorySlug === cat.slug
                ? "border-foreground bg-foreground text-background"
                : "border-neutral-200 bg-white text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="mt-6 sm:mt-8">
        <ProductGrid products={products} />
      </div>

      {/* Pagination */}
      <div className="mt-10 sm:mt-12">
        <Pagination
          pagination={pagination}
          basePath="/shop"
          searchParams={currentParams}
        />
      </div>
    </div>
  )
}
