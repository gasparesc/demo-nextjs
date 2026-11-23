// components/ProductImage.tsx
//
// Muestra la imagen de un producto (los archivos están en /public/gta).
//
// Usamos <Image> de Next.js con "fill": la imagen rellena a su contenedor, que tiene
// que ser "relative" y con un tamaño definido (alto o aspect-ratio).
// "object-cover" la recorta para llenar el cuadro sin deformarla.
//
// Los archivos pueden ser .webp, .jpg, .png o .svg: <Image> de Next.js los optimiza
// (achica y convierte las fotos para que la página cargue más rápido).
// ¿Querés usar tus propias imágenes? Reemplazá los archivos de public/gta/ conservando
// el nombre (o cambiá la propiedad `image` en lib/products.ts).

import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductImage({
  product,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  className = "",
}: {
  product: Product;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
