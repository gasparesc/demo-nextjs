// app/api/products/route.ts  →  URL: /api/products
// route.ts NO muestra una página: crea un ENDPOINT DE API del lado del servidor.
// Al entrar a /api/products el navegador recibe JSON en lugar de HTML.

import { getProducts } from "@/lib/products";

export function GET() {
  return Response.json(getProducts());
}
