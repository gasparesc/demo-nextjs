# Guía de demo · Clase 4: Navegación avanzada y Catch-All

Esta guía sigue el orden de los slides de la clase. Todo lo nuevo está en el mismo proyecto DevStore de la clase 3.

## Antes de empezar

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). En la página de inicio hay una tabla **"Clase 4"** con un link a cada ruta de esta guía.

> **Para mostrar el pre-fetching** (slide 1) usá el modo producción, porque en modo desarrollo Next.js no pre-carga los links:
> ```bash
> npm run build
> npm start
> ```

## Qué se agregó para esta clase

```
app/
├── (auth)/                         → GRUPO DE RUTAS (no aparece en la URL)
│   ├── layout.tsx                  → Tarjeta centrada compartida por login y register
│   ├── login/page.tsx              → /login     · useRouter: push() vs replace()
│   └── register/page.tsx           → /register  · useRouter: push()
├── catalogo/
│   ├── layout.tsx                  → Menú de categorías + demo <Link> vs <a>
│   └── [[...filtros]]/page.tsx     → OPTIONAL CATCH-ALL · Client Component · useParams()
├── shop/
│   └── [...slug]/page.tsx          → CATCH-ALL · Server Component · params por props
└── products/[id]/page.tsx          → (modificado) params en el servidor vs useParams en el cliente

components/
├── LinkVsAnchor.tsx                → Contador + un <Link> y un <a> para comparar
├── CatalogSidebar.tsx              → Navegación con <Link> entre categorías
├── BackButton.tsx                  → Botón "Volver" con router.back()
└── ParamsClientViewer.tsx          → Lee el id con useParams() y lo convierte con parseInt()

lib/products.ts                     → (modificado) productos con categoría y subcategoría
```

---

## Guion paso a paso

### Slide 1 · El componente `<Link>`

