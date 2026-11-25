// components/fetching/ServerFetchDemo.tsx
//
// La magia de Next.js: hacer el fetch EN EL SERVIDOR.
//
// Este componente es un Server Component (el comportamiento por defecto de Next.js), y por
// eso puede ser `async`. Fijate todo lo que NO necesitamos:
//   ❌ "use client"        ❌ useEffect        ❌ useState(loading)
//
// El servidor "pausa" el render con `await` hasta que los datos llegan. Cuando el HTML
// sale hacia el navegador, YA TIENE los productos adentro (lo que es excelente para SEO).
//
// Es como cocinar en el restaurante: cuando el plato sale a la mesa, ya tiene todos los
// ingredientes. El fetch en el cliente es pedir delivery y esperar en la puerta.

import CodeBlock from "@/components/estilos/CodeBlock";
import ApiError from "@/components/fetching/ApiError";
import FakeProductCard from "@/components/fetching/FakeProductCard";
import { FAKESTORE_URL, type FakeProduct } from "@/lib/fakestore";

export default async function ServerFetchDemo() {
  let products: FakeProduct[] | null = null;

  try {
    // ¡Acá está todo el fetching! Tres líneas, sin hooks:
    const res = await fetch(`${FAKESTORE_URL}/products?limit=4`);
    if (!res.ok) throw new Error(`La API respondió con error ${res.status}`);
    products = await res.json();
  } catch {
    // Si falla, products queda en null y mostramos el cartel de error más abajo
  }

  if (!products) return <ApiError />;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <FakeProductCard key={product.id} product={product} href={`/fetching/productos/${product.id}`} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CodeBlock title="Así se ve en una página (¡sin 'use client'!)">{`export default async function Page() {
  const url = "https://fakestoreapi.com/products?limit=4";
  const res = await fetch(url);
  const products = await res.json();

  return <ProductGrid products={products} />;
}`}</CodeBlock>

        <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
          <p className="font-semibold">Probalo vos mismo 🔎</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              Hacé clic derecho en la página → <strong>Ver código fuente</strong>.
            </li>
            <li>
              Buscá (<code>Ctrl+F</code>) <code>Fjallraven</code>, la mochila de acá arriba. ¡Está en el HTML!
              Llegó <strong>completa</strong> desde el servidor, sin esperar a ningún JavaScript.
            </li>
            <li>
              Ahora buscá alguna de las categorías rosas de la sección 4 (por ejemplo, la segunda de la lista).{" "}
              <strong>No está.</strong> Esas se piden con <code>useEffect</code>: recién aparecen en el navegador,
              después de que la página cargó. Un buscador como Google tampoco las vería.
            </li>
            {/* Ojo: acá no escribimos el nombre de la categoría a propósito. Si lo escribiéramos,
                aparecería en el HTML (¡en este mismo texto!) y la prueba no serviría. */}
          </ol>
          <p className="mt-3 text-xs text-zinc-500">
            Esta parte de la página se pidió y se armó en el servidor. Mientras esperaba la respuesta, Next.js
            ya te mandó el resto de la página (por eso viste un esqueleto gris un instante).
          </p>
        </div>
      </div>
    </div>
  );
}
