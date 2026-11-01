import { Truck, RotateCcw, ShieldCheck } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { siteConfig } from "@/lib/config"

export function TrustSignals() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Truck className="h-4 w-4" />
        <span>Envío sin costo en compras mayores a {formatPrice(siteConfig.freeShippingThreshold)}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <RotateCcw className="h-4 w-4" />
        <span>Garantía de cambio y soporte de hardware</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4" />
        <span>Productos 100% originales con garantía oficial</span>
      </div>
    </div>
  )
}
