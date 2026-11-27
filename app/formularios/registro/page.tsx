// app/formularios/registro/page.tsx  →  URL: /formularios/registro
//
// La versión TERMINADA de la práctica de la clase 7: un formulario completo, sin librerías.
//   - actions.ts        → la Server Action ("use server") que valida y devuelve { error } o { success }
//   - RegistroForm.tsx  → el formulario ("use client") conectado con useActionState
//
// Esta página es un Server Component: solo muestra el formulario.
// El punto de partida está en app/formularios/practica/.

import Link from "next/link";
import RegistroForm from "./RegistroForm";

export default function RegistroPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <Link href="/formularios" className="text-sm text-pink-700 hover:underline">
        ← Volver al laboratorio
      </Link>
      <div>
        <h1 className="text-2xl font-bold">Creá tu cuenta</h1>
        <p className="mt-1 text-zinc-600">Práctica terminada: Server Action + useActionState, sin librerías.</p>
      </div>
      <RegistroForm />
    </div>
  );
}
