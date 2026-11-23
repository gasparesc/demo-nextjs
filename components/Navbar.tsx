// components/Navbar.tsx
//
// "use client" convierte a este componente en un Client Component.
// Lo necesitamos porque usamos usePathname(), un hook que solo funciona en el navegador,
// para saber en qué ruta estamos y resaltar el link activo.

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Productos" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/estilos", label: "Estilos" },
  { href: "/cart", label: "Carrito" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Ingresar" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Un link está activo si la URL actual es igual o "cuelga" de él
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          {/* La imagen está en la carpeta /public, por eso la ruta empieza con "/" */}
          <Image src="/logo.svg" alt="Logo de Leonida Store" width={32} height={32} />
          Leonida Store
        </Link>

        <ul className="flex flex-wrap gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-pink-100 text-pink-700"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
