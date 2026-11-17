// components/ProductCard.tsx
//
// Tarjeta reutilizable para mostrar un producto en el listado.

import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-zinc-100 text-5xl">
        {product.emoji}
      </div>
      <span className="text-xs font-medium uppercase text-violet-600">
        {product.category}
      </span>
      <h3 className="mt-1 font-semibold group-hover:text-violet-700">
        {product.name}
      </h3>
      <p className="mt-auto pt-3 text-lg font-bold">
        {formatPrice(product.price)}
      </p>
    </Link>
  );
}
