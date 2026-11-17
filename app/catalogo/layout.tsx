// app/catalogo/layout.tsx
//
// Layout del catálogo: menú de categorías + demo de <Link> vs <a>.
// Envuelve a todas las URLs que atrapa [[...filtros]]: /catalogo, /catalogo/ropa, /catalogo/ropa/remeras...

import CatalogSidebar from "@/components/CatalogSidebar";
import LinkVsAnchor from "@/components/LinkVsAnchor";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <LinkVsAnchor />
      <div className="flex flex-col gap-6 md:flex-row">
        <CatalogSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}
