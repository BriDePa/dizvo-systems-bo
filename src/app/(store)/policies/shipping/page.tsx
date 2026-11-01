import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Política de Envíos | ${siteConfig.name}`,
  description: `Conoce los tiempos, costos y modalidades de envío de ${siteConfig.name}.`,
}

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Política de Envíos</h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-xl font-semibold text-foreground">
          Tiempos y Métodos de Entrega
        </h2>
        <ul className="list-inside list-disc space-y-2">
          <li><strong>Envío Estándar Nacional (3 a 5 días hábiles):</strong> Envíos asegurados a todo el territorio nacional.</li>
          <li><strong>Envío Express (1 a 2 días hábiles):</strong> Para entregas urgentes en ciudades principales.</li>
          <li><strong>Envío Gratis:</strong> En compras superiores a ${siteConfig.freeShippingThreshold / 100} USD.</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">
          Empaque Especial para Hardware
        </h2>
        <p>
          En <strong>{siteConfig.name}</strong> comprendemos el cuidado que requieren los componentes electrónicos, paneles de monitores y ensambles de computadoras. Cada equipo es embalado con protección antiestática, sellos de seguridad y relleno de alta absorción de impacto.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Seguimiento del Paquete
        </h2>
        <p>
          Una vez despachado tu pedido, recibirás un número de guía para rastrear la ubicación exacta de tu paquete a través de la empresa de paquetería correspondiente.
        </p>
      </div>
    </div>
  )
}
