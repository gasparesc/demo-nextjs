// components/estilos/TraditionalVsTailwind.tsx
//
// ¿Adiós al CSS tradicional?
// El MISMO botón hecho de dos formas:
//   - Izquierda: con un archivo CSS aparte (TraditionalButton.module.css).
//   - Derecha:   con clases de Tailwind escritas directo en el JSX.

import CodeBlock from "@/components/estilos/CodeBlock";
import styles from "./TraditionalButton.module.css";

export default function TraditionalVsTailwind() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Columna izquierda: CSS tradicional */}
      <div className="flex flex-col gap-3 rounded-xl bg-zinc-100 p-4">
        <p className="font-semibold text-zinc-500">😩 CSS tradicional · 2 archivos</p>
        <div>
          <button className={styles["btn-primary--active"]}>Comprar</button>
        </div>
        <CodeBlock title="Boton.tsx">{`import styles from "./Boton.module.css";

<button className={styles["btn-primary--active"]}>
  Comprar
</button>`}</CodeBlock>
        <CodeBlock title="Boton.module.css" language="css">{`.btn-primary--active {
  background-color: #3b82f6;
  color: white;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.btn-primary--active:hover {
  background-color: #1d4ed8;
}`}</CodeBlock>
      </div>

      {/* Columna derecha: Tailwind */}
      <div className="flex flex-col gap-3 rounded-xl bg-cyan-50 p-4 ring-1 ring-cyan-200">
        <p className="font-semibold text-cyan-700">✨ Tailwind CSS · 1 archivo</p>
        <div>
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Comprar
          </button>
        </div>
        <CodeBlock title="Boton.tsx">{`<button className="bg-blue-500 hover:bg-blue-700
  text-white font-bold py-2 px-4 rounded">
  Comprar
</button>`}</CodeBlock>
        <p className="text-sm text-cyan-900">
          Mismo resultado, sin inventar nombres de clases y sin salir del
          componente. Pasale el mouse a los dos botones: el <em>hover</em>{" "}
          también funciona igual.
        </p>
      </div>
    </div>
  );
}
