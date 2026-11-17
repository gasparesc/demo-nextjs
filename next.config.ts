// next.config.ts
// Configuración propia de Next.js: compilación, imágenes, redirecciones, etc.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // create-next-app activa por defecto "cacheComponents" y "partialPrefetching".
  // Los desactivamos en esta demo para simplificar: son temas de caché que
  // vamos a ver en clases más adelante.
  cacheComponents: false,
  partialPrefetching: false,

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
