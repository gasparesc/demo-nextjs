// components/fetching/DependencyArrayDemo.tsx
//
// El control del tiempo: el array de dependencias.
//
// El segundo argumento de useEffect controla CUÁNDO se ejecuta la función:
//   - SIN array      → en cada render                 (¡cuidado!)
//   - array vacío [] → una sola vez, al aparecer      (ideal para el fetch inicial)
//   - array [id]     → al aparecer y cada vez que `id` cambia
//
// Acá hay TRES componentes, uno por cada caso, y cada uno tiene un useEffect distinto que suma
// 1 a su contador cada vez que se ejecuta. Tocá los botones y mirá cuál se mueve.
//
// 👀 Lo importante de este archivo son los tres useEffect (NoArrayCase, EmptyArrayCase e
// IdArrayCase): fijate que lo ÚNICO que cambia entre ellos es el array del final.
// Para contar usamos useRef, un hook que todavía no vimos: no hace falta que entiendas esa
// parte (useRunCounter) para entender la demo.

"use client";

import { useEffect, useRef, useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import StrictModeNote from "@/components/fetching/StrictModeNote";

export default function DependencyArrayDemo() {
  const [ticks, setTicks] = useState(0); // cada clic en "Re-renderizar" lo cambia → fuerza un render
  const [id, setId] = useState(1); // la variable que vigila el tercer efecto
  const [resetKey, setResetKey] = useState(0); // al cambiarla, los 3 casos se vuelven a crear de cero

  return (
    <div className="flex flex-col gap-6">
      {/* Los 3 casos. Cuando este componente se re-renderiza, ellos también. */}
      <div className="grid gap-4 lg:grid-cols-3">
        <NoArrayCase key={`a-${resetKey}`} />
        <EmptyArrayCase key={`b-${resetKey}`} />
        <IdArrayCase key={`c-${resetKey}`} id={id} />
      </div>

      {/* Los controles */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-zinc-50 p-4 text-sm">
        <button
          onClick={() => setTicks(ticks + 1)}
          className="rounded-md bg-pink-600 px-4 py-1.5 font-semibold text-white hover:bg-pink-700 active:scale-95"
        >
          🔄 Re-renderizar
        </button>
        <span className="text-zinc-500">
          (cambia un estado solo para que React vuelva a renderizar · van <strong>{ticks}</strong>)
        </span>

        <span className="mx-2 hidden h-6 w-px bg-zinc-300 sm:block" />

        <span className="flex items-center gap-2">
          Cambiar <code>id</code>:
          <button
            onClick={() => setId(Math.max(1, id - 1))}
            className="h-8 w-8 rounded-md border border-zinc-300 bg-white font-bold hover:bg-zinc-100"
            aria-label="Restar 1 al id"
          >
            −
          </button>
          <strong className="w-6 text-center text-base">{id}</strong>
          <button
            onClick={() => setId(id + 1)}
            className="h-8 w-8 rounded-md border border-zinc-300 bg-white font-bold hover:bg-zinc-100"
            aria-label="Sumar 1 al id"
          >
            +
          </button>
        </span>

        <button
          onClick={() => setResetKey(resetKey + 1)}
          className="ml-auto rounded-md border border-zinc-300 bg-white px-3 py-1.5 hover:bg-zinc-100"
        >
          Reiniciar contadores
        </button>
      </div>

      <StrictModeNote>
        Por eso, apenas cargás la página los contadores marcan 2 en vez de 1. Tocá{" "}
        <strong>Reiniciar contadores</strong> si querés empezar de cero.
      </StrictModeNote>

      <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-600">
        <li>
          Tocá <strong>Reiniciar contadores</strong>: los tres arrancan parejos, porque todos los efectos corren
          cuando el componente aparece (en producción marcan 1; en desarrollo, 2).
        </li>
        <li>
          Tocá <strong>Re-renderizar</strong> varias veces: solo sube el contador rojo.
        </li>
        <li>
          Tocá <strong>+</strong> en el <code>id</code>: sube el rojo y el celeste. El verde no se mueve nunca
          más.
        </li>
      </ol>

      {/* El loop infinito, controlado */}
      <InfiniteLoopDemo />
    </div>
  );
}

// ─── Los 3 casos ───────────────────────────────────────────────────────────────────────

// Un mini custom hook (¡sí, ya estamos armando uno!): cuenta las veces que corre un efecto.
// Escribe el número directo en el HTML con un ref, en vez de usar useState. ¿Por qué? Porque
// si el efecto "sin array" cambiara un estado, provocaría un render, que volvería a ejecutar
// el efecto, que cambiaría el estado... (ese es justo el loop infinito del final).
function useRunCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const runs = useRef(0);

  function bump() {
    runs.current += 1;
    const el = ref.current;
    if (!el) return;
    el.textContent = String(runs.current);
    el.animate([{ transform: "scale(1.5)" }, { transform: "scale(1)" }], { duration: 300 });
  }

  return { ref, bump };
}

// 1) SIN array: se ejecuta en CADA render
function NoArrayCase() {
  const { ref, bump } = useRunCounter();

  useEffect(() => {
    bump();
  });

  return (
    <Case
      tone="red"
      code="useEffect(() => { … })"
      title="Sin array"
      text="Se ejecuta en CADA render. Sirve para poquísimas cosas, y es la causa del error nº 1 de los principiantes."
      analogy="Como mirar el horno cada 5 segundos hasta volverte loco."
      counter={<span ref={ref}>0</span>}
    />
  );
}

// 2) Array VACÍO []: se ejecuta una sola vez, cuando el componente aparece
function EmptyArrayCase() {
  const { ref, bump } = useRunCounter();

  useEffect(() => {
    bump();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- a propósito: es una demo
  }, []);

  return (
    <Case
      tone="green"
      code="useEffect(() => { … }, [])"
      title="Array vacío"
      text="Se ejecuta UNA sola vez, cuando el componente aparece. Ideal para el fetch inicial."
      analogy="Como mirar el horno una sola vez, al prenderlo."
      counter={<span ref={ref}>0</span>}
    />
  );
}

// 3) Array con [id]: se ejecuta al aparecer y cada vez que `id` cambia
function IdArrayCase({ id }: { id: number }) {
  const { ref, bump } = useRunCounter();

  useEffect(() => {
    bump();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- a propósito: es una demo
  }, [id]);

  return (
    <Case
      tone="sky"
      code="useEffect(() => { … }, [id])"
      title="Array con variables"
      text="Se ejecuta al aparecer y cada vez que cambia alguna de esas variables."
      analogy="Como mirar el horno solo cuando cambia la temperatura."
      counter={<span ref={ref}>0</span>}
    />
  );
}

// Una de las 3 tarjetas
function Case({
  tone,
  code,
  title,
  text,
  analogy,
  counter,
}: {
  tone: "red" | "green" | "sky";
  code: string;
  title: string;
  text: string;
  analogy: string;
  counter: React.ReactNode;
}) {
  // Las clases van escritas completas (Tailwind no puede leer clases armadas a pedazos)
  const styles = {
    red: { box: "border-red-200 bg-red-50", title: "text-red-700", num: "text-red-600" },
    green: { box: "border-emerald-200 bg-emerald-50", title: "text-emerald-700", num: "text-emerald-600" },
    sky: { box: "border-sky-200 bg-sky-50", title: "text-sky-700", num: "text-sky-600" },
  }[tone];

  return (
    <div className={`flex flex-col gap-2 rounded-xl border p-4 ${styles.box}`}>
      <p className={`font-semibold ${styles.title}`}>{title}</p>
      <code className="rounded bg-zinc-900 px-2 py-1 text-xs break-words text-zinc-100">{code}</code>
      <p className="text-sm text-zinc-700">{text}</p>
      <p className="text-xs text-zinc-500 italic">{analogy}</p>
      <p className="mt-auto pt-2 text-xs text-zinc-500">Veces que se ejecutó:</p>
      <p className={`text-4xl font-bold ${styles.num}`}>{counter}</p>
    </div>
  );
}

// ─── El loop infinito ──────────────────────────────────────────────────────────────────

// Un loop infinito de verdad, pero con un freno de seguridad para no colgar la compu
function InfiniteLoopDemo() {
  const [running, setRunning] = useState(false);

  return (
    <div className="rounded-xl border border-red-200 p-4">
      <p className="font-semibold text-red-700">⚠️ El error nº 1: el loop infinito</p>
      <p className="mt-1 text-sm text-zinc-600">
        Si hacés un <code>setState</code> adentro de un efecto <strong>sin array</strong>, pasa esto: el estado
        cambia → React vuelve a renderizar → el efecto se ejecuta de nuevo → cambia el estado → y así hasta que
        se te cuelga la compu. Acá lo provocamos con un <strong>freno de seguridad en 30</strong>.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start gap-3">
          {running ? <LoopingCounter /> : <p className="text-sm text-zinc-500">Todavía no pasó nada.</p>}
          <div className="flex gap-2 text-sm">
            <button
              onClick={() => setRunning(true)}
              disabled={running}
              className={`rounded-md px-4 py-1.5 font-semibold text-white ${
                running ? "cursor-not-allowed bg-gray-400" : "bg-red-600 hover:bg-red-700 active:scale-95"
              }`}
            >
              💥 Provocar el loop
            </button>
            <button
              onClick={() => setRunning(false)}
              className="rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100"
            >
              Reiniciar
            </button>
          </div>
        </div>

        <CodeBlock>{`const [n, setN] = useState(0);

useEffect(() => {
  // ¡Sin array! Se ejecuta en cada render...
  // ...y setN provoca otro render. Y otro. Y otro.
  // El "if" es el freno: sin él, sería infinito.
  if (n < 30) setN(n + 1);
});`}</CodeBlock>
      </div>
    </div>
  );
}

function LoopingCounter() {
  const [n, setN] = useState(0);

  // A PROPÓSITO: esto es justo lo que NO hay que hacer. Por eso desactivamos los avisos de
  // ESLint (que justamente existen para protegerte de este error).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (n < 30) setN(n + 1);
  });

  return (
    <div>
      <p className="text-5xl font-bold text-red-600">{n}</p>
      <p className="text-sm text-zinc-500">
        {n < 30
          ? "subiendo solo… 😱"
          : "El freno lo detuvo en 30. Sin freno, seguiría para siempre."}
      </p>
    </div>
  );
}
