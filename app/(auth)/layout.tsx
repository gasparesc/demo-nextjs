// app/(auth)/layout.tsx
// GRUPO DE RUTAS: la carpeta (auth) tiene paréntesis, así que NO aparece en la URL.
//   app/(auth)/login/page.tsx     → /login      (no /auth/login)
//   app/(auth)/register/page.tsx  → /register
//
// Sirve para ordenar el proyecto y para que todo el grupo comparta este layout:
// una tarjeta centrada, solo para las pantallas de autenticación.

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {children}
      </div>
      <p className="mt-4 max-w-sm text-center text-xs text-zinc-500">
        Esta tarjeta viene de <code>app/(auth)/layout.tsx</code>. Fijate en la URL:
        la carpeta <code>(auth)</code> no aparece.
      </p>
    </div>
  );
}
