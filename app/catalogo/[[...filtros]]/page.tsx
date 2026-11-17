// app/catalogo/[[...filtros]]/page.tsx  →  URL: /catalogo y todo lo que venga después
//
// OPTIONAL CATCH-ALL: el doble corchete [[...filtros]] atrapa TODAS estas URLs:
//
//   /catalogo                        → params = {}                                  (¡la raíz también!)
//   /catalogo/ropa                   → params = { filtros: ["ropa"] }
//   /catalogo/ropa/remeras           → params = { filtros: ["ropa", "remeras"] }
//   /catalogo/ropa/remeras/verano    → params = { filtros: ["ropa", "remeras", "verano"] }
//
// Si la carpeta se llamara [...filtros] (un solo corchete), /catalogo a secas daría 404.
// ¿No te convence? Renombrá la carpeta y probalo.
//
// Es un Client Component, así que leemos los parámetros con el hook useParams().

"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";
import { filterProducts, getCategories } from "@/lib/products";

export default function CatalogPage() {
  const params = useParams<{ filtros?: string[] }>();
  const router = useRouter();

  // filtros es un ARRAY de strings (o undefined si estamos en /catalogo)
  const filtros = params.filtros ?? [];
  const [categoria, subcategoria, ...extras] = filtros;

  const products = filterProducts(categoria, subcategoria);
  const categoryName = getCategories().find((c) => c.slug === categoria)?.name ?? categoria;

  return (
    <div>
      <div className="flex items-center gap-4">
        <BackButton />
        {filtros.length > 0 && (
          // Navegación "activa" desde código con useRouter
          <button
            onClick={() => router.push("/catalogo")}
            className="text-sm text-violet-700 hover:underline"
          >
            Limpiar filtros (router.push)
          </button>
        )}
      </div>

      {/* Título condicional según cuántos segmentos trae la URL */}
      <h1 className="mt-3 text-2xl font-bold">
        {categoria ? `Mostrando Categoría: ${categoryName}` : "Catálogo completo"}
      </h1>
      {subcategoria && (
        <p className="mt-1 text-lg text-zinc-600">Subcategoría: {subcategoria}</p>
      )}
      {extras.length > 0 && (
        <p className="mt-1 text-sm text-amber-700">
          Filtros extra (no usados): {extras.join(", ")}
        </p>
      )}

      {/* Migas de pan armadas a partir del array */}
      <nav className="mt-3 flex flex-wrap items-center gap-1 text-sm text-zinc-500">
        <Link href="/catalogo" className="hover:text-violet-700">
          catalogo
        </Link>
        {filtros.map((filtro, i) => (
          <span key={i} className="flex items-center gap-1">
            /
            <Link
              href={`/catalogo/${filtros.slice(0, i + 1).join("/")}`}
              className="hover:text-violet-700"
            >
              {filtro}
            </Link>
          </span>
        ))}
      </nav>

      {/* El objeto params tal cual llega. Agregale segmentos a la URL y mirá cómo crece el array */}
      <div className="mt-4 rounded-xl bg-zinc-900 p-4 text-sm text-emerald-300">
        <p className="mb-2 font-sans text-xs uppercase tracking-wide text-zinc-400">
          useParams()
        </p>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </div>

      {/* Productos filtrados */}
      {products.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 text-center text-zinc-500">
          No hay productos para estos filtros.
        </p>
      )}
    </div>
  );
}
