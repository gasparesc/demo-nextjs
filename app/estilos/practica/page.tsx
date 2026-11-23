// app/estilos/practica/page.tsx  →  URL: /estilos/practica
//
// 🧩 PRÁCTICA EN VIVO (clase 5): maquetando nuestro catálogo.
//
// Abajo está la lista de productos SIN NINGÚN estilo. La idea es ir sumándole
// clases de Tailwind siguiendo los 4 pasos marcados con "PASO".
// Guardá el archivo después de cada paso y mirá el navegador: el cambio es instantáneo.
//
// ¿Te trabaste? La versión terminada está en components/ProductCard.tsx
// (y la podés ver funcionando en /products).

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProducts } from "@/lib/products";

export default function PracticaPage() {
  const products = getProducts();

  return (
    <div>
      {/* Este recuadro es solo una guía: lo de abajo es lo que vas a estilizar */}
      <div className="mb-8 rounded-xl border border-dashed border-cyan-400 bg-cyan-50 p-4 text-sm text-cyan-900">
        <p className="font-semibold">🧱 Punto de partida: una lista cruda, sin estilos</p>
        <p className="mt-1">
          Abrí <code>app/estilos/practica/page.tsx</code> y seguí los pasos de los
          comentarios. Cuando termines debería parecerse a{" "}
          <Link href="/products" className="font-semibold underline">
            /products
          </Link>
          .
        </p>
      </div>

      {/* ⬇️⬇️⬇️ DE ACÁ PARA ABAJO, A ESTILIZAR ⬇️⬇️⬇️ */}

      <h1>Catálogo</h1>

      {/* PASO 1 · Grilla responsive
          Agregale a este div: className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          Después achicá la ventana: 1 columna en el celular, 2 en tablet, 3 en monitor. */}
      <div>
        {products.map((product) => (
          // PASO 2 · La tarjeta
          // Agregale: className="flex flex-col rounded-xl bg-white p-5 shadow-lg"
          // Bonus: "transition hover:-translate-y-1" para que se levante con el mouse.
          <div key={product.id}>
            {/* Imagen sin estilos: width/height son obligatorios en <Image> cuando no usás "fill" */}
            <Image src={product.image} alt={product.name} width={200} height={150} style={{ objectFit: "cover" }} />
            <h3>{product.name}</h3>
            <p>{formatPrice(product.price)}</p>
            <p>Stock: {product.stock}</p>

            {/* PASO 3 · Botón interactivo
                Agregale: className="rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 active:scale-95"

                PASO 4 · Sin stock → botón gris e inactivo
                Cambiá las comillas por comillas invertidas y agregá un ternario:
                className={`rounded-lg px-4 py-2 text-white ${
                  product.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700 active:scale-95"
                }`}
                y sumale disabled={product.stock === 0} para que no se pueda tocar. */}
            <button>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}
