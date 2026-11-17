// components/BackButton.tsx
//
// Botón "Volver" que usa useRouter() para navegar desde código.
// IMPORTANTE: useRouter se importa de "next/navigation" (NO de "next/router", que es la versión vieja).
// Como usa un hook y un onClick, tiene que ser Client Component.

"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // igual que tocar "atrás" en el navegador
      className="text-sm text-violet-700 hover:underline"
    >
      ← Volver
    </button>
  );
}
