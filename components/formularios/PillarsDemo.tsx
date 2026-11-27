// components/formularios/PillarsDemo.tsx
//
// Formularios en la web: los 3 pilares.
//   1. Accesibilidad: HTML semántico. Cada input con su <label htmlFor="..."> y que se pueda
//      usar solo con el teclado (Tab).
//   2. Validación: guiar al usuario si falta un dato o tiene mal formato.
//   3. Serialización: juntar los datos limpios y mandarlos al servidor.
//
// Hasta la clase 6 solo LEÍAMOS datos (GET). Hoy empezamos a ENVIARLOS (POST).
//
// Este componente no tiene "use client": lo del <label> lo resuelve el HTML solito,
// sin una sola línea de JavaScript.

import CodeBlock from "@/components/estilos/CodeBlock";
import { inputClass, labelClass } from "@/components/formularios/styles";

const pillars = [
  {
    icon: "♿",
    title: "Accesibilidad",
    text: "Cada campo con su <label>, y que todo se pueda usar solo con el teclado.",
    where: "Probalo acá abajo",
  },
  {
    icon: "🛡️",
    title: "Validación",
    text: "Avisarle al usuario si le falta un dato o si tiene mal formato.",
    where: "Secciones 4, 6 y 8",
  },
  {
    icon: "📦",
    title: "Serialización",
    text: "Juntar los datos del formulario, limpios, y mandarlos al servidor.",
    where: "Secciones 3 y 5",
  },
];

export default function PillarsDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Los 3 pilares */}
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-3xl">{p.icon}</p>
            <p className="mt-2 text-lg font-bold">{p.title}</p>
            <p className="mt-1 text-sm text-zinc-600">{p.text}</p>
            <p className="mt-3 text-xs font-medium text-pink-700">{p.where}</p>
          </div>
        ))}
      </div>

      {/* Accesibilidad: label conectado vs no conectado */}
      <div>
        <h3 className="font-semibold">♿ Probalo: hacé clic en la palabra «Email» de cada recuadro</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">❌ Un texto suelto, sin conectar</p>
            <div className="mt-3">
              {/* Un <p> común: el navegador no sabe que este texto "pertenece" al input */}
              <p className={labelClass}>Email</p>
              <input id="email-sin-label" type="email" placeholder="lucia@vicecity.com" className={inputClass} />
            </div>
            <p className="mt-2 text-xs text-red-800">
              Al tocar el texto no pasa nada. Y un lector de pantalla (el programa que usan las personas ciegas)
              no sabe qué hay que escribir en ese campo.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-700">✅ Un &lt;label&gt; conectado con htmlFor</p>
            <div className="mt-3">
              {/* htmlFor tiene que ser IGUAL al id del input: así quedan conectados */}
              <label htmlFor="email-con-label" className={labelClass}>
                Email
              </label>
              <input id="email-con-label" type="email" placeholder="lucia@vicecity.com" className={inputClass} />
            </div>
            <p className="mt-2 text-xs text-emerald-800">
              Al tocar el texto, el cursor salta al campo. Y el lector de pantalla dice «Email» cuando llegás ahí.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <CodeBlock>{`// ❌ Sin conectar
<p>Email</p>
<input id="email" />

// ✅ Conectado: htmlFor === id
<label htmlFor="email">Email</label>
<input id="email" />`}</CodeBlock>
          <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
            <p className="font-semibold">⌨️ Probá también con el teclado</p>
            <p className="mt-1">
              Hacé clic en el primer campo y apretá <kbd className="rounded bg-white px-1.5 font-mono text-xs shadow">Tab</kbd>:
              el foco salta al siguiente campo, y el borde rosa te muestra dónde estás. Con{" "}
              <kbd className="rounded bg-white px-1.5 font-mono text-xs shadow">Shift+Tab</kbd> volvés para atrás.
              Un buen formulario se puede llenar entero sin tocar el mouse.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              En React se escribe <code>htmlFor</code> (y no <code>for</code>, como en HTML) porque{" "}
              <code>for</code> es una palabra reservada de JavaScript, la de los bucles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
