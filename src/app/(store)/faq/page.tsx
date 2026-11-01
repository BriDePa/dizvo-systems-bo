import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Preguntas Frecuentes | ${siteConfig.name}`,
  description: `Respuestas a dudas comunes sobre compras, envíos, garantías y cotizaciones en ${siteConfig.name}.`,
}

const faqs = [
  {
    question: "¿Los productos y componentes son 100% nuevos y originales?",
    answer:
      "Sí, en Dizvo Systems solo comercializamos productos y componentes completamente nuevos, sellados de fábrica y con garantía directa de marcas reconocidas como ASUS, Lenovo, NVIDIA, AMD, Corsair y Kingston.",
  },
  {
    question: "¿Cómo puedo solicitar una cotización de una PC personalizada?",
    answer:
      "Puedes escribirnos a través de nuestro formulario en la página de Contacto o a nuestro correo oficial detallando el uso principal (gaming, edición, arquitectura, oficina) y tu presupuesto estimado. Nuestro equipo te responderá con una propuesta de componentes equilibrada.",
  },
  {
    question: "¿Qué garantía tienen los equipos y componentes?",
    answer:
      "Todos los componentes individuales cuentan con garantía oficial de fabricante (de 1 a 3 años según la marca y componente). Las computadoras armadas por nosotros incluyen garantía integral sobre el ensamble y soporte para resolución de dudas.",
  },
  {
    question: "¿Cómo realizan los envíos de equipos delicados como monitores o computadoras?",
    answer:
      "Empacamos cada pedido con materiales amortiguadores de alto impacto (burbuja de alta densidad, esquineros y doble caja cuando es necesario). Además, todos los envíos cuentan con número de seguimiento para que conozcas el estado de tu paquete en todo momento.",
  },
  {
    question: "¿Cuánto tardan los envíos?",
    answer:
      "El tiempo de entrega habitual es de 2 a 5 días hábiles dependiendo de la localidad. En pedidos de computadoras armadas personalizadas se suma 1 día hábil para el ensamble, gestión de cables y pruebas de estabilidad térmica.",
  },
  {
    question: "¿Ofrecen asesoría sobre compatibilidad de componentes?",
    answer:
      "Por supuesto. Si tienes dudas sobre si una tarjeta gráfica entra en tu gabinete, si tu fuente de poder tiene los vatios suficientes o qué velocidad de memoria RAM soporta tu procesador, puedes consultarnos sin compromiso.",
  },
]

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Preguntas Frecuentes
      </h1>
      <p className="mt-4 text-muted-foreground">
        Encuentra respuestas rápidas sobre nuestros productos, garantías, soporte técnico y cotizaciones en {siteConfig.name}.
      </p>

      <Accordion className="mt-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
