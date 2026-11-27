# Leonida Store · Demo de Next.js

¡Hola! 👋 Esta es **Leonida Store**, una tienda online de ejemplo con temática **Vice City** (autos, motos, ropa y accesorios) para que aprendas Next.js con el **App Router** tocando código de verdad.

No tiene backend: los productos son datos de prueba que viven en un archivo. Así que podés romper, cambiar y probar todo lo que quieras sin miedo.

## Guías por clase

Cada clase tiene su propia guía con un recorrido paso a paso. Te dicen qué abrir en el navegador y qué archivo mirar en cada momento.

| Clase | Tema | Guía |
|---|---|---|
| 3 | Primeros pasos: estructura del proyecto y App Router | [README-CLASE-03.md](README-CLASE-03.md) |
| 4 | Navegación avanzada: `<Link>`, `useRouter`, grupos de rutas y catch-all | [README-CLASE-04.md](README-CLASE-04.md) |
| 5 | Estilos con Tailwind CSS: utility-first, responsive, `hover:`, `dark:` y clases condicionales | [README-CLASE-05.md](README-CLASE-05.md) |
| 6 | Efectos y fetching de APIs: `useEffect`, custom hooks, fetch en el servidor y caché | [README-CLASE-06.md](README-CLASE-06.md) |
| 7 | Formularios: controlados, no controlados, validación, Server Actions, `useActionState` y React Hook Form + Zod | [README-CLASE-07.md](README-CLASE-07.md) |

## Cómo correrlo en tu compu

Necesitás tener instalado **Node.js 20.9 o superior**. Podés ver qué versión tenés con `node -v`.

```bash
git clone https://github.com/gasparesc/demo-nextjs.git
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
├── estilos/
│   ├── [[...tab]]/page.tsx     → /estilos, /estilos/envios, ...  (laboratorio de Tailwind; la pestaña sale de la URL)
│   └── practica/page.tsx       → /estilos/practica  (el catálogo sin estilos, para practicar)
├── fetching/
│   ├── page.tsx                → /fetching  (laboratorio de useEffect, custom hooks y caché)
│   ├── error.tsx               → Pantalla de error si la API no responde
│   ├── practica/page.tsx       → /fetching/practica  (el catálogo con datos de mentira, para practicar)
│   └── productos/              → /fetching/productos y /fetching/productos/[id]  (el catálogo REAL, de la API)
├── formularios/
│   ├── page.tsx                → /formularios  (laboratorio de formularios y Server Actions)
│   ├── actions.ts              → Las Server Actions del laboratorio ("use server")
│   ├── practica/               → /formularios/practica  (el formulario que todavía no hace nada)
│   └── registro/               → /formularios/registro  (la práctica terminada)
├── catalogo/
│   ├── layout.tsx              → Menú de categorías + comparación <Link> vs <a>
│   └── [[...filtros]]/page.tsx → /catalogo, /catalogo/ropa, /catalogo/ropa/remeras, ...
└── shop/
    └── [...slug]/page.tsx      → /shop/ropa, /shop/ropa/remeras/verano, ...

components/   → Piezas reutilizables: Navbar, Footer, Sidebar, ProductCard, AddToCartButton, etc.
              components/estilos/, components/fetching/ y components/formularios/ tienen las demos de las clases 5, 6 y 7
hooks/        → useFetch.ts: nuestro primer custom hook (clase 6)
lib/          → products.ts: los datos de prueba y funciones para buscarlos y filtrarlos.
              fakestore.ts: los tipos de los productos de la FakeStore API (clase 6).
              usuarios.ts y schemas/registro.ts: la "base de datos" de mentira y el esquema de Zod (clase 7)
public/       → Archivos estáticos. logo.svg se usa en la Navbar como "/logo.svg".
              public/gta/ tiene las imágenes de los productos y la del inicio
proxy.ts      → Se ejecuta antes de cada visita a /dashboard/* (mirá la terminal)
```

## Un tip para leer el código

Cada archivo arranca con un comentario que te cuenta **qué hace y qué URL genera**. Si en algún momento te perdés, volvé a leer ese comentario: es el mejor punto de partida.

> **Dato:** en [next.config.ts](next.config.ts) están desactivadas dos opciones que Next 16 trae prendidas por defecto (`cacheComponents` y `partialPrefetching`). Son temas de caché que vas a ver más adelante, así que por ahora las dejamos afuera para no mezclar conceptos.
