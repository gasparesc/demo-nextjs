// components/estilos/DarkModeDemo.tsx
//
// Modo oscuro con el prefijo dark:
//
// Por defecto, Tailwind activa las clases dark: cuando el SISTEMA OPERATIVO del usuario
// está en modo oscuro (usa la media query "prefers-color-scheme: dark" por vos).
//
// Ojo: solo cambia lo que tenga clases dark:. Por eso esta tarjeta se oscurece
// y el resto de Leonida Store no: en el resto todavía no escribimos ninguna clase dark:.

import CodeBlock from "@/components/estilos/CodeBlock";

export default function DarkModeDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* La tarjeta que reacciona al modo oscuro */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-black transition-colors dark:border-slate-600 dark:bg-slate-800 dark:text-white">
        <p className="text-4xl">
          {/* dark:hidden → se oculta en modo oscuro. hidden dark:inline → al revés */}
          <span className="dark:hidden">☀️</span>
          <span className="hidden dark:inline">🌙</span>
        </p>
        <p className="mt-3 text-xl font-bold">
          <span className="dark:hidden">Estás en modo claro</span>
          <span className="hidden dark:inline">¡Estás en modo oscuro!</span>
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-slate-300">
          Esta tarjeta tiene un color para cada modo. No escribimos ni una línea
          de JavaScript.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <CodeBlock>{`<div className="bg-white dark:bg-slate-800
  text-black dark:text-white">`}</CodeBlock>
        <div className="rounded-lg bg-zinc-100 p-4 text-sm text-zinc-700">
          <p className="font-semibold">¿Cómo lo pruebo?</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Opción rápida:</strong> abrí las DevTools (F12), apretá{" "}
              <kbd className="rounded bg-white px-1.5 font-mono text-xs shadow">
                Ctrl+Shift+P
              </kbd>{" "}
              y buscá <em>&quot;dark&quot;</em> → <em>Emulate CSS prefers-color-scheme: dark</em>.
            </li>
            <li>
              <strong>Opción real:</strong> poné tu sistema operativo en modo
              oscuro (en Windows: Configuración → Personalización → Colores).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
