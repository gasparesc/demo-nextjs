// app/cart/page.tsx  →  URL: /cart
//
// Un carrito de ejemplo con datos fijos. Todavía no guardamos nada,
// así que siempre vas a ver los mismos productos.

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getProductById } from "@/lib/products";

// Simulamos que el usuario ya agregó estos productos
const cartItems = [
  { productId: "1", quantity: 2 },
  { productId: "3", quantity: 1 },
  { productId: "5", quantity: 1 },
];

export default function CartPage() {
  const items = cartItems.map((item) => ({
    ...item,
    product: getProductById(item.productId)!,
  }));

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Tu carrito</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ul className="flex flex-col gap-3 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4"
            >
              <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                <ProductImage product={product} sizes="80px" />
              </span>
              <div className="flex-1">
                <Link
                  href={`/products/${product.id}`}
                  className="font-semibold hover:text-pink-700"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-zinc-500">Cantidad: {quantity}</p>
              </div>
              <p className="font-semibold">
                {formatPrice(product.price * quantity)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="font-semibold">Resumen</h2>
          <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button className="mt-5 w-full rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700">
            Finalizar compra
          </button>
        </aside>
      </div>
    </div>
  );
}
