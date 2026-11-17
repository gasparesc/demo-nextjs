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

  // Le dice a Turbopack (el compilador de Next) que procese los .css con Tailwind
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
