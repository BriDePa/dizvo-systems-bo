"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"
import { contactFormSchema } from "@/lib/validators"
import { siteConfig } from "@/lib/config"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = contactFormSchema.safeParse(form)
    if (!result.success) {
      toast.error(result.error.issues[0].message)
      return
    }

    setLoading(true)
    setTimeout(() => {
      toast.success("¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.")
      setForm({ name: "", email: "", subject: "", message: "" })
      setLoading(false)
    }, 600)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Contáctanos"
        description={`¿Tienes dudas sobre disponibilidad, cotizaciones de PCs o asesoría técnica? En ${siteConfig.name} estamos para ayudarte.`}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Información de contacto */}
        <div className="space-y-4 lg:col-span-1">
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

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Phone className="h-4 w-4 text-primary" />
                Atención y Cotizaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {siteConfig.contact.phone || "+1 (555) 012-3456"}
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
                Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                Sábados: 9:00 AM - 2:00 PM
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-primary" />
                Envíos y Entregas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Envíos seguros a nivel nacional con empaque especial para hardware delicado.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Formulario de contacto */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Ej: Cotización de laptop / consulta de componentes"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje o especificaciones requeridas</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Detalla qué equipo o componente buscas, presupuesto aproximado o dudas..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                {loading ? "Enviando mensaje..." : "Enviar Mensaje"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
