// components/estilos/StatesDemo.tsx
//
// Interactividad: estados y pseudo-clases
//   hover:    el mouse está encima
//   focus:    el elemento está seleccionado (ej: un input donde estás escribiendo)
//   active:   mientras mantenés apretado el clic
//   disabled: el elemento está deshabilitado
//
// No hace falta "use client": esto es CSS puro, no JavaScript.

import CodeBlock from "@/components/estilos/CodeBlock";

export default function StatesDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Example
        title="hover: y active:"
        hint="Pasale el mouse y después mantené apretado el clic."
        code={`className="bg-blue-500 hover:bg-blue-700
  active:scale-95 transition"`}
      >
        <button className="rounded-lg bg-blue-500 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 active:scale-95">
          Agregar al carrito
        </button>
      </Example>

      <Example
        title="focus:"
        hint="Hacé clic adentro del campo: aparece el borde rosa."
        code={`className="border border-zinc-300
  focus:border-pink-500 focus:outline-none
  focus:ring-4 focus:ring-pink-200"`}
      >
        <input
          type="text"
          placeholder="jason@vicecity.com"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200"
        />
      </Example>

      <Example
        title="hover: en un texto"
        hint="Pasale el mouse por encima del texto."
        code={`className="hover:text-red-500"`}
      >
        <p className="cursor-pointer text-lg font-medium transition-colors hover:text-red-500">
          Pasame el mouse y me pongo rojo 🔴
        </p>
      </Example>

      <Example
        title="disabled:"
        hint="Este botón está deshabilitado: no se puede tocar."
        code={`<button disabled className="bg-blue-500
  disabled:bg-gray-400
  disabled:cursor-not-allowed">`}
      >
        <button
          disabled
          className="rounded-lg bg-blue-500 px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          No disponible
        </button>
      </Example>
    </div>
  );
}

// Tarjetita de ejemplo: la demo arriba y el código abajo
function Example({
  title,
  hint,
  code,
  children,
}: {
  title: string;
  hint: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4">
      <div>
        <p className="font-mono font-semibold text-cyan-700">{title}</p>
        <p className="text-sm text-zinc-500">{hint}</p>
      </div>
      <div className="flex min-h-20 items-center justify-center rounded-lg bg-zinc-50 p-4">
        {children}
      </div>
      <CodeBlock>{code}</CodeBlock>
    </div>
  );
}
