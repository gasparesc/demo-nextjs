// components/CatalogSidebar.tsx
//
// Menú de categorías del catálogo. Es navegación "pasiva" (el usuario elige a dónde ir),
// así que usamos <Link>, no useRouter().

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/products";

export default function CatalogSidebar() {
  const pathname = usePathname();
  const categories = getCategories();

  const linkClass = (href: string) =>
    `block rounded-md px-3 py-1.5 text-sm transition-colors ${
      pathname === href ? "bg-violet-600 text-white" : "text-zinc-700 hover:bg-zinc-100"
    }`;

  return (
    <aside className="w-full shrink-0 rounded-xl border border-zinc-200 bg-white p-4 md:w-56">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        Categorías
      </p>

      <Link href="/catalogo" className={linkClass("/catalogo")}>
        Todo el catálogo
      </Link>

      <ul className="mt-2 flex flex-col gap-2">
        {categories.map((category) => (
          <li key={category.slug}>
            {/* Categoría: /catalogo/ropa */}
            <Link
              href={`/catalogo/${category.slug}`}
              className={`${linkClass(`/catalogo/${category.slug}`)} font-semibold`}
            >
              {category.name}
            </Link>

            {/* Subcategorías: /catalogo/ropa/remeras */}
            <ul className="ml-3 border-l border-zinc-200 pl-2">
              {category.subcategories.map((sub) => (
                <li key={sub}>
                  <Link
                    href={`/catalogo/${category.slug}/${sub}`}
                    className={linkClass(`/catalogo/${category.slug}/${sub}`)}
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
