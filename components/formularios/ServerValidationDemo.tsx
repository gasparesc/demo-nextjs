// components/formularios/ServerValidationDemo.tsx
//
// Next.js sin librerías (1/2): VALIDAR EN LA SERVER ACTION.
//
// La acción registrarUsuario (en app/formularios/actions.ts) revisa los datos con JavaScript
// puro, con if. Y en vez de tirar un error (throw) que rompe la pantalla, DEVUELVE un objeto:
//   { error: "..." }                         → si algo está mal
//   { success: true, message: "¡Listo!" }   → si salió todo bien
//
// Acá mostramos ese objeto TAL CUAL llega del servidor. (Para conectarlo usamos useActionState,
// que se explica bien en la sección 7: por ahora quedate con el objeto que vuelve.)
//
// Es como si, en vez de cortarte el teléfono en la cara, el servidor te mandara una nota prolija:
// "Che, te faltó el @ en el mail, corregilo y mandalo de nuevo".

"use client";

import { useActionState, useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import { registrarUsuario, type RegistroState } from "@/app/formularios/actions";
import { buttonClass, inputClass, labelClass } from "@/components/formularios/styles";

const initialState: RegistroState = {};

export default function ServerValidationDemo() {
  const [state, formAction, isPending] = useActionState(registrarUsuario, initialState);
  // Con esto apagamos la validación del NAVEGADOR (como haría alguien que quiere hacer trampa)
  const [skipBrowser, setSkipBrowser] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* noValidate apaga los avisos automáticos del navegador (los de required y type="email") */}
        <form action={formAction} noValidate={skipBrowser} className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-4">
          <div>
            <label htmlFor="sv-email" className={labelClass}>
              Email
            </label>
            <input
              id="sv-email"
              name="email"
              type="email"
              required
              defaultValue={state.email}
              placeholder="sin arroba, por ejemplo"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sv-password" className={labelClass}>
              Contraseña
            </label>
            <input id="sv-password" name="password" type="password" required minLength={6} className={inputClass} />
          </div>

          <label className="flex cursor-pointer items-start gap-2 text-sm text-red-700">
            <input
              type="checkbox"
              className="mt-1"
              checked={skipBrowser}
              onChange={(e) => setSkipBrowser(e.target.checked)}
            />
            <span>
              Saltear la validación del navegador <span className="text-xs">(como haría un tramposo)</span>
            </span>
          </label>

          <div>
            <button type="submit" disabled={isPending} className={buttonClass}>
              {isPending ? "Enviando…" : "Registrarme"}
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">El objeto que devolvió el servidor:</p>
          <CodeBlock>{`state = ${JSON.stringify(state, null, 2)}`}</CodeBlock>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-600">
            <li>
              Tocá <strong>Registrarme</strong> con todo vacío: te frena el <strong>navegador</strong> (por el{" "}
              <code>required</code>).
            </li>
            <li>
              Marcá <strong>Saltear la validación del navegador</strong> y volvé a probar: esta vez el envío pasa, y
              ahora te frena el <strong>servidor</strong>.
            </li>
            <li>Probá un email sin @, una contraseña corta, y por último datos que estén bien.</li>
          </ol>
        </div>
      </div>

      <CodeBlock title="app/formularios/actions.ts (resumido)">{`"use server";

export async function registrarUsuario(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // ❌ Algo está mal → DEVOLVEMOS el error (no hacemos throw)
  if (!email.includes("@")) {
    return { error: "Email inválido: le falta el @." };
  }
  if (password.length < 6) {
    return { error: "La contraseña tiene que tener al menos 6 caracteres." };
  }

  // ✅ Todo bien
  return { success: true, message: "¡Listo!" };
}`}</CodeBlock>
    </div>
  );
}
