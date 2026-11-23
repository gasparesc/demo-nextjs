// app/products/page.tsx  →  URL: /products
//
// Es un Server Component asíncrono: se ejecuta en el servidor.
// Simulamos una demora de 1,5 segundos (como si pidiéramos los datos a una API)
// para poder ver en acción el archivo loading.tsx.

import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  // Demora artificial para ver el loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const products = getProducts();

  return (
    <div>
      <h1 className="text-2xl font-bold">Productos</h1>
      <p className="mt-1 text-zinc-600">
        {products.length} productos disponibles. Elegí uno para ver el detalle.
      </p>

      {/* Grilla responsive (clase 5), pensada mobile-first:
          celular → 1 columna (grid-cols-1, sin prefijo)
          md: (tablet) → 2 columnas · lg: (monitor) → 3 columnas */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
