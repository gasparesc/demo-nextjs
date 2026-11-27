// components/formularios/RhfZodDemo.tsx
//
// El mismo flujo, a escala: REACT HOOK FORM + ZOD.
//
// Lo de las secciones 6 y 7 es perfecto para formularios chicos (login, contacto). Cuando un
// formulario crece (15 campos, reglas complicadas), la industria suma dos librerías:
//
//   - Zod reemplaza los "if" a mano por un ESQUEMA (lib/schemas/registro.ts), y ese mismo
//     esquema sirve en el navegador Y en el servidor.
//   - React Hook Form reemplaza el manejo a mano: te da register(), los errores de cada campo
//     y isSubmitting automático.
//
// No es magia: automatiza los MISMOS pasos que ya hiciste a mano. Es pasar del destornillador
// al taladro eléctrico cuando tenés que armar una cocina entera.
//
// Para instalarlas: npm install react-hook-form zod @hookform/resolvers

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CodeBlock from "@/components/estilos/CodeBlock";
import { registrarConZod } from "@/app/formularios/actions";
import { buttonClass, inputClass, labelClass } from "@/components/formularios/styles";
import { registroSchema, type RegistroInput } from "@/lib/schemas/registro";

type ServerResult = Awaited<ReturnType<typeof registrarConZod>>;

export default function RhfZodDemo() {
  const {
    register, // conecta cada input con el formulario (reemplaza al name + onChange)
    handleSubmit, // hace el preventDefault, junta los datos y los valida con Zod
    reset,
    formState: { errors, isSubmitting }, // errores por campo y "¿se está enviando?"
  } = useForm<RegistroInput>({
    resolver: zodResolver(registroSchema), // ← las reglas salen del esquema de Zod
    mode: "onTouched", // valida cuando salís del campo, y después con cada tecla
  });

  // Lo que contestó el servidor (acá sí usamos un useState: es para la respuesta, no para los inputs)
  const [serverResult, setServerResult] = useState<ServerResult | null>(null);

  // Solo se ejecuta si Zod dio todo OK en el navegador: no molestamos al servidor con datos malos
  async function onSubmit(data: RegistroInput) {
    const result = await registrarConZod(data); // y el servidor valida OTRA VEZ, con el mismo esquema
    setServerResult(result);
    if (result.success) reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* noValidate: los avisos los maneja React Hook Form, no el navegador */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-5 shadow-sm">
          <p className="text-lg font-bold">El mismo registro, con React Hook Form + Zod</p>
          <div>
            <label htmlFor="rhf-email" className={labelClass}>
              Email
            </label>
            <input
              id="rhf-email"
              type="email"
              placeholder="tommy@vicecity.com"
              {...register("email")}
              className={`${inputClass} ${errors.email ? "border-red-500 bg-red-50" : ""}`}
            />
            {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="rhf-password" className={labelClass}>
              Contraseña
            </label>
            <input
              id="rhf-password"
              type="password"
              {...register("password")}
              className={`${inputClass} ${errors.password ? "border-red-500 bg-red-50" : ""}`}
            />
            {errors.password && <p className="mt-1 text-xs font-medium text-red-600">{errors.password.message}</p>}
          </div>

          {serverResult?.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">🔴 {serverResult.error}</p>
          )}
          {serverResult?.success && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              🟢 {serverResult.message}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className={`${buttonClass} w-full py-2.5`}>
            {isSubmitting ? "⏳ Enviando…" : "Registrarme"}
          </button>
        </form>

        <div className="flex flex-col gap-3 text-sm">
          <ol className="list-decimal space-y-1 pl-5 text-zinc-600">
            <li>Escribí un email sin @ y pasá al campo siguiente: el error aparece al instante, sin ir al servidor.</li>
            <li>Corregilo y fijate cómo el error desaparece mientras escribís.</li>
            <li>
              Con todo bien, tocá <strong>Registrarme</strong>: recién ahí viaja al servidor, que vuelve a validar y
              chequea que el email no exista.
            </li>
          </ol>

          {/* Las equivalencias con lo que hicimos a mano */}
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full min-w-[28rem] text-left text-xs">
              <thead className="bg-zinc-100 text-zinc-600">
                <tr>
                  <th className="px-3 py-2 font-medium">React Hook Form + Zod</th>
                  <th className="px-3 py-2 font-medium">≈ Lo que hicimos a mano</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className="border-t border-zinc-100">
                  <td className="px-3 py-2">z.object({"{ … }"})</td>
                  <td className="px-3 py-2">los if de la Server Action (sección 6)</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-3 py-2">{'register("email")'}</td>
                  <td className="px-3 py-2">{'name="email"'}</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-3 py-2">errors.email?.message</td>
                  <td className="px-3 py-2">state.error</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-3 py-2">isSubmitting</td>
                  <td className="px-3 py-2">isPending</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-3 py-2">handleSubmit(onSubmit)</td>
                  <td className="px-3 py-2">preventDefault + FormData</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CodeBlock title="lib/schemas/registro.ts · el esquema de Zod">{`import { z } from "zod";

export const registroSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});`}</CodeBlock>
        <CodeBlock title="El formulario con React Hook Form">{`const { register, handleSubmit, formState } = useForm({
  resolver: zodResolver(registroSchema),
});
const { errors, isSubmitting } = formState;

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("email")} />
  {errors.email && <p>{errors.email.message}</p>}

  <button disabled={isSubmitting}>Registrarme</button>
</form>`}</CodeBlock>
      </div>
    </div>
  );
}
