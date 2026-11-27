// components/formularios/UncontrolledDemo.tsx
//
// Patrón 2: componentes NO CONTROLADOS y FormData.
//
// No usamos un useState por campo: dejamos que el navegador (el DOM) guarde lo que escribe
// el usuario, y recién leemos todo JUNTO al apretar "Enviar", con `new FormData(form)`.
//
// Requisito indispensable: cada <input> TIENE que tener su atributo name="...".
// FormData usa ese name para encontrar el dato. Sin name, el campo no viaja.
//
// "No controlado" no quiere decir "descontrolado" ni "malo": hoy es el patrón más usado
// para formularios comunes, porque aprovecha lo que ya hace el navegador y es más rápido
// (cero re-renders mientras el usuario escribe).
//
// Es como llenar una planilla en papel en el médico: nadie te mira letra por letra.
// Recién cuando entregás la hoja (Submit), leen todos los campos juntos.

"use client";

import { useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import { buttonClass, inputClass, labelClass } from "@/components/formularios/styles";

type Result = {
  email: FormDataEntryValue | null;
  telefono: FormDataEntryValue | null;
  all: Record<string, FormDataEntryValue>;
};

export default function UncontrolledDemo() {
  // Este estado NO es para los inputs: solo guarda el resultado para mostrarlo en pantalla
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // acá sí lo necesitamos: el envío lo manejamos nosotros

    // FormData lee TODOS los inputs del formulario de una sola vez, por su "name"
    const formData = new FormData(event.currentTarget);

    setResult({
      email: formData.get("email"),
      telefono: formData.get("telefono"), // ← este input no tiene name: va a dar null
      all: Object.fromEntries(formData), // todo junto, como un objeto
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fijate: ni useState, ni value, ni onChange en los inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="unc-email" className={labelClass}>
              Email <code className="text-xs text-emerald-600">name=&quot;email&quot;</code>
            </label>
            <input id="unc-email" name="email" type="email" placeholder="jason@vicecity.com" className={inputClass} />
          </div>
          <div>
            <label htmlFor="unc-password" className={labelClass}>
              Contraseña <code className="text-xs text-emerald-600">name=&quot;password&quot;</code>
            </label>
            <input id="unc-password" name="password" type="password" className={inputClass} />
          </div>
          <div>
            <label htmlFor="unc-telefono" className={labelClass}>
              Teléfono <code className="text-xs text-red-600">¡sin name!</code>
            </label>
            {/* A PROPÓSITO no tiene name: FormData no lo va a encontrar */}
            <input id="unc-telefono" type="tel" placeholder="305-555-0199" className={inputClass} />
          </div>
          <div>
            <button type="submit" className={buttonClass}>
              Enviar
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-3">
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            🔁 Re-renders mientras escribías: <strong className="text-lg">0</strong>{" "}
            <span className="text-xs">(React ni se entera de lo que tipeás: lo guarda el navegador)</span>
          </p>

          {result ? (
            <>
              <CodeBlock title="Lo que leyó FormData al apretar Enviar">{`formData.get("email")    // ${JSON.stringify(result.email)}
formData.get("telefono") // ${JSON.stringify(result.telefono)}  ← ¡le falta el name!

Object.fromEntries(formData)
// ${JSON.stringify(result.all)}`}</CodeBlock>
              <p className="text-xs text-zinc-500">
                Escribiste un teléfono, pero <code>formData.get(&quot;telefono&quot;)</code> da <code>null</code>: sin
                el atributo <code>name</code>, el campo no viaja con el formulario.
              </p>
            </>
          ) : (
            <div className="flex min-h-32 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 p-4 text-center text-sm text-zinc-500">
              Completá los 3 campos (¡también el teléfono!) y tocá Enviar.
            </div>
          )}
        </div>
      </div>

      <CodeBlock title="El patrón completo">{`function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget); // lee todo el formulario
  console.log(formData.get("email"));                // por el name de cada input
}

<form onSubmit={handleSubmit}>
  <input name="email" />      {/* ← sin useState, sin value, sin onChange */}
  <input name="password" />
</form>`}</CodeBlock>
    </div>
  );
}
