# Dizvo Systems — Plataforma y Catálogo de Tecnología

Sitio web oficial y catálogo de tecnología de **Dizvo Systems**. Desarrollado con **Next.js**, **Tailwind CSS**, y **shadcn/ui**.

## Especialidad

- **Laptops & Portátiles:** Equipos de alto rendimiento para gaming, creación de contenido y oficina.
- **Computadoras Ensambladas:** Estaciones de trabajo y PCs gaming a medida con componentes testeados.
- **Componentes de Hardware:** Procesadores, tarjetas de video GeForce RTX y Radeon, placas madre, memorias RAM DDR5 y almacenamiento NVMe.
- **Monitores y Periféricos:** Pantallas de alta tasa de refresco y accesorios gamer/productividad.

## Tecnologías

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **next-intl** (Internacionalización en Español)
- **Zustand** (Manejo de estado)
- **Lucide Icons**

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura Principal

- `src/data/products.json`: Base de datos local de productos, categorías y marcas de Dizvo Systems.
- `src/lib/config.ts`: Configuración global (nombre de la empresa, contacto, redes, etc.).
- `src/lib/navigation.ts`: Enlaces de navegación del menú superior y móvil.
- `src/app/(store)/`: Vistas de tienda, catálogo, detalle de producto y páginas informativas.
- `src/components/`: Componentes reutilizables de UI, productos y maquetación.
