// app/formularios/practica/RegistroForm.tsx
//
// 🧩 PRÁCTICA EN VIVO (clase 7): un formulario completo, sin librerías.
//
// Este formulario ya tiene los estilos, los <label> y los "name", pero todavía no hace nada:
// si tocás "Registrarme", la página se recarga (¿te acordás por qué? → sección 2 del laboratorio).
// Seguí los PASOS en orden. La guía completa, con todo el código, está en README-CLASE-07.md.
//
// ¿Te trabaste? La versión terminada está en app/formularios/registro/ (y anda en /formularios/registro).

// Ya tiene "use client" porque en el PASO 3 vamos a usar un hook (useActionState)
"use client";

// PASO 1 y 2 · Creá un archivo nuevo AL LADO de este: app/formularios/practica/actions.ts
//   - Arriba de todo: "use server";
//   - Adentro: export async function registrarUsuario(prevState, formData) { ... }
//   - Que valide que el email tenga @ y la contraseña al menos 6 caracteres,
//     y que DEVUELVA { error: "..." } o { success: "..." }.
//   (El código completo está en README-CLASE-07.md. No te saltees el "type Estado" que
//    tiene arriba: sin él, TypeScript se queja en el PASO 3.)
//
// PASO 3 · Conectá la acción con este formulario:
//   a) Importá el hook y la acción, acá arriba:
//        import { useActionState } from "react";
//        import { registrarUsuario } from "./actions";
//   b) Adentro de la función, antes del return:
//        const [state, formAction, isPending] = useActionState(registrarUsuario, {});
//      ({} es el estado inicial: al principio el servidor todavía no dijo nada)
//   c) En el <form>, agregá:  action={formAction}

export default function RegistroForm() {
  return (
    <form className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="tommy@vicecity.com"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200"
        />
      </div>

      {/* PASO 4 · Mostrá la respuesta del servidor acá:
            {state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
            {state?.success && <p className="text-sm font-medium text-green-600">{state.success}</p>} */}

      {/* PASO 4 · Y en el botón: agregale disabled={isPending}
          y cambiá el texto por: {isPending ? "Enviando…" : "Registrarme"} */}
      <button
        type="submit"
        className="rounded-lg bg-pink-600 py-2.5 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Registrarme
      </button>
    </form>
  );
}

// PASO 5 (bonus) · En actions.ts, como primera línea de registrarUsuario, agregá:
//   await new Promise((resolve) => setTimeout(resolve, 1000));
// Es una demora de mentira de 1 segundo: vas a ver el botón en «Enviando…» y apagado.
