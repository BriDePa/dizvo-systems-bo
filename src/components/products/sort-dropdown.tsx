"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown } from "lucide-react"

const sortOptions = [
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: Menor a Mayor" },
  { value: "price-desc", label: "Precio: Mayor a Menor" },
  { value: "name", label: "Nombre: A-Z" },
]

interface SortDropdownProps {
  currentSort: string
}

export function SortDropdown({ currentSort }: SortDropdownProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    if (value === "newest") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    params.delete("page")
    const query = params.toString()
    router.push(query ? `/shop?${query}` : "/shop")
  }

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={handleChange}
        aria-label="Ordenar productos por"
        className="appearance-none rounded-md border border-border bg-white py-2 pl-3 pr-8 text-sm text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}
