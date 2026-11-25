// components/fetching/ApiError.tsx
//
// Cartel que mostramos cuando no pudimos hablar con la API (sin internet, la API caída...).
// Cuando trabajás con datos de afuera, SIEMPRE tenés que pensar qué pasa si falla:
// internet se corta, el servidor se cae, la URL está mal.

export default function ApiError({ message }: { message?: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="font-semibold">🔴 No pudimos conectar con la API</p>
      <p className="mt-1">
        {message ?? "Revisá tu conexión a internet y volvé a intentar."}
      </p>
    </div>
  );
}