**Dónde:** [/catalogo](http://localhost:3000/catalogo), en el recuadro violeta de arriba. Código: [components/LinkVsAnchor.tsx](components/LinkVsAnchor.tsx).

1. Tocá **"Sumar +1"** varias veces (por ejemplo, hasta 5).
2. Tocá **"✅ &lt;Link&gt; a Ropa"**. La página cambia y el contador **sigue en 5**.
3. Tocá **"❌ &lt;a&gt; a Tecnología"**. Se ve un parpadeo y el contador **vuelve a 0**: el navegador pidió la página completa de cero.
4. Abrí el código y mostrá el comentario `eslint-disable`. **ESLint ya nos avisa** cuando usamos `<a>` para un link interno.

**Pre-fetching (con `npm start`):** abrí DevTools → pestaña *Network*, recargá en `/`, y mostrá que aparecen pedidos de las páginas de la Navbar **antes de hacer clic**.

> 🗣 *"Es como un mozo que ve que estás terminando el plato y ya le pide el postre a la cocina."*

### Slide 2 · Navegación activa con `useRouter()`

**Dónde:** [/login](http://localhost:3000/login). Código: [app/(auth)/login/page.tsx](app/(auth)/login/page.tsx).

1. Mostrá el import: `import { useRouter } from "next/navigation"`. Remarcá que **no** es `"next/router"`, que es la versión vieja.
2. Mostrá el `"use client"` arriba de todo: los hooks solo funcionan en Client Components.
3. **push:** tocá *"Ingresar con router.push()"*. Llegás a `/dashboard`. Tocá **atrás** en el navegador y **volvés al login**.
4. **replace:** volvé a `/login` y tocá *"Ingresar con router.replace()"*. Ahora, al tocar **atrás**, **no** volvés al login, porque fue reemplazado en el historial. Es lo que se usa después de iniciar sesión.
5. **back:** en [/catalogo/ropa](http://localhost:3000/catalogo/ropa) está el botón **"← Volver"** ([components/BackButton.tsx](components/BackButton.tsx)), que usa `router.back()`.

Para cerrar este slide: un menú (navegación pasiva) usa `<Link>`, como [CatalogSidebar.tsx](components/CatalogSidebar.tsx). Una acción, como enviar un formulario, usa `useRouter()`.

> 🗣 *"El `<Link>` es un cartel que vos elegís seguir. `useRouter()` es un Uber al que le decís 'llevame al inicio' después de pagar."*

### Slide 3 · Grupos de rutas

**Dónde:** [/login](http://localhost:3000/login) y [/register](http://localhost:3000/register).

1. Mostrá el explorador de archivos: `app/(auth)/login/page.tsx`.
2. Señalá la barra de direcciones: dice `/login`, **no** `/auth/login`.
3. Probá [/auth/login](http://localhost:3000/auth/login): da **404**. La carpeta con paréntesis no existe para el navegador.
4. Mostrá [app/(auth)/layout.tsx](app/(auth)/layout.tsx): la tarjeta centrada se comparte entre login y register, y **no** afecta al resto del sitio.

> 🗣 *"Los paréntesis son una capa de invisibilidad: la carpeta te sirve a vos, pero el navegador pasa de largo."*

### Slide 4 · Repaso de `[id]`

**Dónde:** [/products/4](http://localhost:3000/products/4). Recordá que el nombre entre corchetes (`id`) es la *key* que usamos en el código: `params.id`.

### Slide 5 · Leer los params (servidor vs cliente) ⭐

**Dónde:** [/products/4](http://localhost:3000/products/4). Abajo del botón hay dos recuadros.

| Recuadro | Archivo | Cómo lee el id |
|---|---|---|
| Gris · *Server Component* | [app/products/[id]/page.tsx](app/products/[id]/page.tsx) | `params` llega como **prop** (con `await`) |
| Celeste · *Client Component* | [components/ParamsClientViewer.tsx](components/ParamsClientViewer.tsx) | Hook **`useParams()`** |

1. Mostrá los dos archivos lado a lado.
2. Remarcá en pantalla que `params.id` es **string**. Para tener un número hay que usar `parseInt()`, y el recuadro celeste muestra el resultado como `number`.

### Slide 6 · Catch-all `[...slug]`

**Dónde:** [/shop/ropa/remeras/verano](http://localhost:3000/shop/ropa/remeras/verano). Código: [app/shop/[...slug]/page.tsx](app/shop/[...slug]/page.tsx).

1. Mostrá el JSON: `slug` es un **array** `["ropa", "remeras", "verano"]`, **no** el texto `"ropa/remeras/verano"`.
2. Usá los botones de abajo para ir agregando y quitando segmentos y ver cómo cambia el array.
3. Señalá la línea del `if (slug[0] === "ropa")`, que es un ejemplo de cómo se filtraría.

> 🗣 *"`[id]` es una caña de pescar: atrapa un pez. `[...slug]` es una red: atrapa todo lo que venga y te lo da en una lista."*

### Slide 7 · Optional catch-all `[[...filtros]]`

1. Entrá a [/shop](http://localhost:3000/shop): **404**. El catch-all simple necesita **al menos un** segmento.
2. Entrá a [/catalogo](http://localhost:3000/catalogo): **funciona** y muestra el catálogo completo. `useParams()` devuelve `{}` porque no hay filtros.
3. Mostrá el nombre de la carpeta: `[[...filtros]]`, con doble corchete.

> En la práctica la key `filtros` directamente **no aparece** (`{}`). Leerla da `undefined`, como dice el slide 8.

### Slide 8 · Tabla resumen

Dejá el slide en pantalla y verificá cada fila en el navegador:

| Carpeta | URL | Valor |
|---|---|---|
| `[id]` | [/products/4](http://localhost:3000/products/4) | `{ id: "4" }` |
| `[...slug]` | [/shop/a/b](http://localhost:3000/shop/a/b) | `{ slug: ["a", "b"] }` |
| `[...slug]` | [/shop](http://localhost:3000/shop) | **404** |
| `[[...filtros]]` | [/catalogo/ropa/remeras](http://localhost:3000/catalogo/ropa/remeras) | `{ filtros: ["ropa", "remeras"] }` |
| `[[...filtros]]` | [/catalogo](http://localhost:3000/catalogo) | `{}` → `filtros` es `undefined` |

### Slide 9 · Práctica en vivo: catálogo avanzado

**Dónde:** [app/catalogo/[[...filtros]]/page.tsx](app/catalogo/[[...filtros]]/page.tsx).

La versión terminada ya está en el proyecto. Para mostrarla **paso a paso**:

1. **Catch-all:** renombrá la carpeta `[[...filtros]]` a `[...filtros]`.
2. **useParams + array:** mostrá `const params = useParams<{ filtros?: string[] }>()` y el `<pre>{JSON.stringify(params, null, 2)}</pre>`. En la barra de direcciones tipeá URLs cada vez más largas:
   - `/catalogo/ropa`
   - `/catalogo/ropa/remeras`
   - `/catalogo/hombres/remeras/verano` (los filtros que sobran aparecen en amarillo como "extra")

   El array crece en pantalla con cada segmento.
3. **Mostrar condicionalmente:** señalá `const [categoria, subcategoria] = filtros` y el título *"Mostrando Categoría: X"* con la *"Subcategoría: Y"*.
4. **Optional:** entrá a `/catalogo` y da **404**. Volvé a renombrar la carpeta a `[[...filtros]]` y ahora funciona. *(Si Next no detecta el cambio de nombre, reiniciá `npm run dev`.)*
5. **`<Link>` y `useRouter`:** el menú de la izquierda y las migas de pan usan `<Link>`. Los botones **"← Volver"** (`router.back()`) y **"Limpiar filtros"** (`router.push("/catalogo")`) usan `useRouter`.

#### Si preferís escribirlo desde cero

Borrá (o renombrá) la carpeta `app/catalogo/[[...filtros]]` y empezá con esta versión mínima:

```tsx
// app/catalogo/[...filtros]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function CatalogPage() {
  const params = useParams<{ filtros?: string[] }>();
  const [categoria, subcategoria] = params.filtros ?? [];

  return (
    <div>
      <h1>{categoria ? `Mostrando Categoría: ${categoria}` : "Catálogo completo"}</h1>
      {subcategoria && <p>Subcategoría: {subcategoria}</p>}
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
```

Después agregá los `<Link>`, el `BackButton` y el filtrado con `filterProducts(categoria, subcategoria)` de [lib/products.ts](lib/products.ts).

---

## Errores comunes para anticipar

| Error | Causa |
|---|---|
| `...needs useRouter. This React Hook only works in a Client Component` | Falta `"use client"` arriba del archivo. |
| `NextRouter was not mounted` | Se importó de `"next/router"` en lugar de `"next/navigation"`. |
| `/catalogo` da 404 | La carpeta es `[...filtros]` en vez de `[[...filtros]]`. |
| `params.id + 1` da `"41"` | `params.id` es string; hay que usar `parseInt(params.id)`. |
| `params.slug.split is not a function` | En un catch-all, `slug` ya es un array, no un string. |
