// components/Sidebar.tsx
//
// Menú lateral del dashboard. Es Client Component porque usa usePathname()
// para resaltar la sección activa.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ClickCounter from "./ClickCounter";

const items = [
  { href: "/dashboard", label: "Resumen", icon: "📊" },
  { href: "/dashboard/analytics", label: "Analíticas", icon: "📈" },
  { href: "/dashboard/settings", label: "Configuración", icon: "⚙️" },
  { href: "/dashboard/reports", label: "Reportes (error)", icon: "💥" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 rounded-xl border border-zinc-200 bg-white p-4 md:w-60">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        Panel de control
      </p>

      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-violet-600 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Contador para demostrar que el layout CONSERVA el estado al navegar */}
      <ClickCounter />
    </aside>
  );
}
