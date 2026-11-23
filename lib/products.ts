// lib/products.ts
//
// Datos de prueba (también se les dice "mock"), con temática Vice City. Como todavía no hay backend,
// los productos viven en este archivo. Más adelante los vas a traer de una base de datos o una API.
//
// ¿Querés agregar un producto? Sumalo al array y aparece solo en todo el sitio.

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string; // nombre para mostrar: "Tecnología"
  categorySlug: string; // como aparece en la URL: "tecnologia"
  subcategory: string; // como aparece en la URL: "teclados"
  image: string; // ilustración en /public/gta (se usa con <ProductImage>)
  stock: number; // unidades disponibles. Si es 0, el botón de compra se muestra gris (clase 5)
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Auto Deportivo",
    price: 2450000,
    category: "Vehículos",
    categorySlug: "vehiculos",
    subcategory: "autos",
    image: "/gta/auto-deportivo.webp",
    stock: 3,
    description: "Deportivo biplaza con luces cian, ideal para recorrer Ocean Drive al atardecer.",
  },
  {
    id: "2",
    name: "Remera Vice City",
    price: 15000,
    category: "Ropa",
    categorySlug: "ropa",
    subcategory: "remeras",
    image: "/gta/remera-vice-city.webp",
    stock: 5,
    description: "Remera rosa con el logo VC. Palmeras y atardecer incluidos.",
  },
  {
    id: "3",
    name: "Pack de Stickers Retro",
    price: 3200,
    category: "Accesorios",
    categorySlug: "accesorios",
    subcategory: "stickers",
    image: "/gta/stickers.svg",
    stock: 40,
    description: "Diez stickers estilo años 80 para decorar la notebook o la moto.",
  },
  {
    id: "4",
    name: "Celular Vice Phone",
    price: 180000,
    category: "Tecnología",
    categorySlug: "tecnologia",
    subcategory: "celulares",
    image: "/gta/celular.svg",
    stock: 7,
    description: "Celular con mapa de la ciudad y la mejor cámara para tus selfies de playa.",
  },
  {
    id: "5",
    name: "Lancha Flamingo",
    price: 1800000,
    category: "Vehículos",
    categorySlug: "vehiculos",
    subcategory: "lanchas",
    image: "/gta/bote-vice-city.jpeg",
    stock: 0,
    description: "Lancha rápida blanca y rosa para recorrer la costa de Leonida.",
  },
  {
    id: "6",
    name: "Mochila Everglades",
    price: 37000,
    category: "Accesorios",
    categorySlug: "accesorios",
    subcategory: "mochilas",
    image: "/gta/mochila-vice-city.jpg",
    stock: 0,
    description: "Mochila resistente para explorar los pantanos sin mojar tus cosas.",
  },
  {
    id: "7",
    name: "Buzo Leonida",
    price: 32000,
    category: "Ropa",
    categorySlug: "ropa",
    subcategory: "buzos",
    image: "/gta/buzo-vice-city.webp",
    stock: 8,
    description: "Buzo rosa con capucha, para las noches frescas en la ciudad.",
  },
  {
    id: "8",
    name: "Moto Sunset",
    price: 890000,
    category: "Vehículos",
    categorySlug: "vehiculos",
    subcategory: "motos",
    image: "/gta/moto-vice-city.png",
    stock: 15,
    description: "Moto ágil para escaparte del tráfico de la autopista.",
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
