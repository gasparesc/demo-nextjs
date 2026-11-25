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

import LabHeader from "@/components/LabHeader";
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
      <LabHeader
        eyebrow="Clase 5 · Tailwind CSS"
        title="Laboratorio de estilos 🎨"
        description="Una sección por cada tema de la clase. Tocá, pasá el mouse y achicá la ventana: todo lo que ves está hecho con clases de Tailwind escritas directo en el JSX."
        items={index}
      />

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
