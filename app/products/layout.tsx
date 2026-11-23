// app/products/layout.tsx
//
// Layout ANIDADO: envuelve a /products y a /products/[id].
// Queda así:  <RootLayout> → <ProductsLayout> → <Page />

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 rounded-xl border border-dashed border-pink-300 bg-pink-50 px-4 py-3 text-sm text-pink-800">
        🛒 Envíos gratis en compras mayores a $50.000 · (este banner viene de{" "}
        <code>app/products/layout.tsx</code>)
      </div>
      {children}
    </section>
  );
}
