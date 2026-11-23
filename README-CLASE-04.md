# Clase 4 · Navegación avanzada y Catch-All

En esta clase sumaste herramientas para moverte entre páginas y para atrapar URLs de cualquier largo. Todo está en el mismo proyecto Leonida Store de la [clase 3](README-CLASE-03.md), así que no tenés que instalar nada nuevo.

## Antes de empezar

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000). En la página de inicio hay una tabla **"Clase 4"** con un link a cada ruta de esta guía.

## Qué hay de nuevo en el proyecto

```
app/
├── (auth)/                         → GRUPO DE RUTAS (no aparece en la URL)
│   ├── layout.tsx                  → Tarjeta centrada que comparten login y register
│   ├── login/page.tsx              → /login     · useRouter: push() vs replace()
│   └── register/page.tsx           → /register  · useRouter: push()
├── catalogo/
│   ├── layout.tsx                  → Menú de categorías + comparación <Link> vs <a>
│   └── [[...filtros]]/page.tsx     → OPTIONAL CATCH-ALL · Client Component · useParams()
├── shop/
│   └── [...slug]/page.tsx          → CATCH-ALL · Server Component · params por props
└── products/[id]/page.tsx          → (actualizado) params en el servidor vs useParams en el cliente

components/
├── LinkVsAnchor.tsx                → Contador + un <Link> y un <a> para comparar
├── CatalogSidebar.tsx              → Navegación con <Link> entre categorías
├── BackButton.tsx                  → Botón "Volver" con router.back()
└── ParamsClientViewer.tsx          → Lee el id con useParams() y lo convierte con parseInt()

lib/products.ts                     → (actualizado) productos con categoría y subcategoría
```

---

## 1. El componente `<Link>`

