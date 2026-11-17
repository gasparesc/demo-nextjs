// app/dashboard/page.tsx  →  URL: /dashboard

import { getProducts } from "@/lib/products";

export default function DashboardPage() {
  const products = getProducts();

  const stats = [
    { label: "Productos", value: products.length },
    { label: "Ventas del mes", value: 128 },
    { label: "Clientes", value: 64 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Resumen</h1>
      <p className="mt-1 text-zinc-600">
        Bienvenido al panel de administración de DevStore.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-zinc-100 p-4">
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
