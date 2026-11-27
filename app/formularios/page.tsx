// app/formularios/page.tsx  →  URL: /formularios
//
// Clase 7 · Formularios modernos en React y Next.js.
// Esta página es un "laboratorio": una sección por cada tema de la clase, igual que /estilos
// y /fetching. Cada demo es un componente aparte dentro de components/formularios/, y las
// Server Actions están todas juntas en app/formularios/actions.ts.
//
// Las secciones 1 a 4 son de React y de la web en general. Desde la 5 arranca Next.js moderno:
// Server Actions → validar en el servidor → feedback con useActionState → React Hook Form + Zod.
//
// ¿Y searchParams? Lo usa la sección 2: si mandás el formulario sin event.preventDefault(),
// el navegador recarga la página y deja tus datos en la URL (?email=...&password=...).
// Acá los leemos para mostrarte lo que pasó.

import LabHeader from "@/components/LabHeader";
import DemoSection from "@/components/estilos/DemoSection";
import PillarsDemo from "@/components/formularios/PillarsDemo";
import ControlledDemo from "@/components/formularios/ControlledDemo";
import UncontrolledDemo from "@/components/formularios/UncontrolledDemo";
import ValidationDemo from "@/components/formularios/ValidationDemo";
import ServerActionDemo from "@/components/formularios/ServerActionDemo";
import ServerValidationDemo from "@/components/formularios/ServerValidationDemo";
import ActionStateDemo from "@/components/formularios/ActionStateDemo";
import RhfZodDemo from "@/components/formularios/RhfZodDemo";

// El índice de arriba: cada link salta a la sección con ese id (#seccion-1, #seccion-2...)
const index = [
  "Los 3 pilares",
  "Controlados",
  "No controlados y FormData",
  "Validación",
  "Server Actions",
  "Validar en el servidor",
  "useActionState",
  "React Hook Form + Zod",
];

export default async function FormulariosPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; password?: string }>;
}) {
  const { email, password } = await searchParams;
  const reloadedWith = email !== undefined || password !== undefined ? { email: email ?? "", password: password ?? "" } : null;

  return (
    <div className="flex flex-col gap-8">
      <LabHeader
        eyebrow="Clase 7 · Formularios"
        title="Laboratorio de formularios 📝"
        description="Hasta ahora solo LEÍAMOS datos. Hoy empezamos a ENVIARLOS: de un formulario de React clásico a las Server Actions de Next.js. Probá cada demo y abrí el archivo que se indica abajo."
        items={index}
      />

      <DemoSection
        number={1}
        title="Formularios en la web: los 3 pilares"
        file="components/formularios/PillarsDemo.tsx"
        intro={
          <p>
            Un buen formulario es como la ventanilla de trámites de un banco: tiene carteles claros para que cualquiera
            entienda qué llenar (<strong>accesibilidad</strong>), un empleado que revisa si te faltó firmar (
            <strong>validación</strong>) y una carpeta donde junta los papeles para archivarlos (
            <strong>serialización</strong>).
          </p>
        }
      >
        <PillarsDemo />
      </DemoSection>

      <DemoSection
        number={2}
        title="Patrón 1: componentes controlados (el clásico)"
        file="components/formularios/ControlledDemo.tsx"
        intro={
          <p>
            El estado de React (<code>useState</code>) es la <strong>única fuente de verdad</strong> del input: cada letra
            dispara <code>onChange</code> y actualiza el estado. Es como un copiloto que anota cada milímetro que girás el
            volante: sabe todo, pero se cansa rápido si el viaje es largo.
          </p>
        }
      >
        <ControlledDemo reloadedWith={reloadedWith} />
      </DemoSection>

      <DemoSection
        number={3}
        title="Patrón 2: componentes no controlados y FormData"
        file="components/formularios/UncontrolledDemo.tsx"
        intro={
          <p>
            No guardamos cada campo en un <code>useState</code>: el navegador se encarga, y leemos todo junto al
            enviar, con <code>new FormData()</code>. Como una planilla en papel en el médico: nadie te mira letra por
            letra, leen todo cuando la entregás.
          </p>
        }
      >
        <UncontrolledDemo />
      </DemoSection>

      <DemoSection
        number={4}
        title="Validación: síncrona vs asíncrona"
        file="components/formularios/ValidationDemo.tsx · app/formularios/actions.ts"
        intro={
          <p>
            Validar evita guardar basura y guía al usuario. Como el patovica de un boliche: mirar tu documento es
            instantáneo (<strong>síncrona</strong>); buscarte en la lista VIP de la compu lleva un ratito (
            <strong>asíncrona</strong>).
          </p>
        }
      >
        <ValidationDemo />
      </DemoSection>

      <DemoSection
        number={5}
        title="Lo que se usa hoy en Next.js: Server Actions"
        file="components/formularios/ServerActionDemo.tsx · app/formularios/actions.ts"
        intro={
          <p>
            Le pasamos una función directo al <code>action</code> del <code>&lt;form&gt;</code>. Con{" "}
            <code>&quot;use server&quot;</code>, esa función corre en el servidor y recibe un <code>FormData</code> con
            todos los inputs. Sin ruta de API y sin <code>preventDefault</code>: un tubo neumático directo desde el
            botón hasta la oficina del servidor.
          </p>
        }
      >
        <ServerActionDemo />
      </DemoSection>

      <DemoSection
        number={6}
        title="Next.js sin librerías (1/2): validar en la Server Action"
        file="components/formularios/ServerValidationDemo.tsx · app/formularios/actions.ts"
        intro={
          <p>
            ¿Y cómo validamos esos datos en el servidor y le avisamos al usuario? Con <code>if</code> de JavaScript
            puro, adentro de la acción. Y en vez de tirar un error que rompa la app, <strong>devolvemos</strong> un
            objeto claro: <code>{"{ error }"}</code> o <code>{"{ success }"}</code>.
          </p>
        }
      >
        <ServerValidationDemo />
      </DemoSection>

      <DemoSection
        number={7}
        title="Next.js sin librerías (2/2): feedback con useActionState"
        file="components/formularios/ActionStateDemo.tsx"
        intro={
          <p>
            Con <strong>una sola línea</strong> conectamos la acción al formulario y resolvemos los errores del
            servidor, el mensaje de éxito y el estado de carga. Como el seguimiento de un envío: el último mensaje,
            el botón para despachar y la luz de «En camino…».
          </p>
        }
      >
        <ActionStateDemo />
      </DemoSection>

      <DemoSection
        number={8}
        title="El mismo flujo, a escala: React Hook Form + Zod"
        file="components/formularios/RhfZodDemo.tsx · lib/schemas/registro.ts"
        intro={
          <p>
            Para formularios grandes, la industria suma dos librerías que automatizan exactamente lo que acabás de
            hacer a mano. Validar con <code>if</code> es atornillar con destornillador; React Hook Form + Zod es sacar
            el taladro cuando tenés que armar una cocina entera.
          </p>
        }
      >
        <RhfZodDemo />
      </DemoSection>
    </div>
  );
}
