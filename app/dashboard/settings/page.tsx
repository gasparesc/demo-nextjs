// app/dashboard/settings/page.tsx  →  URL: /dashboard/settings
// Ruta ANIDADA: carpeta "settings" dentro de la carpeta "dashboard".

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Configuración</h1>
      <p className="mt-1 text-zinc-600">Datos de la tienda.</p>

      <form className="mt-6 flex max-w-md flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Nombre de la tienda
          <input
            defaultValue="DevStore"
            className="rounded-md border border-zinc-300 px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email de contacto
          <input
            type="email"
            defaultValue="hola@devstore.com"
            className="rounded-md border border-zinc-300 px-3 py-2 font-normal"
          />
        </label>
        <button
          type="button"
          className="w-fit rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
