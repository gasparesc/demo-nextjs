// components/formularios/ControlledDemo.tsx
//
// Patrón 1: componentes CONTROLADOS (el clásico).
//
// El estado de React (useState) es la "única fuente de verdad" de cada input:
//   el usuario escribe → onChange → setValues() → React vuelve a dibujar el input con el valor nuevo.
//
// ¿Cuándo usarlo? Cuando necesitás reaccionar MIENTRAS el usuario escribe: un buscador en vivo,
// un contador de caracteres, mostrar u ocultar campos...
// ¿La contra? Cada tecla provoca un re-render del componente entero. Con 15 campos, se nota.
//
// Es como un copiloto súper atento que anota cada milímetro que girás el volante: sabe todo
// lo que pasa, pero se cansa rápido si el viaje es largo.

"use client";

import Link from "next/link";
import { useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import { buttonClass, inputClass, labelClass } from "@/components/formularios/styles";

export default function ControlledDemo({
  reloadedWith,
}: {
  // Si la página se recargó porque olvidaste el preventDefault, acá llegan los datos que
  // quedaron en la URL (los lee la página con searchParams)
  reloadedWith: { email: string; password: string } | null;
}) {
  // UN estado para todo el formulario: un objeto con una propiedad por campo
  const [values, setValues] = useState({ email: "", password: "" });
  const [renders, setRenders] = useState(0); // cuántas veces cambió el estado (= re-renders)
  const [sent, setSent] = useState<{ email: string; password: string } | null>(null);
  const [forgetPreventDefault, setForgetPreventDefault] = useState(false);

  // Se ejecuta con CADA tecla. Usamos el "name" del input para saber qué campo cambió.
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
    setRenders(renders + 1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Sin esta línea, el navegador hace lo de los años 90: manda el formulario y RECARGA la página
    if (forgetPreventDefault) return; // (a propósito, para ver qué pasa)
    event.preventDefault();
    setSent(values);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Si se recargó la página, mostramos el "desastre" */}
      {reloadedWith && (
        <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <p className="text-base font-bold">😱 ¡Se recargó la página entera!</p>
          <p className="mt-1">
            Como no frenaste el envío con <code>event.preventDefault()</code>, el navegador mandó el formulario
            «a la antigua» y recargó todo. Mirá la barra de direcciones: tus datos quedaron en la URL,{" "}
            <strong>¡incluida la contraseña!</strong> (<code>password={reloadedWith.password || "…"}</code>). Y todo
            lo que habías escrito se borró.
          </p>
          <Link href="/formularios#seccion-2" className="mt-2 inline-block font-semibold underline">
            Limpiar la URL y volver a probar
          </Link>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* El formulario */}
        {/* action="/formularios#seccion-2": adónde manda los datos el navegador SI NO frenamos el envío */}
        <form onSubmit={handleSubmit} action="/formularios#seccion-2" className="flex flex-col gap-4">
          <div>
            <label htmlFor="ctrl-email" className={labelClass}>
              Email
            </label>
            <input
              id="ctrl-email"
              name="email"
              type="email"
              value={values.email} // el valor lo decide React (el estado)...
              onChange={handleChange} // ...y cada tecla lo actualiza
              placeholder="lucia@vicecity.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="ctrl-password" className={labelClass}>
              Contraseña
            </label>
            <input
              id="ctrl-password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={inputClass}
            />
            {/* Como tenemos el valor en el estado, podemos reaccionar MIENTRAS escribe */}
            <p className={`mt-1 text-xs ${values.password.length >= 6 ? "text-emerald-600" : "text-zinc-500"}`}>
              {values.password.length} caracteres {values.password.length >= 6 ? "✓" : "(mínimo 6)"}
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-red-700">
            <input
              type="checkbox"
              checked={forgetPreventDefault}
              onChange={(e) => setForgetPreventDefault(e.target.checked)}
            />
            Olvidarme del <code>event.preventDefault()</code>
          </label>

          <div>
            <button type="submit" className={buttonClass}>
              Enviar
            </button>
          </div>
        </form>

        {/* Lo que pasa por dentro */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">
            El estado de React, en vivo{" "}
            <span className="font-normal text-zinc-500">(escribí y mirá cómo cambia letra por letra)</span>
          </p>
          <CodeBlock>{`values = ${JSON.stringify(values, null, 2)}`}</CodeBlock>
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
            🔁 Re-renders mientras escribías: <strong className="text-lg">{renders}</strong>{" "}
            <span className="text-xs">(uno por cada tecla)</span>
          </p>
          {sent && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              ✅ Enviado sin recargar la página: <code>{JSON.stringify(sent)}</code>
            </p>
          )}
        </div>
      </div>

      <CodeBlock title="El patrón completo">{`const [values, setValues] = useState({ email: "", password: "" });

function handleChange(event) {
  // [event.target.name] → actualiza el campo que cambió ("email" o "password")
  setValues({ ...values, [event.target.name]: event.target.value });
}

function handleSubmit(event) {
  event.preventDefault(); // ← ¡obligatorio! Evita que la página se recargue
  console.log(values);    // los datos ya están en el estado
}

<form onSubmit={handleSubmit}>
  <input name="email" value={values.email} onChange={handleChange} />
  <input name="password" value={values.password} onChange={handleChange} />
</form>`}</CodeBlock>
    </div>
  );
}
