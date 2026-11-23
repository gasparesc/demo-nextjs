// components/estilos/UtilityPlayground.tsx
//
// Filosofía Utility-First
// Cada clase de Tailwind hace UNA sola cosa. Acá las prendés y apagás de a una
// para ver cómo el botón se va "armando", como piezas de Lego.

"use client";

import { useState } from "react";

// Las clases están escritas COMPLETAS a propósito: Tailwind lee tu código buscando
// textos como "bg-blue-500" y solo genera el CSS de las clases que encuentra.
const utilities = [
  { cls: "bg-blue-500", label: "Fondo azul" },
  { cls: "text-white", label: "Texto blanco" },
  { cls: "font-bold", label: "Negrita" },
  { cls: "py-2", label: "Relleno arriba y abajo" },
  { cls: "px-4", label: "Relleno a los costados" },
  { cls: "rounded", label: "Bordes redondeados" },
];

export default function UtilityPlayground() {
  // Guardamos qué clases están prendidas
  const [active, setActive] = useState<string[]>([]);

  function toggle(cls: string) {
    setActive(active.includes(cls) ? active.filter((c) => c !== cls) : [...active, cls]);
  }

  // Unimos las clases prendidas con espacios, en el orden de la lista
  const className = utilities
    .map((u) => u.cls)
    .filter((cls) => active.includes(cls))
    .join(" ");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Las "piezas de Lego" */}
      <div>
        <p className="mb-3 text-sm font-medium text-zinc-500">
          Tocá cada pieza para sumarla o sacarla:
        </p>
        <ul className="flex flex-col gap-2">
          {utilities.map((u) => {
            const isOn = active.includes(u.cls);
            return (
              <li key={u.cls}>
                {/* Adelanto de las clases condicionales: el color de cada pieza depende del estado */}
                <button
                  onClick={() => toggle(u.cls)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
                    isOn
                      ? "border-cyan-500 bg-cyan-50 text-cyan-900"
                      : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                  }`}
                >
                  <code className="font-mono font-semibold">{u.cls}</code>
                  <span>{u.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex gap-2 text-sm">
          <button
            onClick={() => setActive(utilities.map((u) => u.cls))}
            className="rounded-md bg-zinc-800 px-3 py-1.5 text-white hover:bg-zinc-700"
          >
            Armar todo
          </button>
          <button
            onClick={() => setActive([])}
            className="rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100"
          >
            Desarmar
          </button>
        </div>
      </div>

      {/* El resultado */}
      <div className="flex flex-col gap-4">
        <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200">
          <button className={className}>Comprar</button>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">
          <code>
            {"<button className=\""}
            <span className="text-cyan-300">{className}</span>
            {"\">"}
          </code>
        </pre>
        <p className="text-sm text-zinc-600">
          Nada de clases pre-armadas como <code>card</code> o <code>alert</code>:
          combinás piezas chiquitas hasta que queda como querés. Y en producción
          el CSS pesa poquito, porque Tailwind solo incluye las clases que
          realmente usaste.
        </p>
      </div>
    </div>
  );
}
