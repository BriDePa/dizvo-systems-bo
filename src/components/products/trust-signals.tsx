import { Truck, ShieldCheck, MapPin } from "lucide-react"

export function TrustSignals() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        <span>Entregas personales en puntos acordados para tu seguridad</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Truck className="h-4 w-4 text-primary shrink-0" />
        <span>Envíos a todo el país con empaque protegido y seguimiento</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <span>Productos 100% nuevos, sellados y con garantía de fabricante</span>
      </div>
    </div>
  )
}
