// components/fetching/ClientVsServerTable.tsx
//
// Resumen: fetch en el Cliente vs fetch en el Servidor.
// Es solo una tabla (no tiene lógica), así que es un Server Component sin "use client".

const rows = [
  {
    topic: "¿Necesita 'use client'?",
    client: { ok: false, text: "Sí, es obligatorio" },
    server: { ok: true, text: "No: es el comportamiento por defecto" },
  },
  {
    topic: "Loading y error",
    client: { ok: false, text: "Hay que manejarlos a mano, con useState" },
    server: { ok: true, text: "Los resuelve Next.js (loading.tsx, error.tsx, Suspense)" },
  },
  {
    topic: "¿Cuándo se ejecuta?",
    client: { ok: false, text: "Después de cargar la página: el usuario ve «Cargando…» primero" },
    server: { ok: true, text: "Antes de enviar la página: llega con los datos adentro" },
  },
  {
    topic: "HTML y SEO",
    client: { ok: false, text: "El HTML llega vacío; los datos aparecen después" },
    server: { ok: true, text: "El HTML viaja 100% completo (excelente para SEO)" },
  },
  {
    topic: "Cantidad de código",
    client: { ok: false, text: "~25 líneas (o un custom hook)" },
    server: { ok: true, text: "3 líneas" },
  },
];

export default function ClientVsServerTable() {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-zinc-100 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium"></th>
              <th className="px-4 py-3 font-medium">
                Client Component
                <span className="block font-mono text-xs font-normal">useEffect</span>
              </th>
              <th className="px-4 py-3 font-medium">
                Server Component
                <span className="block font-mono text-xs font-normal">async / await</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.topic} className="border-t border-zinc-100 align-top">
                <th className="px-4 py-3 font-semibold">{row.topic}</th>
                <Cell {...row.client} />
                <Cell {...row.server} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg bg-pink-50 p-4 text-sm text-pink-900">
        <p className="font-semibold">La regla de oro</p>
        <p className="mt-1">
          Siempre que puedas, hacé el fetching en el <strong>servidor</strong>. Bajá al{" "}
          <strong>cliente</strong> solo cuando dependas de algo que el servidor no tiene: la ubicación
          GPS del usuario, un clic, lo que escribe en un input… (como en las secciones 2, 3 y 4).
        </p>
        <p className="mt-2">
          Y se pueden <strong>mezclar</strong>: esta misma página tiene Server Components y Client Components
          conviviendo.
        </p>
      </div>
    </div>
  );
}

// Una celda con tilde verde o cruz roja
function Cell({ ok, text }: { ok: boolean; text: string }) {
  return (
    <td className="px-4 py-3">
      <span className={`mr-2 font-bold ${ok ? "text-emerald-600" : "text-red-500"}`}>{ok ? "✔" : "✘"}</span>
      {text}
    </td>
  );
}
