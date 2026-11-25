// hooks/useFetch.ts
//
// Un CUSTOM HOOK: una función nuestra que guarda lógica de React para reutilizarla.
//
// Reglas de oro:
//   1. El nombre SIEMPRE empieza con "use" (useFetch, useAuth...). Así React y ESLint
//      saben que es un hook y controlan que lo uses bien.
//   2. Por adentro usa otros hooks: acá, useState y useEffect.
//   3. Devuelve lo que el componente necesita: { data, loading, error }.
//
// Adentro hay EXACTAMENTE lo mismo que antes escribíamos en cada componente: los useState
// y el useEffect con el fetch. La diferencia es que ahora vive en un solo lugar y cada
// componente lo usa con UNA línea:
//
//   const { data, loading, error } = useFetch<FakeProduct[]>(url);
//
// Es como un Personal Shopper: le decís qué querés (la url) y te trae todo listo.
//
// ¿Qué es eso de <T>? Es un "genérico" de TypeScript: un hueco para el tipo de los datos.
// Si pedís productos, escribís useFetch<FakeProduct[]>(...) y TypeScript sabe que `data`
// es una lista de productos. Si pedís categorías, useFetch<string[]>(...).

"use client";

import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  // ¿De qué url son los datos que tenemos guardados? Arranca en null (todavía no hay nada).
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  // Estamos cargando mientras los datos guardados no sean de la url que nos pidieron.
  // Así, si la url cambia, vuelve a mostrar "Cargando…" en vez de los datos viejos.
  const loading = loadedUrl !== url;

  // Se ejecuta al montar el componente y cada vez que cambia `url` (por eso va en el array)
  useEffect(() => {
    // AbortController nos deja CANCELAR el pedido si el componente desaparece
    // o si la url cambia antes de que llegue la respuesta
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        // fetch NO tira error si el servidor responde 404 o 500: hay que revisarlo a mano
        if (!res.ok) throw new Error(`La API respondió con error ${res.status}`);
        return res.json();
      })
      .then((json: T) => {
        setData(json);
        setError(null);
        setLoadedUrl(url);
      })
      .catch((err: Error) => {
        // Si cancelamos nosotros, no es un error de verdad: no hacemos nada
        if (err.name === "AbortError") return;
        setData(null);
        setError(err.message);
        setLoadedUrl(url);
      });

    // La función que devolvemos se llama "limpieza": React la ejecuta ANTES de volver
    // a correr el efecto y cuando el componente se desmonta
    return () => controller.abort();
  }, [url]);

  return {
    data: loading ? null : data,
    loading,
    error: loading ? null : error,
  };
}
