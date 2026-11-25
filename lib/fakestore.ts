// lib/fakestore.ts
//
// Todo lo que necesitamos para hablar con la FakeStore API (https://fakestoreapi.com),
// una API pública de prueba con 20 productos reales: título, precio, foto, categoría...
//
// Ojo: acá NO hacemos el fetch. Solo dejamos los tipos y unas funciones chiquitas.
// El fetch lo escribimos dentro de cada componente para que lo veas completo.

export const FAKESTORE_URL = "https://fakestoreapi.com";

// La forma (el "molde") de un producto tal como viene de la API.
// Mirá que es distinto a nuestro Product de lib/products.ts: acá el nombre es "title",
// el precio está en dólares y la imagen es una URL de internet.
export type FakeProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

// La FakeStore API cobra en dólares
export function formatUsd(price: number): string {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// Hora legible con segundos, en horario de Argentina. Sirve para ver CUÁNDO pasó algo.
export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour12: false,
  });
}
