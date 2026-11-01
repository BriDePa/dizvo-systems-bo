import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { ShieldCheck, Cpu, Headphones, Award } from "lucide-react"

export const metadata: Metadata = {
  title: `Sobre Nosotros | ${siteConfig.name}`,
  description:
    `Conoce más sobre ${siteConfig.name}, tu aliado en tecnología, laptops, computadoras y componentes de hardware.`,
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Sobre {siteConfig.name}</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Pasión por la tecnología, rendimiento sin límites y garantía en cada componente.
      </p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          En <strong>{siteConfig.name}</strong> nos especializamos en la comercialización, asesoría y distribución de tecnología de punta. Desde laptops para gaming y creación de contenido, hasta estaciones de trabajo y componentes individuales para entusiastas del hardware.
        </p>
        <p>
          Nuestro objetivo es ofrecer soluciones tecnológicas confiables y potentes para profesionales, creadores de contenido, programadores, empresas y gamers que buscan el máximo rendimiento en sus actividades diarias.
        </p>

        <div className="my-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border p-5 bg-neutral-50/50">
            <div className="flex items-center gap-3 font-semibold text-foreground mb-2">
              <Cpu className="h-5 w-5 text-primary" />
              <span>Hardware de Última Generación</span>
            </div>
            <p className="text-sm">
              Trabajamos con las marcas líderes globales como ASUS, NVIDIA, AMD, Corsair, Lenovo, Kingston y Logitech.
            </p>
          </div>

          <div className="rounded-lg border p-5 bg-neutral-50/50">
            <div className="flex items-center gap-3 font-semibold text-foreground mb-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Garantía y Confianza</span>
            </div>
            <p className="text-sm">
              Todos nuestros productos y equipos ensamblados cuentan con garantía oficial y soporte técnico directo.
            </p>
          </div>

          <div className="rounded-lg border p-5 bg-neutral-50/50">
            <div className="flex items-center gap-3 font-semibold text-foreground mb-2">
              <Headphones className="h-5 w-5 text-primary" />
              <span>Asesoría Personalizada</span>
            </div>
            <p className="text-sm">
              Te orientamos para armar o elegir el equipo que realmente necesitas según tu presupuesto y requerimientos.
            </p>
          </div>

          <div className="rounded-lg border p-5 bg-neutral-50/50">
            <div className="flex items-center gap-3 font-semibold text-foreground mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Compromiso de Calidad</span>
            </div>
            <p className="text-sm">
              Pruebas rigurosas de estabilidad y compatibilidad en cada computadora antes de ser entregada.
            </p>
          </div>
        </div>

        <h2 className="!mt-12 text-xl font-semibold text-foreground">
          Nuestra Misión
        </h2>
        <p>
          Democratizar el acceso a equipos de computación y componentes de alta calidad, brindando una experiencia transparente, asesoría honesta y un servicio postventa cercano que te respalde en todo momento.
        </p>

        <h2 className="!mt-12 text-xl font-semibold text-foreground">
          ¿Tienes un proyecto o necesitas una cotización?
        </h2>
        <p>
          Si estás buscando armar una PC personalizada, renovar los equipos de tu empresa o adquirir una laptop para tus estudios o trabajo, estamos listos para atenderte.{" "}
          <Link href="/contact" className="underline font-medium text-foreground hover:text-primary">
            Ponte en contacto con nuestro equipo
          </Link>.
        </p>
      </div>
    </div>
  )
}
