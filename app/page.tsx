// app/page.tsx  →  URL: /
//
// Un page.tsx es lo que convierte a una carpeta en una página que podés visitar.
// Como este está directo en app/, es la página de inicio.
//
// Abajo vas a ver dos tablas con todas las rutas del proyecto: tocá cualquiera para ir.

import Link from "next/link";

// Rutas de la clase 3: estructura del proyecto y App Router
const routesClass3 = [
  { file: "app/page.tsx", url: "/", note: "Esta página" },
  {
    file: "app/products/page.tsx",
    url: "/products",
    note: "Listado + loading.tsx",
  },
  {
    file: "app/products/[id]/page.tsx",
    url: "/products/1",
    note: "Ruta dinámica",
  },
  { file: "app/cart/page.tsx", url: "/cart", note: "Carrito" },
  {
    file: "app/dashboard/page.tsx",
    url: "/dashboard",
    note: "Layout con sidebar",
  },
  {
    file: "app/dashboard/settings/page.tsx",
    url: "/dashboard/settings",
    note: "Ruta anidada",
  },
  {
    file: "app/dashboard/reports/page.tsx",
    url: "/dashboard/reports",
    note: "Botón que dispara error.tsx",
  },
  {
    file: "app/api/products/route.ts",
    url: "/api/products",
    note: "Endpoint de API (JSON)",
  },
  { file: "(no existe)", url: "/no-existe", note: "Muestra not-found.tsx" },
];

// Rutas de la clase 4: navegación avanzada y catch-all
const routesClass4 = [
  {
    file: "app/catalogo/[[...filtros]]/page.tsx",
    url: "/catalogo",
    note: "Optional catch-all (raíz sin filtros)",
  },
  {
    file: "app/catalogo/[[...filtros]]/page.tsx",
    url: "/catalogo/ropa/remeras",
    note: "Mismo archivo, 2 filtros + useParams()",
  },
  {
    file: "app/shop/[...slug]/page.tsx",
    url: "/shop/ropa/remeras/verano",
    note: "Catch-all leído en el servidor",
  },
  {
    file: "app/shop/[...slug]/page.tsx",
    url: "/shop",
    note: "404: el catch-all necesita 1 segmento",
  },
  {
    file: "app/(auth)/login/page.tsx",
    url: "/login",
    note: "Grupo de rutas + useRouter()",
  },
  {
    file: "app/(auth)/register/page.tsx",
    url: "/register",
    note: "Comparte el layout de (auth)",
  },
  {
    file: "app/products/[id]/page.tsx",
    url: "/products/4",
    note: "params (server) vs useParams() (client)",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <section className="rounded-2xl bg-violet-600 px-6 py-12 text-white sm:px-10">
        <p className="text-sm font-medium uppercase tracking-wide text-violet-200">
          Bootcamp 5.0 · Next.js
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Te damos la bienvenida a DevStore 🛍️
        </h1>
        <p className="mt-3 max-w-xl text-violet-100">
          Una tienda de ejemplo para entender cómo Next.js arma las rutas a
          partir de las carpetas dentro de <code>app/</code>.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 font-semibold text-violet-700 hover:bg-violet-50"
        >
          Ver productos →
        </Link>
      </section>

      {/* Tablas carpeta → URL */}
      <RoutesTable
        title="Clase 3 · Carpetas → URL"
        subtitle="Cada carpeta es un segmento de la URL. Hacé clic para navegar."
        rows={routesClass3}
      />
      <RoutesTable
        title="Clase 4 · Navegación avanzada y Catch-All"
        subtitle="Grupos de rutas, useRouter(), useParams() y segmentos catch-all."
        rows={routesClass4}
      />
    </div>
  );
}

// Tabla reutilizable: archivo → URL → qué muestra
function RoutesTable({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: { file: string; url: string; note: string }[];
}) {
  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-1 text-zinc-600">{subtitle}</p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-100 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Archivo</th>
              <th className="px-4 py-3 font-medium">URL</th>
              <th className="px-4 py-3 font-medium">Qué muestra</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((route) => (
              <tr key={route.url} className="border-t border-zinc-100">
                <td className="px-4 py-3 font-mono text-xs text-zinc-700">
                  {route.file}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={route.url}
                    className="font-mono text-violet-700 hover:underline"
                  >
                    {route.url}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-600">{route.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
