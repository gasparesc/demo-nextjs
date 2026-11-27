// app/formularios/registro/RegistroForm.tsx
//
// PRÁCTICA TERMINADA (clase 7) · Pasos 3 y 4: el formulario conectado con useActionState.
//
// Lleva "use client" porque usa un hook. La validación de verdad está en actions.ts (servidor).

"use client";

import { useActionState } from "react";
import { registrarUsuario, type Estado } from "./actions";

const initialState: Estado = {};

export default function RegistroForm() {
  // Paso 3: una sola línea nos da el estado, la acción y el "¿está enviando?"
  const [state, formAction, isPending] = useActionState(registrarUsuario, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
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

      {/* Paso 4: el error en rojo y el éxito en verde */}
      {state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm font-medium text-green-600">{state.success}</p>}

      {/* Paso 4: el botón se deshabilita mientras el servidor trabaja */}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-pink-600 py-2.5 font-semibold text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isPending ? "Enviando…" : "Registrarme"}
      </button>
    </form>
  );
}
