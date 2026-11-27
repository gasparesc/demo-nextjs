// app/formularios/practica/page.tsx  →  URL: /formularios/practica
//
// 🧩 PRÁCTICA EN VIVO (clase 7): el PUNTO DE PARTIDA.
// El formulario está en RegistroForm.tsx (la carpeta de al lado). Los pasos están ahí,
// en los comentarios, y en README-CLASE-07.md.

import Link from "next/link";
import RegistroForm from "./RegistroForm";

export default function PracticaFormularioPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div className="rounded-xl border border-dashed border-pink-400 bg-pink-50 p-4 text-sm text-pink-900">
        <p className="font-semibold">🧱 Punto de partida: un formulario que todavía no hace nada</p>
        <p className="mt-1">
          Abrí <code>app/formularios/practica/RegistroForm.tsx</code> y seguí los pasos de los comentarios. Cuando
          termines debería funcionar como{" "}
          <Link href="/formularios/registro" className="font-semibold underline">
            /formularios/registro
          </Link>
          .
        </p>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Creá tu cuenta</h1>
        <p className="mt-1 text-zinc-600">Server Action + useActionState, sin librerías.</p>
      </div>
      <RegistroForm />
    </div>
  );
}
