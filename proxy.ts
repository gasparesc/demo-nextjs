// proxy.ts  (en versiones anteriores de Next.js se llamaba middleware.ts)
//
// Intercepta cada visita ANTES de que llegue a la página.
// Un uso real: mandar a /login a quien no inició sesión.
//
// Acá solo escribimos un mensaje en la terminal cada vez que alguien entra al dashboard.
// Probalo: navegá por /dashboard y mirá la terminal donde corre `npm run dev`.

import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log(`[proxy] Alguien entró a: ${request.nextUrl.pathname}`);
  return NextResponse.next(); // dejamos pasar la solicitud sin cambios
}

// matcher: en qué rutas se ejecuta el proxy
export const config = {
  matcher: "/dashboard/:path*",
};
