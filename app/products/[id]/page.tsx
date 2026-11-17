// app/products/[id]/page.tsx  →  URL: /products/1, /products/2, ...
//
// Los corchetes [id] crean un SEGMENTO DINÁMICO: una sola página
// sirve para todos los productos. El valor de la URL llega en `params`.
// En un Server Component, Next.js nos pasa `params` como PROP (es una Promise, por eso el await).

import Link from "next/link";
import { notFound } from "next/navigation";
import ParamsClientViewer from "@/components/ParamsClientViewer";
import { formatPrice, getProductById } from "@/lib/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  // Si el producto no existe, mostramos el not-found.tsx más cercano
  if (!product) {
    notFound();
  }

  return (
    <div>
      <Link href="/products" className="text-sm text-violet-700 hover:underline">
        ← Volver a productos
      </Link>

      <div className="mt-4 grid gap-8 rounded-2xl border border-zinc-200 bg-white p-6 md:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-xl bg-zinc-100 text-8xl">
          {product.emoji}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase text-violet-600">
            {product.category}
          </span>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <p className="mt-3 text-zinc-600">{product.description}</p>
          <p className="mt-6 text-3xl font-bold">{formatPrice(product.price)}</p>

          <Link
            href="/cart"
            className="mt-6 rounded-lg bg-violet-600 px-5 py-3 text-center font-semibold text-white hover:bg-violet-700"
          >
            Agregar al carrito
          </Link>

          {/* Clase 4: la misma URL leída de dos formas distintas */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700">
              <p className="mb-1 font-sans font-semibold">
                Server Component · params (prop)
              </p>
              <p>
                params.id = &quot;{id}&quot; ({typeof id})
              </p>
            </div>
            <ParamsClientViewer />
          </div>
        </div>
      </div>
    </div>
  );
}
