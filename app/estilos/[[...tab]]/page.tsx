// app/estilos/[[...tab]]/page.tsx  →  URL: /estilos, /estilos/envios, /estilos/resenas, ...
//
// Es un OPTIONAL CATCH-ALL (clase 4): /estilos funciona sin segmentos extra, y lo que venga
// después (/estilos/envios) llega como params.tab. Lo usa el ejemplo de pestañas de la
// última sección. /estilos/practica NO choca: las rutas fijas tienen prioridad sobre las dinámicas.
//
// Clase 5 · Estilizado moderno con Tailwind CSS.
// Esta página es un "laboratorio": una sección por cada tema de la clase.
// Cada sección es un componente aparte dentro de components/estilos/,
// así podés abrir el archivo de la que te interese sin perderte en un archivo gigante.

import Image from "next/image";
import DemoSection from "@/components/estilos/DemoSection";
import TraditionalVsTailwind from "@/components/estilos/TraditionalVsTailwind";
import UtilityPlayground from "@/components/estilos/UtilityPlayground";
import ResponsiveDemo from "@/components/estilos/ResponsiveDemo";
import StatesDemo from "@/components/estilos/StatesDemo";
import DarkModeDemo from "@/components/estilos/DarkModeDemo";
import ArbitraryValuesDemo from "@/components/estilos/ArbitraryValuesDemo";
import ConditionalClassesDemo from "@/components/estilos/ConditionalClassesDemo";

// El índice de arriba: cada link salta a la sección con ese id (#seccion-1, #seccion-2...)
const index = [
  "CSS tradicional vs Tailwind",
  "Utility-First",
  "Responsive",
  "hover · focus · active",
  "Modo oscuro y [corchetes]",
  "Clases condicionales",
];

export default function EstilosPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Encabezado */}
      {/* Encabezado con imagen de fondo y un poquito de desenfoque (blur):
          - relative + overflow-hidden: contiene a la imagen y recorta lo que se sale.
          - La imagen usa "fill" (-z-20) con blur-sm y scale-105: el zoom tapa los bordes
            que el desenfoque deja transparentes.
          - Una capa oscura (-z-10) encima hace que el texto blanco se lea bien. */}
      <header className="relative isolate overflow-hidden rounded-2xl px-6 py-12 text-white sm:px-10 sm:py-16">
        <Image
          src="/gta/hero-gta6.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="-z-20 scale-105 object-cover object-[75%_center] blur-sm md:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-black/45" />

        <p className="text-sm font-medium uppercase tracking-wide text-pink-200">
          Clase 5 · Tailwind CSS
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Laboratorio de estilos 🎨</h1>
        <p className="mt-3 max-w-2xl text-white/90">
          Una sección por cada tema de la clase. Tocá, pasá el mouse y achicá la
          ventana: todo lo que ves está hecho con clases de Tailwind escritas
          directo en el JSX.
        </p>

        <nav className="mt-6 flex flex-wrap gap-2">
          {index.map((label, i) => (
            <a
              key={label}
              href={`#seccion-${i + 1}`}
              className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm hover:bg-white/35"
            >
              {i + 1}. {label}
            </a>
          ))}
        </nav>
      </header>

      <DemoSection
        number={1}
        title="¿Adiós al CSS tradicional?"
        file="components/estilos/TraditionalVsTailwind.tsx"
        intro={
          <p>
            Con CSS tradicional tenés archivos aparte que crecen sin control y
            tenés que inventar nombres como <code>btn-primary--active</code>. Con
            Tailwind pintás directo con el pincel: las clases van en el JSX.
          </p>
        }
      >
        <TraditionalVsTailwind />
      </DemoSection>

      <DemoSection
        number={2}
        title="Filosofía Utility-First"
        file="components/estilos/UtilityPlayground.tsx"
        intro={
          <p>
            Tailwind es un set de Legos: en vez de una pieza pre-armada llamada
            &quot;botón&quot;, tenés bloques chiquitos (color, relleno, borde) que
            combinás como quieras.
          </p>
        }
      >
        <UtilityPlayground />
      </DemoSection>

      <DemoSection
        number={3}
        title="Responsive Design: Mobile-First"
        file="components/estilos/ResponsiveDemo.tsx"
        intro={
          <p>
            Primero vestís al maniquí chiquito (el celular, sin prefijo). Después
            decís: &quot;a partir del talle <code>md:</code>, ponele este
            saco&quot;. Olvidate de escribir <code>@media</code> a mano.
          </p>
        }
      >
        <ResponsiveDemo />
      </DemoSection>

      <DemoSection
        number={4}
        title="Interactividad: estados y pseudo-clases"
        file="components/estilos/StatesDemo.tsx"
        intro={
          <p>
            Le hablás al botón a la cara: &quot;cuando te pasen por arriba,
            cambiate a azul oscuro&quot;. Todo en la misma línea, sin ir a buscar
            un <code>:hover</code> a otro archivo.
          </p>
        }
      >
        <StatesDemo />
      </DemoSection>

      <DemoSection
        number={5}
        title="Modo oscuro y valores arbitrarios"
        file="components/estilos/DarkModeDemo.tsx · ArbitraryValuesDemo.tsx"
        intro={
          <p>
            Con <code>dark:</code> la página se adapta sola al modo del sistema.
            Y si Tailwind no tiene la medida o el color exacto, usás los
            corchetes: <code>w-[147px]</code>, <code>bg-[#FF0055]</code>.
          </p>
        }
      >
        <div className="flex flex-col gap-8">
          <DarkModeDemo />
          <ArbitraryValuesDemo />
        </div>
      </DemoSection>

      <DemoSection
        number={6}
        title="El toque moderno: clases condicionales"
        file="components/estilos/ConditionalClassesDemo.tsx"
        intro={
          <p>
            Un semáforo inteligente: el JSX le pregunta al estado de React
            &quot;¿hay error?&quot;. Si dice que sí, inyecta la clase roja; si no,
            la verde. Se hace con comillas invertidas <code>{"`...`"}</code> y un
            ternario. En el ejemplo de las pestañas, además, la condición sale de
            la URL: combina rutas catch-all y <code>useParams()</code>.
          </p>
        }
      >
        <ConditionalClassesDemo />
      </DemoSection>
    </div>
  );
}
