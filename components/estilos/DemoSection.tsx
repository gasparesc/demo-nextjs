// components/estilos/DemoSection.tsx
//
// "Marco" que comparten todas las secciones de /estilos: título,
// una explicación corta y en qué archivo está el código.
// Es un componente de React reutilizable: así no repetimos las mismas clases 8 veces.

export default function DemoSection({
  number,
  title,
  file,
  intro,
  children,
}: {
  number: number;
  title: string;
  file: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    // id="seccion-1", "seccion-2"...: los links del índice saltan hasta acá.
    // scroll-mt-6 deja un poco de aire arriba cuando el navegador hace scroll.
    <section
      id={`seccion-${number}`}
      className="scroll-mt-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8"
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-2 max-w-3xl text-zinc-600">{intro}</div>

      <div className="mt-6">{children}</div>

      <p className="mt-6 text-xs text-zinc-500">
        📁 Código: <code className="font-mono text-zinc-700">{file}</code>
      </p>
    </section>
  );
}
