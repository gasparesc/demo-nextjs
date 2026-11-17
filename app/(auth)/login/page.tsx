// app/(auth)/login/page.tsx  →  URL: /login
// Navegación ACTIVA con useRouter(): después de una acción (enviar el formulario),
// mandamos al usuario al dashboard desde el código.
//
//   router.push("/dashboard")    → agrega la ruta al historial: con "atrás" volvés al login.
//   router.replace("/dashboard") → REEMPLAZA el login en el historial: con "atrás" no volvés acá.
//                                  (es lo que se usa normalmente después de iniciar sesión)
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // No hay backend todavía: simulamos que el login siempre sale bien.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Averiguamos qué botón se usó para enviar el formulario
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

    if (submitter.value === "replace") {
      router.replace("/dashboard");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Ingresar</h1>
      <p className="mt-1 text-sm text-zinc-600">Cualquier email y contraseña funcionan.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email
          <input
            type="email"
            required
            defaultValue="alumno@bootcamp.com"
            className="rounded-md border border-zinc-300 px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Contraseña
          <input
            type="password"
            required
            defaultValue="123456"
            className="rounded-md border border-zinc-300 px-3 py-2 font-normal"
          />
        </label>

        <button
          type="submit"
          value="push"
          className="rounded-lg bg-violet-600 px-4 py-2.5 font-semibold text-white hover:bg-violet-700"
        >
          Ingresar con router.push()
        </button>
        <button
          type="submit"
          value="replace"
          className="rounded-lg border border-violet-600 px-4 py-2.5 font-semibold text-violet-700 hover:bg-violet-50"
        >
          Ingresar con router.replace()
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="font-medium text-violet-700 hover:underline">
          Registrate
        </Link>
      </p>
    </div>
  );
}
