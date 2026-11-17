# Demo NextJS · DevStore

Demo de las clases de Next.js del Bootcamp 5.0. Es una tienda online simple, sin backend.

| Clase | Tema | Guía |
|---|---|---|
| 3 | Primeros pasos con Next.js: estructura y App Router | este archivo (abajo) |
| 4 | Navegación avanzada: `<Link>`, `useRouter`, grupos de rutas y catch-all | [README-CLASE-04.md](README-CLASE-04.md) |

## Cómo correrlo

```bash
npm install   # solo la primera vez
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura

```
app/
├── layout.tsx              → Layout raíz (Navbar + Footer)          
├── page.tsx                → /
├── not-found.tsx           → 404 global (ej: /no-existe)
├── globals.css             → Estilos globales (Tailwind v4)
├── products/
│   ├── layout.tsx          → Banner compartido por /products y /products/[id]
│   ├── page.tsx            → /products
│   ├── loading.tsx         → "Cargando productos..."
│   └── [id]/
│       ├── page.tsx        → /products/1, /products/2, ...
│       └── not-found.tsx   → /products/999
├── cart/
│   └── page.tsx            → /cart
├── dashboard/
│   ├── layout.tsx          → Sidebar (con un contador que conserva el estado)
│   ├── error.tsx           → UI de error del dashboard
│   ├── page.tsx            → /dashboard
│   ├── analytics/page.tsx  → /dashboard/analytics
│   ├── settings/page.tsx   → /dashboard/settings
│   └── reports/page.tsx    → /dashboard/reports (botón que provoca un error)
└── api/
    └── products/route.ts   → /api/products (devuelve JSON)

components/   → Navbar, Footer, Sidebar, ProductCard, ClickCounter
lib/          → products.ts (datos de ejemplo)
public/       → logo.svg (se usa en la Navbar como "/logo.svg")
proxy.ts      → Se ejecuta antes de cada request a /dashboard/* (ver la terminal)
```

## Guion sugerido para la demo

1. **Estructura del proyecto**: recorrer `app/`, `public/`, `package.json`, `next.config.ts`, `proxy.ts`, `tsconfig.json`, `globals.css`.
2. **page.tsx**: abrir `/` y mostrar que `app/page.tsx` es la página de inicio.
3. **Segmentos y rutas anidadas**: ir a `/dashboard/settings` y mostrar las carpetas `dashboard/settings/`.
4. **Layout raíz**: la Navbar y el Footer aparecen en todas las páginas porque están en `app/layout.tsx`.
5. **Layouts anidados**: el banner violeta solo aparece en `/products/*`; el Sidebar solo en `/dashboard/*`.
6. **El layout conserva el estado**: en el dashboard, sumar clics en el contador y cambiar de sección. El número no se reinicia.
7. **loading.tsx**: entrar a `/products` (tarda 1,5 s a propósito).
8. **Ruta dinámica `[id]`**: `/products/1`, `/products/4`, y `/products/999` para el `not-found.tsx`.
9. **error.tsx**: `/dashboard/reports` → tocar el botón. El sidebar sigue andando; "Intentar de nuevo" lo recupera.
10. **not-found.tsx global**: `/cualquier-cosa`.
11. **route.ts**: abrir `/api/products` y ver el JSON.
12. **proxy.ts**: mirar la terminal al navegar por el dashboard.
13. **"use client"**: comparar `Navbar.tsx` (usa `usePathname`) con `Footer.tsx` (Server Component).

### Ejercicio en vivo

Pedirle a la clase que cree `/about`: carpeta `app/about/` + `page.tsx`, y agregar el link en `components/Navbar.tsx`.
Para mostrar el error de la pregunta 7 del repaso: crear `app/about/about.tsx` en vez de `page.tsx` → da 404.

> Nota: en `next.config.ts` se desactivaron `cacheComponents` y `partialPrefetching`
> (vienen activados por defecto en Next 16) para no meter temas de caché en esta clase.
