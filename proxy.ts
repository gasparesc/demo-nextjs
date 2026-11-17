// proxy.ts (antes se llamaba middleware.ts)
// Intercepta las solicitudes ANTES de que lleguen a una ruta.
// Un uso real: redirigir a /login si el usuario no inició sesión.
// En esta demo solo escribimos en la terminal cada vez que alguien entra al dashboard.

import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log(`[proxy] Alguien entró a: ${request.nextUrl.pathname}`);
  return NextResponse.next(); // dejamos pasar la solicitud sin cambios
}

// matcher: en qué rutas se ejecuta el proxy
export const config = {
  matcher: "/dashboard/:path*",
};
