import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Garantías y Devoluciones | ${siteConfig.name}`,
  description: `Políticas de garantía de hardware y devoluciones de ${siteConfig.name}.`,
}

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Garantías y Devoluciones</h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-xl font-semibold text-foreground">
          Garantía de Hardware
        </h2>
        <p>
          En <strong>{siteConfig.name}</strong> garantizamos que todos nuestros productos y componentes son completamente originales y nuevos. Si algún producto presenta un defecto de fabricación dentro del periodo de garantía, gestionamos el cambio o reparación directa según las políticas de cada fabricante.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Plazo para Devoluciones o Reclamaciones
        </h2>
        <p>
          Dispones de hasta 30 días posteriores a la recepción para reportar cualquier disconformidad o solicitar una devolución. El producto debe conservar su empaque original, manuales, accesorios y sellos de fábrica intactos.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Proceso de Gestión
        </h2>
        <p>
          Para iniciar una solicitud de garantía o devolución, contáctanos a través de nuestro correo oficial <strong>{siteConfig.contact.email}</strong> indicando tu número de pedido, descripción del inconveniente y fotografías del producto.
        </p>
      </div>
    </div>
  )
}
