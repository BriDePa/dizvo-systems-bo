import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Términos de Servicio | ${siteConfig.name}`,
  description: `Términos y condiciones de uso del sitio web de ${siteConfig.name}.`,
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Términos de Servicio</h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Bienvenido al sitio web de <strong>{siteConfig.name}</strong>. Al acceder y navegar en nuestro catálogo en línea, aceptas cumplir con los siguientes términos y condiciones.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Información y Disponibilidad de Productos
        </h2>
        <p>
          Nos esforzamos por mantener actualizadas las especificaciones técnicas, precios y disponibilidad de todos los componentes y equipos. Sin embargo, debido a fluctuaciones en el mercado de hardware, las existencias y cotizaciones están sujetas a confirmación al momento de la solicitud.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Propiedad Intelectual
        </h2>
        <p>
          Las marcas comerciales, logotipos de fabricantes (ASUS, NVIDIA, AMD, Lenovo, etc.) y nombres de productos pertenecen a sus respectivos propietarios y se muestran en este sitio con fines informativos y de identificación de compatibilidad.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Modificaciones
        </h2>
        <p>
          <strong>{siteConfig.name}</strong> se reserva el derecho de actualizar o modificar estos términos en cualquier momento sin previo aviso.
        </p>
      </div>
    </div>
  )
}
