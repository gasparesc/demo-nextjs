// app/products/[id]/not-found.tsx
//
// 404 específico para productos. Se muestra cuando la página llama a notFound(),
// por ejemplo al entrar a /products/999.

import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="mt-4 text-2xl font-bold">Producto no encontrado</h1>
      <p className="mt-2 text-zinc-600">
        No existe ningún producto con ese id.
      </p>
      <Link
        href="/products"
        className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white hover:bg-violet-700"
      >
        Ver todos los productos
      </Link>
    </div>
  );
}
