// components/ProductCard.tsx
//
// Tarjeta reutilizable para mostrar un producto en el listado.
//
// Clase 5: esta es la versión TERMINADA de la práctica "Maquetando nuestro catálogo".
// El punto de partida (sin estilos) está en app/estilos/practica/page.tsx.
//   - Tarjeta: bg-white + shadow + rounded-xl.
//   - Interactividad: hover:shadow-lg y hover:-translate-y-1 (la tarjeta "se levanta").
//   - group / group-hover: cuando pasás el mouse por la TARJETA, cambia el color del TÍTULO.
//   - Badge de stock y botón con clases condicionales (stock === 0 → gris).

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const hasStock = product.stock > 0;

  return (
    <article className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* El link cubre la imagen y el título. El botón queda afuera:
          un <button> no puede ir adentro de un <a>. */}
      <Link href={`/products/${product.id}`} className="flex flex-col">
        {/* relative + overflow-hidden: contiene a la imagen (que usa "fill") y recorta las esquinas.
            aspect-4/3: todas las fotos tienen la misma proporción, aunque sean de distinto tamaño. */}
        <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-lg bg-zinc-100">
          <ProductImage product={product} />

          {/* Badge de stock: el color cambia según haya o no */}
          <span
            className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
              hasStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            }`}
          >
            {hasStock ? `Stock: ${product.stock}` : "Agotado"}
          </span>
        </div>
        <span className="text-xs font-medium uppercase text-pink-600">
          {product.category}
        </span>
        <h3 className="mt-1 font-semibold group-hover:text-pink-700">
          {product.name}
        </h3>
      </Link>

      <p className="mt-auto pt-3 text-lg font-bold">{formatPrice(product.price)}</p>

      <div className="mt-3">
        <AddToCartButton stock={product.stock} />
      </div>
    </article>
  );
}
