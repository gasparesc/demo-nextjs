// components/fetching/FakeProductCard.tsx
//
// Tarjeta para mostrar un producto que viene de la FakeStore API (datos REALES de internet).
// Es parecida a ProductCard, pero acá el producto tiene "title" en vez de "name",
// el precio está en dólares y la imagen es una URL externa.
//
// Si le pasás `href`, la tarjeta es un link. Si no, es una tarjeta común.
//
// Ojo con la imagen: como viene de OTRO sitio (fakestoreapi.com), Next.js nos obliga a
// avisarle en next.config.ts (images.remotePatterns). Es una medida de seguridad.

import Image from "next/image";
import Link from "next/link";
import { formatUsd, type FakeProduct } from "@/lib/fakestore";

export default function FakeProductCard({
  product,
  href,
}: {
  product: FakeProduct;
  href?: string;
}) {
  const className =
    "group flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg";

  const content = (
    <>
      {/* Las fotos de la API tienen fondo blanco: object-contain las muestra enteras, sin recortar */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-contain p-4"
        />
      </div>
      <span className="mt-3 text-xs font-medium uppercase text-pink-600">{product.category}</span>
      <h3 className="mt-1 line-clamp-2 text-sm font-semibold group-hover:text-pink-700">
        {product.title}
      </h3>
      <p className="mt-auto pt-3 text-lg font-bold">{formatUsd(product.price)}</p>
      <p className="text-xs text-zinc-500">
        ⭐ {product.rating.rate} ({product.rating.count} opiniones)
      </p>
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}
