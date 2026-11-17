# DevStore · Demo de Next.js

¡Hola! 👋 Esta es **DevStore**, una tienda online de ejemplo para que aprendas Next.js con el **App Router** tocando código de verdad.

No tiene backend: los productos son datos de prueba que viven en un archivo. Así que podés romper, cambiar y probar todo lo que quieras sin miedo.

## Guías por clase

Cada clase tiene su propia guía con un recorrido paso a paso. Te dicen qué abrir en el navegador y qué archivo mirar en cada momento.

| Clase | Tema | Guía |
|---|---|---|
| 3 | Primeros pasos: estructura del proyecto y App Router | [README-CLASE-03.md](README-CLASE-03.md) |
| 4 | Navegación avanzada: `<Link>`, `useRouter`, grupos de rutas y catch-all | [README-CLASE-04.md](README-CLASE-04.md) |

## Cómo correrlo en tu compu

Necesitás tener instalado **Node.js 20.9 o superior**. Podés ver qué versión tenés con `node -v`.

```bash
git clone https://github.com/RudeBoyS2/demo-nextjs.git
cd demo-nextjs
npm install     # solo la primera vez
npm run dev
```

Después abrí [http://localhost:3000](http://localhost:3000). En la página de inicio vas a encontrar una tabla con todas las rutas del proyecto: tocá cualquiera para ir directo.

## Cómo está organizado

En Next.js **las carpetas dentro de `app/` son las URLs**. Este mapa te muestra qué archivo genera cada página:

```
app/
├── layout.tsx                  → Layout raíz: la Navbar y el Footer de todas las páginas
├── page.tsx                    → /  (la página de inicio)
├── not-found.tsx               → 404 para cualquier URL que no existe
├── globals.css                 → Estilos globales (Tailwind v4)
│
├── products/
│   ├── layout.tsx              → Banner que comparten /products y /products/[id]
│   ├── page.tsx                → /products
│   ├── loading.tsx             → Pantalla de "Cargando productos..."
│   └── [id]/
│       ├── page.tsx            → /products/1, /products/2, ...
│       └── not-found.tsx       → 404 de productos (ej: /products/999)
├── cart/
│   └── page.tsx                → /cart
├── dashboard/
│   ├── layout.tsx              → Sidebar del dashboard (con un contador que no se reinicia)
│   ├── error.tsx               → Pantalla de error del dashboard
│   ├── page.tsx                → /dashboard
│   ├── analytics/page.tsx      → /dashboard/analytics
│   ├── settings/page.tsx       → /dashboard/settings
│   └── reports/page.tsx        → /dashboard/reports (tiene un botón que rompe todo a propósito)
├── api/
│   └── products/route.ts       → /api/products (devuelve JSON, no una página)
│
├── (auth)/                     → Grupo de rutas: los paréntesis NO aparecen en la URL
│   ├── layout.tsx              → Tarjeta centrada que comparten login y register
│   ├── login/page.tsx          → /login
│   └── register/page.tsx       → /register
├── catalogo/
│   ├── layout.tsx              → Menú de categorías + comparación <Link> vs <a>
│   └── [[...filtros]]/page.tsx → /catalogo, /catalogo/ropa, /catalogo/ropa/remeras, ...
└── shop/
    └── [...slug]/page.tsx      → /shop/ropa, /shop/ropa/remeras/verano, ...

components/   → Piezas reutilizables: Navbar, Footer, Sidebar, ProductCard, etc.
lib/          → products.ts: los datos de prueba y funciones para buscarlos y filtrarlos
public/       → Archivos estáticos. logo.svg se usa en la Navbar como "/logo.svg"
proxy.ts      → Se ejecuta antes de cada visita a /dashboard/* (mirá la terminal)
```

## Un tip para leer el código

Cada archivo arranca con un comentario que te cuenta **qué hace y qué URL genera**. Si en algún momento te perdés, volvé a leer ese comentario: es el mejor punto de partida.

> **Dato:** en [next.config.ts](next.config.ts) están desactivadas dos opciones que Next 16 trae prendidas por defecto (`cacheComponents` y `partialPrefetching`). Son temas de caché que vas a ver más adelante, así que por ahora las dejamos afuera para no mezclar conceptos.
