// app/fetching/productos/page.tsx  →  URL: /fetching/productos
//
// La versión TERMINADA de la práctica de la clase 6: el catálogo con productos REALES.
//
//   1. Es un Server Component asíncrono (sin "use client", sin useEffect, sin useState).
//   2. Hace await fetch(...) con { cache: "no-store" }: pide los datos en CADA visita.
//   3. Convierte la respuesta a JSON con res.json().
//   4. Usa .map() (clase 2) para dibujar una tarjeta por producto.
//
// ¿Y mientras espera? Next.js muestra loading.tsx (la carpeta de al lado).
// ¿Y si falla? Se muestra error.tsx (en app/fetching/).

import FakeProductCard from "@/components/fetching/FakeProductCard";
import { FAKESTORE_URL, type FakeProduct } from "@/lib/fakestore";

export default async function ProductosPage() {
  const res = await fetch(`${FAKESTORE_URL}/products`, { cache: "no-store" });

  // fetch no falla solo si la API contesta con error: lo revisamos nosotros.
  // Al tirar el error, Next.js muestra error.tsx.
  if (!res.ok) throw new Error(`La API respondió con error ${res.status}`);

  const products: FakeProduct[] = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold">Catálogo real 🛍️</h1>
      <p className="mt-1 text-zinc-600">
        {products.length} productos que vienen de <code>fakestoreapi.com</code>, no de un array.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <FakeProductCard key={product.id} product={product} href={`/fetching/productos/${product.id}`} />
        ))}
      </div>
    </div>
  );
}
