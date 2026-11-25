// components/fetching/StrictModeNote.tsx
//
// Aviso para el que ve los efectos ejecutarse DOS veces. Pasa en TODOS los proyectos de Next.js.
// Recibe como `children` la frase final, que cambia según la demo.

export default function StrictModeNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="font-semibold">🧪 ¿Ves que los efectos se ejecutan dos veces al cargar?</p>
      <p className="mt-1">
        Es normal. En <strong>desarrollo</strong> React corre cada efecto dos veces a propósito (se llama{" "}
        <em>Strict Mode</em>) para ayudarte a detectar errores. En <strong>producción</strong> se ejecuta una
        sola vez. {children}
      </p>
    </div>
  );
}
