// next.config.ts
//
// La configuración de Next.js: cómo compila, imágenes, redirecciones, etc.
// En la mayoría de los proyectos casi no vas a tocar este archivo.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 trae prendidas por defecto "cacheComponents" y "partialPrefetching".
  // Acá las apagamos para simplificar: son temas de caché que vas a ver más adelante.
  cacheComponents: false,
  partialPrefetching: false,

  // Las imágenes que vienen de OTRO sitio (como las de la FakeStore API, clase 6) hay que
  // autorizarlas acá. Es una medida de seguridad: así nadie puede usar tu servidor de Next.js
  // para optimizar imágenes de cualquier página. Si te falta, <Image> tira un error que dice
  // "hostname is not configured under images".
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com", pathname: "/img/**" },
    ],
  },

  // Le dice a Turbopack (el compilador de Next) que procese los .css con Tailwind
  turbopack: {
    rules: {
      "*.css": {
        // Los archivos .module.css (CSS Modules) se excluyen: Next.js los procesa solo,
        // y si Tailwind también los tocara, las clases perderían su nombre único
        // (styles["btn-primary--active"] daría undefined y el botón quedaría sin estilos).
        condition: { not: { path: "*.module.css" } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
