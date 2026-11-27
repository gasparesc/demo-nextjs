// components/formularios/ServerActionDemo.tsx
//
// Lo que se usa hoy en Next.js: SERVER ACTIONS.
//
// Le pasamos una función directamente al atributo action={...} del <form>. Como esa función
// tiene "use server" (está en app/formularios/actions.ts), corre en el SERVIDOR y recibe
// automáticamente un FormData con todos los inputs.
//
// Fijate todo lo que NO hay en este archivo:
//   ❌ "use client"   ❌ useState   ❌ onSubmit   ❌ event.preventDefault()   ❌ una ruta de API
//
// Es un Server Component común. Antes, enviar un formulario era mandar una carta al correo
// (una ruta de API) para que la reenvíen a la oficina. Ahora es un tubo neumático directo.

import CodeBlock from "@/components/estilos/CodeBlock";
import { crearUsuario } from "@/app/formularios/actions";
import { buttonClass, inputClass, labelClass } from "@/components/formularios/styles";
import { listarUsuarios } from "@/lib/usuarios";

export default function ServerActionDemo() {
  // Esto se lee en el servidor, cada vez que se dibuja la página
  const usuarios = listarUsuarios();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* El formulario: la acción va directo en action={...} */}
        <form action={crearUsuario} className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-4">
          <div>
            <label htmlFor="sa-nombre" className={labelClass}>
              Nombre
            </label>
            <input id="sa-nombre" name="nombre" placeholder="Tommy" className={inputClass} />
          </div>
          <div>
            <label htmlFor="sa-email" className={labelClass}>
              Email
            </label>
            <input id="sa-email" name="email" type="email" placeholder="tommy@vicecity.com" className={inputClass} />
          </div>
          <div>
            <button type="submit" className={buttonClass}>
              Crear usuario
            </button>
          </div>
          <p className="text-xs text-zinc-500">
            👀 Al enviar, mirá la <strong>terminal</strong> donde corre <code>npm run dev</code>: ahí aparece el
            console.log de la acción. Corrió en el servidor, no en tu navegador.
          </p>
        </form>

        {/* Lo que hay en la "base de datos" */}
        <div className="rounded-xl bg-zinc-50 p-4">
          <p className="text-sm font-semibold">
            Usuarios en la base de datos{" "}
            <span className="font-normal text-zinc-500">(de mentira: vive en la memoria del servidor)</span>
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {usuarios.map((u, i) => (
              <li key={`${u.email}-${i}`} className="flex justify-between gap-3 border-b border-zinc-200 pb-1">
                <span className="font-medium">{u.nombre}</span>
                <span className="truncate text-zinc-500">{u.email}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-zinc-500">
            Se borra cada vez que reiniciás <code>npm run dev</code>.
          </p>
        </div>
      </div>

      {/* Los dos archivos, conectados */}
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <CodeBlock title="La página (sin 'use client')">{`import { crearUsuario } from "./actions";

export default function Page() {
  return (
    <form action={crearUsuario}>
      <input name="nombre" />
      <input name="email" />
      <button type="submit">Crear usuario</button>
    </form>
  );
}`}</CodeBlock>
        <p className="text-center text-2xl text-pink-500" aria-hidden>
          <span className="hidden lg:inline">→</span>
          <span className="lg:hidden">↓</span>
        </p>
        <CodeBlock title="actions.ts">{`"use server"; // ← todo este archivo corre en el servidor

export async function crearUsuario(formData) {
  const nombre = formData.get("nombre");
  const email = formData.get("email");

  console.log("📨 Llegó un formulario:", { nombre, email });
  // ...acá lo guardaríamos en la base de datos
}`}</CodeBlock>
      </div>
    </div>
  );
}