**Dónde:** [/catalogo](http://localhost:3000/catalogo), en el recuadro rosa de arriba. **Código:** [components/LinkVsAnchor.tsx](components/LinkVsAnchor.tsx).

1. Tocá **"Sumar +1"** varias veces (por ejemplo, hasta 5).
2. Tocá **"✅ &lt;Link&gt; a Ropa"**. La página cambia y el contador **sigue en 5**.
3. Tocá **"❌ &lt;a&gt; a Tecnología"**. Vas a ver un parpadeo y el contador **vuelve a 0**: el navegador tiró todo y pidió la página completa de cero.
4. Abrí el código y buscá el comentario `eslint-disable`. **ESLint ya te avisa** cuando usás `<a>` para un link interno; ahí lo apagamos solo para poder mostrarte la diferencia.

### Bonus: ver el pre-fetching

`<Link>` también **pre-carga** las páginas antes de que hagas clic. En modo desarrollo esto no pasa, así que para verlo tenés que correr el proyecto en modo producción:

```bash
npm run build
npm start
```

Abrí las DevTools → pestaña *Network*, recargá en `/` y fijate que aparecen pedidos de las páginas de la Navbar **antes de que toques nada**.

> 💡 Es como un mozo que ve que estás terminando el plato y ya le pide el postre a la cocina.

## 2. Navegación activa con `useRouter()`

**Dónde:** [/login](http://localhost:3000/login). **Código:** [app/(auth)/login/page.tsx](app/(auth)/login/page.tsx).

Primero mirá dos cosas en el código:

- El import es `import { useRouter } from "next/navigation"`. **No** es `"next/router"`: esa es la versión vieja y no funciona con el App Router.
- Arriba de todo está `"use client"`. Los hooks solo funcionan en Client Components.

Ahora probalo:

1. **push:** tocá *"Ingresar con router.push()"*. Llegás a `/dashboard`. Tocá **atrás** en el navegador y **volvés al login**.
2. **replace:** volvé a `/login` y tocá *"Ingresar con router.replace()"*. Ahora, al tocar **atrás**, **no** volvés al login: fue reemplazado en el historial. Es lo que se usa después de iniciar sesión, para que nadie vuelva al formulario sin querer.
3. **back:** en [/catalogo/ropa](http://localhost:3000/catalogo/ropa) está el botón **"← Volver"** ([components/BackButton.tsx](components/BackButton.tsx)). Usa `router.back()`, que hace lo mismo que la flecha del navegador.

**¿Cuándo usar cada uno?** Si es un menú o un link que el usuario elige tocar, usá `<Link>` (como en [CatalogSidebar.tsx](components/CatalogSidebar.tsx)). Si la navegación pasa *como resultado de una acción*, como enviar un formulario, usá `useRouter()`.

> 💡 El `<Link>` es un cartel que vos elegís seguir. `useRouter()` es un Uber al que le decís "llevame al inicio" después de pagar.

## 3. Grupos de rutas

**Dónde:** [/login](http://localhost:3000/login) y [/register](http://localhost:3000/register).

1. Buscá el archivo en el explorador: está en `app/(auth)/login/page.tsx`.
2. Ahora mirá la barra de direcciones: dice `/login`, **no** `/auth/login`.
3. Probá entrar a [/auth/login](http://localhost:3000/auth/login): da **404**. Para el navegador, la carpeta con paréntesis no existe.
4. Abrí [app/(auth)/layout.tsx](app/(auth)/layout.tsx): la tarjeta centrada la comparten login y register, y **no** afecta al resto del sitio.

Los grupos sirven para ordenar tu proyecto y para darle un layout propio a un conjunto de páginas, sin tocar las URLs.

> 💡 Los paréntesis son una capa de invisibilidad: la carpeta te sirve a vos, pero el navegador pasa de largo.

## 4. Repaso de `[id]`

**Dónde:** [/products/4](http://localhost:3000/products/4).

Acordate: el nombre que va entre corchetes (`id`) es la *key* con la que después leés el valor en el código: `params.id`.

## 5. Leer los params: servidor vs cliente ⭐

**Dónde:** [/products/4](http://localhost:3000/products/4). Abajo del botón "Agregar al carrito" hay dos recuadros.

| Recuadro | Archivo | Cómo lee el id |
|---|---|---|
| Gris · *Server Component* | [app/products/[id]/page.tsx](app/products/[id]/page.tsx) | `params` llega como **prop** (con `await`) |
| Celeste · *Client Component* | [components/ParamsClientViewer.tsx](components/ParamsClientViewer.tsx) | Con el hook **`useParams()`** |

Abrí los dos archivos lado a lado y compará.

Y prestá atención a esto: `params.id` es un **string**, aunque parezca un número. Si necesitás un número de verdad, convertilo con `parseInt()`. El recuadro celeste te muestra los dos tipos.

## 6. Catch-all `[...slug]`

**Dónde:** [/shop/ropa/remeras/verano](http://localhost:3000/shop/ropa/remeras/verano). **Código:** [app/shop/[...slug]/page.tsx](app/shop/[...slug]/page.tsx).

1. Mirá el JSON: `slug` es un **array** `["ropa", "remeras", "verano"]`, **no** el texto `"ropa/remeras/verano"`.
2. Usá los botones de abajo para agregar y quitar segmentos, y fijate cómo cambia el array.
3. Buscá en el código el `slug[0] === "ropa"`: es un ejemplo de cómo podrías filtrar según el primer segmento.

> 💡 `[id]` es una caña de pescar: atrapa un pez. `[...slug]` es una red: atrapa todo lo que venga y te lo da en una lista.

## 7. Optional catch-all `[[...filtros]]`

1. Entrá a [/shop](http://localhost:3000/shop): **404**. El catch-all simple necesita **al menos un** segmento.
2. Entrá a [/catalogo](http://localhost:3000/catalogo): **funciona** y muestra el catálogo completo. `useParams()` devuelve `{}` porque no hay filtros.
3. Mirá el nombre de la carpeta: `[[...filtros]]`, con **doble** corchete. Ese segundo par de corchetes es lo que lo hace opcional.

Cuando no hay segmentos, la key `filtros` directamente **no aparece** en el objeto. Si intentás leerla, te da `undefined`.

## 8. Resumen

Probá cada fila en el navegador:

| Carpeta | URL | Valor |
|---|---|---|
| `[id]` | [/products/4](http://localhost:3000/products/4) | `{ id: "4" }` |
| `[...slug]` | [/shop/a/b](http://localhost:3000/shop/a/b) | `{ slug: ["a", "b"] }` |
| `[...slug]` | [/shop](http://localhost:3000/shop) | **404** |
| `[[...filtros]]` | [/catalogo/ropa/remeras](http://localhost:3000/catalogo/ropa/remeras) | `{ filtros: ["ropa", "remeras"] }` |
| `[[...filtros]]` | [/catalogo](http://localhost:3000/catalogo) | `{}` → `filtros` es `undefined` |

---

## 🧩 Práctica: el catálogo avanzado

**Código:** [app/catalogo/[[...filtros]]/page.tsx](app/catalogo/[[...filtros]]/page.tsx).

La versión terminada ya está en el proyecto. Te propongo que la rompas y la vuelvas a armar para entender cada parte:

1. **Catch-all:** renombrá la carpeta `[[...filtros]]` a `[...filtros]` (un solo corchete).
2. **useParams + array:** buscá `useParams<{ filtros?: string[] }>()` y el `<pre>` que muestra `params`. Tipeá en la barra de direcciones URLs cada vez más largas y mirá cómo crece el array:
   - `/catalogo/ropa`
   - `/catalogo/ropa/remeras`
   - `/catalogo/hombres/remeras/verano` (los filtros que sobran aparecen en amarillo como "extra")
3. **Mostrar según la URL:** buscá `const [categoria, subcategoria, ...extras] = filtros` y fijate cómo se usan para armar el título *"Mostrando Categoría: X"* y la *"Subcategoría: Y"*.
4. **Optional:** entrá a `/catalogo`: da **404**. Volvé a renombrar la carpeta a `[[...filtros]]` y ahora funciona. *(Si Next no detecta el cambio de nombre, frená y volvé a correr `npm run dev`.)*
5. **`<Link>` y `useRouter`:** el menú de la izquierda y las migas de pan usan `<Link>`. Los botones **"← Volver"** (`router.back()`) y **"Limpiar filtros"** (`router.push("/catalogo")`) usan `useRouter`.

### ¿Te animás a escribirlo desde cero?

Renombrá la carpeta `app/catalogo/[[...filtros]]` (por ejemplo, a `_catalogo-terminado`, así Next la ignora) y creá una nueva con esta versión mínima:

```tsx
// app/catalogo/[[...filtros]]/page.tsx
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

Cuando funcione, sumale los `<Link>`, el `BackButton` y el filtrado con `filterProducts(categoria, subcategoria)` de [lib/products.ts](lib/products.ts). Si te trabás, la versión terminada está ahí para espiar.

---

## Errores que te podés cruzar

| Error | Qué pasa y cómo arreglarlo |
|---|---|
| `...needs useRouter. This React Hook only works in a Client Component` | Te falta `"use client"` arriba de todo en el archivo. |
| `NextRouter was not mounted` | Importaste de `"next/router"`. Cambialo por `"next/navigation"`. |
| `/catalogo` da 404 | La carpeta se llama `[...filtros]` en vez de `[[...filtros]]`. |
| `params.id + 1` da `"41"` | `params.id` es un string. Usá `parseInt(params.id)` antes de sumar. |
| `params.slug.split is not a function` | En un catch-all, `slug` ya es un array. No hace falta partirlo. |
