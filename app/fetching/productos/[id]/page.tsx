// app/fetching/productos/[id]/page.tsx  →  URL: /fetching/productos/1, /fetching/productos/2, ...
//
// El detalle de UN producto, obtenido de la API con el id de la URL.
// Es la ruta dinámica de la clase 3, pero ahora en vez de buscar en un array
// le pedimos el producto a internet: fetch("https://fakestoreapi.com/products/" + id).
//
// Compará con la página de al lado: la de /fetching/productos trae los 20, esta trae uno solo.

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAKESTORE_URL, formatUsd, type FakeProduct } from "@/lib/fakestore";

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // en un Server Component, params es una Promise

  const res = await fetch(`${FAKESTORE_URL}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`La API respondió con error ${res.status}`);

  // ⚠️ Truco de esta API: si el producto no existe NO contesta 404, sino "200 OK" con el
  // cuerpo VACÍO. Si hiciéramos res.json() directo, se rompería. Por eso leemos el texto primero.
  const text = await res.text();
  if (!text) notFound(); // muestra el not-found.tsx más cercano

  const product: FakeProduct = JSON.parse(text);

  return (
    <div>
      <Link href="/fetching/productos" className="text-sm text-pink-700 hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-4 grid gap-8 rounded-2xl border border-zinc-200 bg-white p-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-white md:aspect-auto md:min-h-80">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-8"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase text-pink-600">{product.category}</span>
          <h1 className="mt-1 text-2xl font-bold">{product.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">
            ⭐ {product.rating.rate} ({product.rating.count} opiniones)
          </p>
          <p className="mt-4 text-zinc-600">{product.description}</p>
          <p className="mt-6 text-3xl font-bold">{formatUsd(product.price)}</p>

          <p className="mt-6 rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700">
            params.id = &quot;{id}&quot; → fetch(&quot;…/products/{id}&quot;)
          </p>
        </div>
      </div>
    </div>
  );
}
