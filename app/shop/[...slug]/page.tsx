// app/shop/[...slug]/page.tsx
//
// CATCH-ALL (obligatorio): [...slug] atrapa uno o más segmentos después de /shop.
//
//   /shop               → 404  (¡no hay ningún segmento para atrapar!)
//   /shop/a             → params = { slug: ["a"] }
//   /shop/a/b/c         → params = { slug: ["a", "b", "c"] }
//
// Comparalo con /catalogo, que usa [[...filtros]] (optional catch-all) y SÍ funciona sin segmentos.
// Este es un Server Component: leemos params desde las props.

import Link from "next/link";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Catch-All: /shop/[...slug]</h1>
      <p className="mt-1 text-zinc-600">
        Server Component leyendo <code>params</code> desde las props.
      </p>

      <div className="mt-6 rounded-xl bg-zinc-900 p-4 text-sm text-emerald-300">
        <p className="mb-2 text-xs uppercase tracking-wide text-zinc-400">params</p>
        <pre>{JSON.stringify({ slug }, null, 2)}</pre>
      </div>

      <ul className="mt-6 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-sm">
        <li>
          <b>slug</b> es un Array: <code>Array.isArray(slug)</code> ={" "}
          <code>{String(Array.isArray(slug))}</code>
        </li>
        <li>
          Cantidad de segmentos: <code>slug.length</code> = <code>{slug.length}</code>
        </li>
        <li>
          Primer segmento: <code>slug[0]</code> = <code>&quot;{slug[0]}&quot;</code>
        </li>
        <li>
          {slug[0] === "ropa"
            ? "👕 slug[0] === \"ropa\" → acá filtraríamos solo ropa"
            : "Probá con /shop/ropa para ver el if(slug[0] === \"ropa\")"}
        </li>
      </ul>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {["/shop/ropa", "/shop/ropa/remeras", "/shop/ropa/remeras/verano", "/shop"].map(
          (href) => (
            <Link
              key={href}
              href={href}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 font-mono hover:border-violet-400"
            >
              {href}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
