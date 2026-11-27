// components/formularios/ActionStateDemo.tsx
//
// Next.js sin librerías (2/2): FEEDBACK con useActionState.
//
// useActionState (un hook de React, no de Next.js) conecta la Server Action con el formulario
// y nos devuelve 3 cosas, sin crear ningún useState extra:
//
//   const [state, formAction, isPending] = useActionState(registrarUsuario, initialState);
//
//   - state:      lo último que devolvió el servidor ({ error } o { success, message })
//   - formAction: la función que va en <form action={formAction}>
//   - isPending:  true mientras el servidor trabaja → "Enviando…" y botón deshabilitado
//                 (así nadie hace doble clic en "Registrar" o "Comprar")
//
// Como usa un hook, este componente lleva "use client". Pero ojo: la lógica importante
// (validar, guardar) sigue corriendo 100% en el servidor, en registrarUsuario.
//
// Es como el seguimiento de un envío: te muestra el último mensaje (state), te da el botón
// para despachar (formAction) y prende la luz de "En camino…" (isPending).

"use client";

import { useActionState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import { registrarUsuario, type RegistroState } from "@/app/formularios/actions";
import { buttonClass, inputClass, labelClass } from "@/components/formularios/styles";

const initialState: RegistroState = {};

export default function ActionStateDemo() {
  const [state, formAction, isPending] = useActionState(registrarUsuario, initialState);

  return (
    <div className="flex flex-col gap-6">
      {/* La línea principal, explicada */}
      <div className="rounded-xl bg-zinc-900 p-4 font-mono text-sm text-zinc-100">
        <p className="overflow-x-auto whitespace-nowrap">
          <span className="text-pink-400">const</span> [<span className="rounded bg-red-500/30 px-1 text-red-300">state</span>,{" "}
          <span className="rounded bg-sky-500/30 px-1 text-sky-300">formAction</span>,{" "}
          <span className="rounded bg-amber-500/30 px-1 text-amber-300">isPending</span>] ={" "}
          <span className="text-yellow-300">useActionState</span>(registrarUsuario, initialState);
        </p>
        <div className="mt-3 grid gap-2 font-sans text-xs sm:grid-cols-3">
          <p>
            <span className="font-bold text-red-300">state</span> → lo que devolvió el servidor. Lo mostramos en rojo o
            en verde.
          </p>
          <p>
            <span className="font-bold text-sky-300">formAction</span> → va en{" "}
            <code>&lt;form action={"{formAction}"}&gt;</code>.
          </p>
          <p>
            <span className="font-bold text-amber-300">isPending</span> → <code>true</code> mientras el servidor
            trabaja.
          </p>
        </div>
      </div>

      {/* Lo que le pasamos a useActionState: la acción y el estado inicial */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">
            1er argumento: <code className="text-pink-700">registrarUsuario</code>{" "}
            <span className="font-normal text-zinc-500">(la Server Action)</span>
          </p>
          <CodeBlock title="app/formularios/actions.ts (resumido)">{`"use server";

export async function registrarUsuario(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  await esperar(1000); // demora de mentira

  if (!email.includes("@")) {
    return { error: "Email inválido: le falta el @.", email };
  }
  if (password.length < 6) {
    return { error: "La contraseña es muy corta.", email };
  }
  if (await emailRegistrado(email)) {
    return { error: "Ese email ya está registrado.", email };
  }

  agregarUsuario({ nombre: email.split("@")[0], email });
  return {
    success: true,
    message: \`¡Listo! Registramos a \${email}.\`,
  };
}`}</CodeBlock>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">
            2do argumento: <code className="text-pink-700">initialState</code>{" "}
            <span className="font-normal text-zinc-500">(el estado del principio)</span>
          </p>
          <CodeBlock title="components/formularios/ActionStateDemo.tsx">{`// Todo lo que puede devolver registrarUsuario
type RegistroState = {
  error?: string;    // si algo salió mal
  success?: boolean; // si salió todo bien
  message?: string;  // el mensaje de éxito
  email?: string;    // lo que escribió el usuario
};

// Al principio, el servidor todavía no
// contestó nada: un objeto vacío
const initialState: RegistroState = {};`}</CodeBlock>
          <div className="rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">
            <p className="font-semibold">¿Cómo se conectan?</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              <li>
                Al cargar la página, <code>state</code> vale <code>initialState</code> (<code>{"{}"}</code>): no hay
                ningún mensaje.
              </li>
              <li>
                Al enviar, useActionState llama a <code>registrarUsuario(state, formData)</code>: el estado actual
                llega como <code>prevState</code>.
              </li>
              <li>
                Lo que la acción <strong>devuelve</strong> pasa a ser el nuevo <code>state</code>, y React vuelve a
                dibujar el formulario con el mensaje.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* El formulario terminado */}
        <form action={formAction} noValidate className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-5 shadow-sm">
          <p className="text-lg font-bold">Creá tu cuenta en Leonida Store</p>
          <div>
            <label htmlFor="as-email" className={labelClass}>
              Email
            </label>
            {/* defaultValue={state.email}: después de enviar, React limpia el formulario. Para no hacerte
                escribir todo de nuevo si hubo un error, el servidor nos devuelve el email que mandaste. */}
            <input
              id="as-email"
              name="email"
              type="email"
              defaultValue={state.email}
              placeholder="tommy@vicecity.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="as-password" className={labelClass}>
              Contraseña
            </label>
            {/* La contraseña NO la devolvemos: es un dato sensible, mejor que la vuelva a escribir */}
            <input id="as-password" name="password" type="password" className={inputClass} />
          </div>

          {/* state → el mensaje del servidor */}
          {state.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">🔴 {state.error}</p>
          )}
          {state.success && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              🟢 {state.message}
            </p>
          )}

          {/* isPending → deshabilita el botón y cambia el texto */}
          <button type="submit" disabled={isPending} className={`${buttonClass} w-full py-2.5`}>
            {isPending ? "⏳ Enviando…" : "Registrarme"}
          </button>
        </form>

        <div className="flex flex-col gap-3 text-sm">
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-amber-900">
            En este momento: <code>isPending = {String(isPending)}</code>
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-zinc-600">
            <li>
              Tocá <strong>Registrarme</strong>: durante 1 segundo el botón se apaga y dice «Enviando…» (en el servidor
              hay una demora de mentira para que se vea).
            </li>
            <li>Probá con errores: el mensaje rojo es el <code>state.error</code> que devolvió el servidor.</li>
            <li>
              Registrá un email nuevo: sale el mensaje verde. Ahora registralo <strong>otra vez</strong>: el servidor
              te avisa que ya existe (validación asíncrona, como en la sección 4).
            </li>
          </ol>

          <CodeBlock>{`{state.error && (
  <p className="text-red-600">{state.error}</p>
)}
{state.success && (
  <p className="text-green-600">{state.message}</p>
)}

<button disabled={isPending}>
  {isPending ? "Enviando…" : "Registrarme"}
</button>`}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
