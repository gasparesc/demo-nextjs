// app/(auth)/register/page.tsx  →  URL: /register
//
// Comparte el layout del grupo (auth) con /login: por eso se ve la misma tarjeta centrada.
// Al crear la cuenta te manda al login con router.push().

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Simulamos que la cuenta se creó y mandamos al usuario a ingresar
    router.push("/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <p className="mt-1 text-sm text-zinc-600">Al terminar te llevamos al login.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Nombre
          <input required className="rounded-md border border-zinc-300 px-3 py-2 font-normal" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Email
          <input
            type="email"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 font-normal"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-pink-600 px-4 py-2.5 font-semibold text-white hover:bg-pink-700"
        >
          Crear cuenta
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="font-medium text-pink-700 hover:underline">
          Ingresá
        </Link>
      </p>
    </div>
  );
}
