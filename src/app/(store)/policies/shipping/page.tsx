import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Modalidad de Entregas y Envíos | ${siteConfig.name}`,
  description: `Conoce cómo realizamos las entregas personales y envíos nacionales en ${siteConfig.name}.`,
}

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Modalidad de Entregas y Envíos</h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-950">
          <p className="font-semibold text-blue-900">Sin tienda física:</p>
          <p className="mt-1 text-blue-800/90 leading-relaxed">
            En <strong>{siteConfig.name}</strong> operamos como tienda en línea directa. No contamos con sucursal o local comercial abierto al público, lo que nos permite ofrecerte precios altamente competitivos y atención 100% personalizada por WhatsApp.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-foreground">
          1. Entregas Personales en Puntos Acordados
        </h2>
        <p>
          Coordinamos la entrega de tu laptop o componente en un punto céntrico, seguro y conveniente para ambas partes. Puedes revisar tu equipo y verificar los sellos y especificaciones al momento de recibirlo.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          2. Envíos Nacionales Asegurados
        </h2>
        <p>
          Si te encuentras en otra ciudad o departamento, realizamos envíos a través de empresas de transporte y courier reconocidas. Cada equipo cuenta con:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>Embalaje especial con protección antiestática y burbuja de alta resistencia.</li>
          <li>Fotografías previas del equipo y del empaque antes de su despacho.</li>
          <li>Número de guía o comprobante para seguimiento en tiempo real.</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">
          Coordinación Rápida
        </h2>
        <p>
          Para coordinar la entrega de tu equipo o consultar tiempos exactos para tu localidad, escríbenos directamente a nuestro WhatsApp oficial <strong>{siteConfig.contact.displayWhatsapp}</strong>.
        </p>
      </div>
    </div>
  )
}
