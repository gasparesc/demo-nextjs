// lib/products.ts
// Datos "falsos" (mock). Todavía no tenemos backend, así que los productos
// viven en este archivo. Más adelante esto se reemplaza por una base de datos o una API.

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string; // nombre para mostrar: "Tecnología"
  categorySlug: string; // como aparece en la URL: "tecnologia"
  subcategory: string; // como aparece en la URL: "teclados"
  emoji: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Taza Developer",
    price: 8500,
    category: "Hogar",
    categorySlug: "hogar",
    subcategory: "tazas",
    emoji: "☕",
    description: "Taza de cerámica para acompañar las sesiones de código.",
  },
  {
    id: "2",
    name: "Remera React",
    price: 15000,
    category: "Ropa",
    categorySlug: "ropa",
    subcategory: "remeras",
    emoji: "👕",
    description: "Remera de algodón con el logo de tu librería favorita.",
  },
  {
    id: "3",
    name: "Pack de Stickers",
    price: 3200,
    category: "Accesorios",
    categorySlug: "accesorios",
    subcategory: "stickers",
    emoji: "🏷️",
    description: "Diez stickers para decorar la notebook.",
  },
  {
    id: "4",
    name: "Teclado Mecánico",
    price: 68000,
    category: "Tecnología",
    categorySlug: "tecnologia",
    subcategory: "teclados",
    emoji: "⌨️",
    description: "Teclado mecánico con switches azules. Clic, clic, clic.",
  },
  {
    id: "5",
    name: "Auriculares",
    price: 42000,
    category: "Tecnología",
    categorySlug: "tecnologia",
    subcategory: "audio",
    emoji: "🎧",
    description: "Para concentrarte mientras programás.",
  },
  {
    id: "6",
    name: "Mochila Notebook",
    price: 37000,
    category: "Accesorios",
    categorySlug: "accesorios",
    subcategory: "mochilas",
    emoji: "🎒",
    description: "Mochila acolchada para notebooks de hasta 15 pulgadas.",
  },
  {
    id: "7",
    name: "Buzo con Capucha",
    price: 32000,
    category: "Ropa",
    categorySlug: "ropa",
    subcategory: "buzos",
    emoji: "🧥",
    description: "Buzo abrigado para los días de deploy en invierno.",
  },
  {
    id: "8",
    name: "Mouse Inalámbrico",
    price: 21000,
    category: "Tecnología",
    categorySlug: "tecnologia",
    subcategory: "mouses",
    emoji: "🖱️",
    description: "Mouse ergonómico con batería recargable.",
  },
];

// Devuelve todos los productos
export function getProducts(): Product[] {
  return products;
}

// Devuelve un producto por id, o undefined si no existe
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

// Filtra por categoría y (opcionalmente) subcategoría, usando los slugs de la URL
export function filterProducts(category?: string, subcategory?: string): Product[] {
  return products.filter(
    (product) =>
      (!category || product.categorySlug === category) &&
      (!subcategory || product.subcategory === subcategory),
  );
}

// Arma la lista de categorías con sus subcategorías, a partir de los productos
export function getCategories() {
  const categories: { slug: string; name: string; subcategories: string[] }[] = [];

  for (const product of products) {
    let category = categories.find((c) => c.slug === product.categorySlug);
    if (!category) {
      category = { slug: product.categorySlug, name: product.category, subcategories: [] };
      categories.push(category);
    }
    if (!category.subcategories.includes(product.subcategory)) {
      category.subcategories.push(product.subcategory);
    }
  }

  return categories;
}

// Formatea un número como precio en pesos argentinos
export function formatPrice(price: number): string {
  return price.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}
