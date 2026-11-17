// app/api/products/route.ts  →  URL: /api/products
//
// Un route.ts NO muestra una página: crea un ENDPOINT DE API que corre en el servidor.
// Entrá a /api/products y vas a ver JSON en lugar de una pantalla.
//
// El nombre de la función es el método HTTP que atiende: GET, POST, PUT, DELETE...

import { getProducts } from "@/lib/products";

export function GET() {
  return Response.json(getProducts());
}
