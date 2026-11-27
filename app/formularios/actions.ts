// app/formularios/actions.ts  →  las SERVER ACTIONS del laboratorio de formularios (clase 7)
//
// La directiva "use server" de la primera línea convierte a TODAS las funciones de este
// archivo en Server Actions: funciones que corren en el SERVIDOR, pero que podés llamar
// desde un formulario (o desde un Client Component) como si fueran funciones comunes.
//
// Next.js se encarga de todo el viaje: empaqueta los datos del formulario, los manda al
// servidor, ejecuta la función y trae la respuesta. Sin crear una ruta de API a mano.
//
// Es como un tubo neumático directo desde el botón del formulario hasta la oficina del servidor.
//
// ⚠️ Mirá la TERMINAL donde corre `npm run dev`: los console.log de acá aparecen ahí,
// no en la consola del navegador. Eso prueba que esto corre en el servidor.

"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { registroSchema, type RegistroInput } from "@/lib/schemas/registro";
import { agregarUsuario, emailRegistrado, esperar } from "@/lib/usuarios";

// ─── Sección 4 · Validación ASÍNCRONA ──────────────────────────────────────────────────
// ¿Este email ya está registrado? Para saberlo hay que preguntarle a la base de datos.
export async function verificarEmail(email: string) {
  const ocupado = await emailRegistrado(email);
  return { disponible: !ocupado };
}

// ─── Sección 5 · Una Server Action básica ──────────────────────────────────────────────
// Recibe AUTOMÁTICAMENTE un FormData con todos los inputs del formulario (los que tienen "name").
export async function crearUsuario(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "");
  const email = String(formData.get("email") ?? "");

  console.log("📨 Llegó un formulario al servidor:", { nombre, email });

  agregarUsuario({ nombre: nombre || "Sin nombre", email });

  // Le pedimos a Next.js que vuelva a dibujar la página, para que aparezca el usuario nuevo
  refresh();
}

// ─── Secciones 6 y 7 · Validar en el servidor y devolver un ESTADO ─────────────────────
//
// Lo que devuelve la acción. En vez de tirar un error (throw) que rompe la pantalla,
// devolvemos un objeto prolijo que el formulario puede mostrar.
export type RegistroState = {
  error?: string; // si algo está mal: qué hay que corregir
  success?: boolean; // si salió todo bien
  message?: string; // el mensaje para mostrar cuando salió bien
  email?: string; // lo que escribió el usuario, para no hacerle tipear todo de nuevo
};

// ¿Por qué recibe `prevState` primero? Porque la vamos a conectar con useActionState:
// ese hook le pasa a la acción el estado ANTERIOR, y después el FormData.
export async function registrarUsuario(
  prevState: RegistroState,
  formData: FormData,
): Promise<RegistroState> {
  // 1) Sacamos los datos del FormData (por el "name" de cada input)
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  console.log("📨 registrarUsuario recibió:", { email, password: "•".repeat(password.length) });

  // Demora de mentira de 1 segundo, para que se vea el "Enviando…"
  await esperar(1000);

  // 2) Validación SÍNCRONA, con JavaScript puro: reglas rápidas
  if (!email || !password) {
    return { error: "Completá el email y la contraseña.", email };
  }
  if (!email.includes("@")) {
    return { error: "Email inválido: le falta el @.", email };
  }
  if (password.length < 6) {
    return { error: "La contraseña tiene que tener al menos 6 caracteres.", email };
  }

  // 3) Validación ASÍNCRONA: le preguntamos a la "base de datos"
  if (await emailRegistrado(email)) {
    return { error: "Ese email ya está registrado. Probá con otro.", email };
  }

  // 4) ¡Todo bien! Guardamos y avisamos
  agregarUsuario({ nombre: email.split("@")[0], email });
  return { success: true, message: `¡Listo! Registramos a ${email}.` };
}

// ─── Sección 8 · La misma idea, con Zod ────────────────────────────────────────────────
// React Hook Form ya validó en el navegador, pero el navegador se puede manipular:
// en el servidor validamos OTRA VEZ, con el MISMO esquema.
export async function registrarConZod(data: RegistroInput) {
  await esperar(1000);

  const result = registroSchema.safeParse(data);
  if (!result.success) {
    // flattenError arma un objeto { email: ["..."], password: ["..."] }
    return { error: "Datos inválidos", fieldErrors: z.flattenError(result.error).fieldErrors };
  }

  if (await emailRegistrado(result.data.email)) {
    return { error: "Ese email ya está registrado. Probá con otro." };
  }

  agregarUsuario({ nombre: result.data.email.split("@")[0], email: result.data.email });
  return { success: true, message: `¡Listo! Registramos a ${result.data.email}.` };
}
