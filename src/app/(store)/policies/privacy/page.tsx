import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Política de Privacidad | ${siteConfig.name}`,
  description: `Protección de datos y política de privacidad de ${siteConfig.name}.`,
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Política de Privacidad</h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          En <strong>{siteConfig.name}</strong> valoramos y respetamos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas al navegar en nuestro sitio web o contactarnos.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Datos que Recopilamos
        </h2>
        <p>
          Podemos recopilar datos de contacto como nombre, dirección de correo electrónico, teléfono y dirección de entrega cuando solicitas información, cotizaciones o realizas consultas a través de nuestros formularios.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Uso de la Información
        </h2>
        <p>
          Utilizamos tu información exclusivamente para atender tus consultas, procesar cotizaciones, coordinar envíos de productos y mejorar nuestros servicios. No vendemos ni compartimos tu información personal con terceros para fines publicitarios.
        </p>

        <h2 className="text-xl font-semibold text-foreground">
          Contacto de Privacidad
        </h2>
        <p>
          Para cualquier duda sobre el tratamiento de tus datos, puedes comunicarte con nosotros a través de <strong>{siteConfig.contact.email}</strong>.
        </p>
      </div>
    </div>
  )
}
