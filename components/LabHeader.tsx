// components/LabHeader.tsx
//
// Encabezado de los "laboratorios" (/estilos, /fetching): una portada con la imagen de
// fondo, un título, una descripción y un índice para saltar a cada sección.
// Lo usan las dos páginas, así no repetimos el mismo bloque de código.

import Image from "next/image";

export default function LabHeader({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string; // el textito chico de arriba (ej: "Clase 5 · Tailwind CSS")
  title: string;
  description: string;
  items: string[]; // las secciones del índice: salta a #seccion-1, #seccion-2...
}) {
  return (
    // Encabezado con imagen de fondo y un poquito de desenfoque (blur):
    //  - relative + overflow-hidden: contiene a la imagen y recorta lo que se sale.
    //  - La imagen usa "fill" (-z-20) con blur-sm y scale-105: el zoom tapa los bordes
    //    que el desenfoque deja transparentes.
    //  - Una capa oscura (-z-10) encima hace que el texto blanco se lea bien.
    <header className="relative isolate overflow-hidden rounded-2xl px-6 py-12 text-white sm:px-10 sm:py-16">
      <Image
        src="/gta/hero-gta6.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="-z-20 scale-105 object-cover object-[75%_center] blur-sm md:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/45" />

      <p className="text-sm font-medium uppercase tracking-wide text-pink-200">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-white/90">{description}</p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {items.map((label, i) => (
          <a
            key={label}
            href={`#seccion-${i + 1}`}
            className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm hover:bg-white/35"
          >
            {i + 1}. {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
