// app/fetching/practica/page.tsx  →  URL: /fetching/practica
//
// 🧩 PRÁCTICA EN VIVO (clase 6): ¡conectemos el catálogo a una API real!
//
// Abajo hay un catálogo con datos de MENTIRA (un array escrito a mano, como lo veníamos
// haciendo). La idea es reemplazarlo por los productos reales de la FakeStore API,
// siguiendo los pasos marcados con "PASO", EN ORDEN. Guardá después de cada uno y mirá
// el navegador: después de cada paso la página tiene que seguir funcionando.
//
// ¿Te trabaste? La versión terminada está en app/fetching/productos/page.tsx
// (y la podés ver funcionando en /fetching/productos).

import Link from "next/link";
import FakeProductCard from "@/components/fetching/FakeProductCard";
import type { FakeProduct } from "@/lib/fakestore";

// PASO 3 · Cuando la página ya muestre los 20 productos reales, borrá este array:
// ya no lo usa nadie. (Fijate que VS Code te lo marca: el nombre se ve más apagado.)
const mockProducts: FakeProduct[] = [
  {
    id: 1,
    title: "Producto de mentira",
    price: 19.99,
    description: "Un dato falso escrito a mano.",
    category: "mock",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: { rate: 4, count: 10 },
  },
];

// PASO 1 · Convertí este componente en ASÍNCRONO: escribí "async" antes de "function".
//          Así queda:  export default async function PracticaPage() {
//          (Solo un Server Component puede ser async. Este lo es: no tiene "use client".)
export default function PracticaPage() {
  // PASO 2 · Borrá la línea de abajo (const products = mockProducts;)
  //          y en su lugar pegá estas dos:
  //
  //   const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
  //   const products: FakeProduct[] = await res.json();
  //
  //   - await fetch(...)  → le pide los productos a la API y ESPERA la respuesta.
  //   - await res.json()  → convierte la respuesta (texto) en un array de JavaScript.
  //   - cache: "no-store" → que los pida de nuevo en cada visita (siempre actualizados).
  //
  // Guardá: ¡ahora ves 20 productos reales! El .map() de abajo no cambia nada,
  // porque sigue recorriendo "products". Lo único que cambió es DE DÓNDE vienen.
  const products = mockProducts;

  return (
    <div>
      {/* Este recuadro es solo una guía: lo de abajo es lo que vas a modificar */}
      <div className="mb-8 rounded-xl border border-dashed border-pink-400 bg-pink-50 p-4 text-sm text-pink-900">
        <p className="font-semibold">🧱 Punto de partida: un catálogo con datos de mentira</p>
        <p className="mt-1">
          Abrí <code>app/fetching/practica/page.tsx</code> y seguí los pasos de los comentarios, en orden.
          Cuando termines debería parecerse a{" "}
          <Link href="/fetching/productos" className="font-semibold underline">
            /fetching/productos
          </Link>
          , con los 20 productos reales.
        </p>
      </div>

      <h1 className="text-2xl font-bold">Catálogo</h1>
      <p className="mt-1 text-zinc-600">{products.length} producto(s)</p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          // PASO 4 · Hacé que cada tarjeta lleve a su detalle, agregándole esta prop:
          //   href={`/fetching/productos/${product.id}`}
          // La página de detalle ya existe (app/fetching/productos/[id]/page.tsx): abrila
          // después y fijate cómo usa params.id para pedirle UN solo producto a la API.
          <FakeProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
