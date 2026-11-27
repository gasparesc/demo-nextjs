// lib/usuarios.ts
//
// Una "base de datos" de MENTIRA para la clase 7: una lista de usuarios guardada en la
// memoria del servidor. Todavía no tenemos base de datos de verdad, así que esto alcanza
// para practicar formularios.
//
// ⚠️ Como vive en memoria, se BORRA cada vez que reiniciás `npm run dev`.
//
// Solo se usa desde el servidor (desde las Server Actions y los Server Components).

export type Usuario = {
  nombre: string;
  email: string;
};

// Guardamos la lista en `globalThis` (un objeto global de Node.js) para que no se pierda
// cada vez que guardás un archivo y Next.js recarga el código. No hace falta que lo entiendas:
// pensalo como "la tabla de usuarios".
const db = globalThis as unknown as { usuarios?: Usuario[] };
db.usuarios ??= [
  { nombre: "Lucia", email: "lucia@vicecity.com" },
  { nombre: "Jason", email: "jason@vicecity.com" },
];

// Simula la demora de una base de datos real (que está en otra compu, del otro lado de internet)
export function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function listarUsuarios(): Usuario[] {
  return db.usuarios!;
}

// ¿Ya hay alguien registrado con este email? Es una consulta ASÍNCRONA: tarda un ratito.
export async function emailRegistrado(email: string): Promise<boolean> {
  await esperar(600);
  return db.usuarios!.some((u) => u.email === email.trim().toLowerCase());
}

export function agregarUsuario(usuario: Usuario) {
  db.usuarios!.push({ ...usuario, email: usuario.email.trim().toLowerCase() });
}
