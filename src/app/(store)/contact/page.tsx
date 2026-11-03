"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Mail, Phone, MapPin, Clock, MessageSquareQuote } from "lucide-react"
import { siteConfig } from "@/lib/config"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleWhatsAppSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = `Hola Dizvo Systems! Mi nombre es *${form.name || "un cliente"}*.\n*Asunto:* ${form.subject || "Consulta general"}\n*Mensaje:* ${form.message}`
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Contáctanos"
        description={`Atención directa y personalizada para cotizaciones, laptops y componentes en ${siteConfig.name}.`}
      />

      {/* Banner sin tienda física */}
      <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-950 sm:p-5">
        <p className="font-semibold text-blue-900">📍 Nota sobre nuestra modalidad de atención:</p>
        <p className="mt-1 text-blue-800/90 leading-relaxed">
          No contamos con tienda física. Operamos 100% de manera digital para ofrecerte los mejores precios en hardware y laptops. 
          Realizamos <strong>entregas personales en puntos acordados</strong> y <strong>envíos asegurados a todo el país</strong>.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Información y WhatsApp Directo */}
        <div className="space-y-4 lg:col-span-1">
          {/* Tarjeta destacada de WhatsApp */}
          <Card className="border-[#25D366]/40 bg-gradient-to-b from-[#25D366]/10 to-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-neutral-900">
                <svg className="h-5 w-5 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                WhatsApp Oficial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-neutral-700">
                Respuesta inmediata para pedidos, cotizaciones y consultas:
              </p>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  "Hola Dizvo Systems, quisiera hacer una consulta o cotización."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#20ba5a]"
              >
                Escribir al {siteConfig.contact.displayWhatsapp}
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-primary" />
                Modalidad de Entregas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Entregas personales y seguras en puntos coordinados. Envíos nacionales con seguimiento constante.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="h-4 w-4 text-primary" />
                Horario de Atención
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lunes a Sábado: 8:30 AM - 8:00 PM<br />
                Atención continua por WhatsApp.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Mail className="h-4 w-4 text-primary" />
                Correo Electrónico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Formulario que conecta directo a WhatsApp */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardContent className="pt-6">
            <div className="mb-6 flex items-start gap-3 rounded-lg bg-neutral-50 p-4 border">
              <MessageSquareQuote className="h-5 w-5 text-neutral-600 mt-0.5 shrink-0" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Envío directo: </strong>
                Al llenar los campos y pulsar el botón, se abrirá tu WhatsApp con el mensaje estructurado para chatear directamente con nosotros.
              </div>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tu Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej: Carlos Mendoza"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Equipo o Componente de Interés</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Ej: Laptop HP Victus / Cotización de PC Gamer"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Detalle de tu Consulta</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="¿Deseas saber disponibilidad, punto de entrega, forma de pago o características adicionales?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20ba5a] font-semibold text-base py-6 px-8 flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Enviar Consulta por WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
