// app/formularios/registro/actions.ts
//
// PRÁCTICA TERMINADA (clase 7) · Paso 1 y 2: la Server Action que valida en el servidor.
//
// "use server" → esta función corre en el servidor. La conectamos al formulario con
// useActionState (en RegistroForm.tsx), por eso recibe primero `prevState` y después `formData`.

"use server";

// Lo que le devolvemos al formulario: un error para mostrar en rojo, o un éxito en verde
export type Estado = {
  error?: string;
  success?: string;
};

export async function registrarUsuario(prevState: Estado, formData: FormData): Promise<Estado> {
  // Paso 5 (bonus): demora de 1 segundo para ver el "Enviando…" en vivo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Sacamos los datos por el "name" de cada input. String(... ?? "") por si viniera vacío (null).
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  // Paso 2: validamos. Si algo está mal, DEVOLVEMOS el error (no hacemos throw)
  if (!email.includes("@")) {
    return { error: "El email tiene que tener un @." };
  }
  if (password.length < 6) {
    return { error: "La contraseña tiene que tener al menos 6 caracteres." };
  }

  // Acá guardaríamos el usuario en la base de datos
  return { success: `¡Listo! ${email} quedó registrado.` };
}
