# Clase 6 · Efectos secundarios y fetching de APIs

Hoy la app dejó de usar datos de mentira y se conectó a internet de verdad. Aprendiste dos formas de ir a buscar datos: en el **cliente** (con `useEffect`) y en el **servidor** (con `async/await`). Todo está en el mismo proyecto de las clases anteriores, así que no tenés que instalar nada nuevo.

> ⚠️ **Necesitás conexión a internet**: las demos le piden datos a [fakestoreapi.com](https://fakestoreapi.com). Si no hay internet vas a ver los carteles de error, que también son parte de la clase 😉.

## Antes de empezar

```bash
npm run dev
```

Abrí [http://localhost:3000/fetching](http://localhost:3000/fetching) (también está en la Navbar como **Fetching**). Es un laboratorio con **una sección por tema**, con un índice arriba para saltar a cada una. Abajo de cada sección, en gris, te dice **en qué archivo está el código**.

> 💡 Tip: abrí VS Code y el navegador lado a lado.

> 🔁 **Si ya tenías `npm run dev` corriendo**, frenalo (`Ctrl+C`) y volvé a levantarlo. Esta clase cambió [next.config.ts](next.config.ts), y Next.js solo lee ese archivo al arrancar. Si no lo reiniciás, las fotos de los productos no cargan.

## Qué hay de nuevo en el proyecto

```
app/
└── fetching/
    ├── page.tsx                    → /fetching · el laboratorio (una sección por tema)
    ├── error.tsx                   → Pantalla de error si la API no responde
    ├── practica/page.tsx           → /fetching/practica · el catálogo con datos de MENTIRA (punto de partida)
    └── productos/
        ├── page.tsx                → /fetching/productos · el catálogo REAL (práctica terminada)
        ├── loading.tsx             → Esqueleto gris mientras llegan los datos
        └── [id]/
            ├── page.tsx            → /fetching/productos/1 · un solo producto, con params.id
            └── not-found.tsx       → Cartel para /fetching/productos/999

hooks/
└── useFetch.ts                     → Nuestro primer CUSTOM HOOK

components/
├── LabHeader.tsx                   → La portada que comparten /estilos y /fetching
└── fetching/                       → Una demo por tema
    ├── ApiPeek.tsx                 → Pedirle un producto a la API con un clic
    ├── EffectFetchDemo.tsx         → useEffect + loading + error
    ├── DependencyArrayDemo.tsx     → Sin array vs [] vs [id], y el loop infinito
    ├── CustomHookDemo.tsx          → Un mismo hook usado en dos componentes
    ├── ServerFetchDemo.tsx         → Server Component con async/await
    ├── CacheDemo.tsx               → force-cache vs no-store
    ├── ClientVsServerTable.tsx     → La tabla comparativa
    ├── FakeProductCard.tsx         → La tarjeta de un producto de la API
    └── …                           → Piezas chicas: ApiError, SectionSkeleton, ReloadButton, StrictModeNote

lib/fakestore.ts                    → Tipos del producto de la API y la URL base
next.config.ts                      → (actualizado) permite las imágenes de fakestoreapi.com
```

---

## 1. Conectando la app con el mundo exterior

**Dónde:** [/fetching#seccion-1](http://localhost:3000/fetching#seccion-1). **Código:** [components/fetching/ApiPeek.tsx](components/fetching/ApiPeek.tsx).

Hasta ahora usamos datos **mockeados**: un array escrito a mano en [lib/products.ts](lib/products.ts). En la vida real los datos vienen de una **API**, un servicio al que le pedís cosas con una URL y te contesta en formato **JSON**. A ir a buscarlos se le llama **fetching**.

1. Tocá **"Pedir datos"** y mirá la respuesta: un producto con `id`, `title`, `price`, `image`…
2. Fijate en la URL de arriba: `https://fakestoreapi.com/products/1` es la dirección de la API, el recurso (`/products`) y cuál queremos (`/1`).
3. Cambiá el número a **999** y volvé a pedir. ¿Qué pasa? La API contesta "200 OK" pero **vacío**. Guardate este dato, lo vas a necesitar en la práctica.
4. Mirá el código: el `fetch` se dispara con un **clic**. Más adelante lo vas a ver dispararse solo, apenas aparece el componente.

> 💡 Si nuestra web fuera un restaurante, hasta hoy teníamos un menú de plástico de exhibición. Hoy abrimos la línea telefónica (la API) para hacer pedidos reales.

## 2. Efectos secundarios: el hook `useEffect`

**Dónde:** [/fetching#seccion-2](http://localhost:3000/fetching#seccion-2). **Código:** [components/fetching/EffectFetchDemo.tsx](components/fetching/EffectFetchDemo.tsx).

Un **efecto secundario** es todo lo que pasa *fuera* del renderizado: llamar a una API, iniciar un timer, escuchar el scroll… La función que le pasás a `useEffect` se ejecuta **después** de que el componente aparece en pantalla. Solo funciona en **Client Components** (`"use client"`).

1. Tocá **"Volver a cargar"** y mirá con atención: durante un instante ves «Cargando…» y después aparece el producto. Esos son los 3 momentos:
   1. Primer render: todavía no hay datos → se pinta «Cargando…».
   2. `useEffect` corre (**ya** se pintó la pantalla) y empieza el fetch.
   3. Llegan los datos → `setProduct` → React vuelve a renderizar. Este paso se pone verde y te dice cuántos milisegundos tardó la API.
2. Marcá **"Simular que la API se cayó"**: la demo vuelve a pedir los datos sola, ahora a una dirección que no existe. El paso 3 se pone **rojo** y aparece el error. Ese error lo manejamos a mano.
3. Fijate que en el código manejamos **3 estados a mano**: `product`, `loading` y `error`.
4. ¿Y el `[url]` del final del `useEffect`? Es el **array de dependencias**: lo vemos en la sección 3.

> 💡 El render es el mago sacando el conejo de la galera. El `useEffect` es el asistente que, justo después del truco, entra a preparar las luces para el siguiente acto.

## 3. El control del tiempo: el array de dependencias ⭐

**Dónde:** [/fetching#seccion-3](http://localhost:3000/fetching#seccion-3). **Código:** [components/fetching/DependencyArrayDemo.tsx](components/fetching/DependencyArrayDemo.tsx).

El **segundo argumento** de `useEffect` controla **cuándo** se ejecuta:

| Código | Cuándo se ejecuta |
|---|---|
| `useEffect(() => { … })` | En **cada** render. ¡Cuidado! |
| `useEffect(() => { … }, [])` | **Una sola vez**, cuando el componente aparece. Ideal para el fetch inicial. |
| `useEffect(() => { … }, [id])` | Al aparecer y **cada vez que cambia** `id`. |

Hay tres tarjetas, cada una con un contador de "veces que se ejecutó". Probalo en este orden:

1. Tocá **"Reiniciar contadores"**: los tres vuelven a arrancar parejos.
2. Tocá **"Re-renderizar"** varias veces. Ese botón cambia un estado solo para que React vuelva a dibujar el componente. Solo sube el contador **rojo** (sin array).
3. Tocá **+** en el `id`: sube el rojo y el **celeste** (`[id]`).
4. El **verde** (`[]`) no se mueve nunca más: se ejecutó una vez, al aparecer.

> 🧪 **¿Ves "2" en vez de "1" apenas cargás la página (o después de reiniciar)?** Es normal. En **desarrollo**, React ejecuta cada efecto **dos veces** cuando el componente aparece, a propósito (*Strict Mode*), para ayudarte a encontrar errores. En producción es una sola vez. Lo que importa es **cuál sube** cuando tocás los botones.

> 👀 En el archivo, lo importante son los tres `useEffect` (`NoArrayCase`, `EmptyArrayCase` e `IdArrayCase`): lo **único** que cambia entre ellos es el array del final. Para contar se usa `useRef`, un hook que todavía no vimos; no hace falta entender esa parte.

### El error nº 1 de los principiantes: el loop infinito

Más abajo hay un botón **"Provocar el loop"**. Si hacés un `setState` adentro de un efecto **sin array**: el estado cambia → React renderiza → el efecto corre de nuevo → cambia el estado → … hasta que se cuelga la compu. En la demo hay un **freno de seguridad en 30** para que no pase nada malo. Sin ese `if`, no pararía nunca.

> 💡 Sin array es como mirar el horno cada 5 segundos hasta volverte loco. Con `[]`, lo mirás una sola vez al prenderlo. Con `[temperatura]`, solo cuando la temperatura cambia.

## 4. Un código más limpio: Custom Hooks

**Dónde:** [/fetching#seccion-4](http://localhost:3000/fetching#seccion-4). **Código:** [hooks/useFetch.ts](hooks/useFetch.ts) y [components/fetching/CustomHookDemo.tsx](components/fetching/CustomHookDemo.tsx).

Repetir el mismo `useEffect` con sus 3 `useState` en **cada** componente es un dolor de cabeza. Un **custom hook** es una función propia que guarda lógica de React para reutilizarla.

1. Compará los dos bloques de código de arriba: son **los mismos componentes del recuadro de abajo** (`ProductTitles` y `Categories`). Sin hook, `ProductTitles` necesita unas 20 líneas solo para pedir los datos, y `Categories` tendría que repetirlas. Con el hook, cada uno los pide en **una línea**, y el resto (mostrar «Cargando…», el error o la lista) queda igual.
2. Abrí [hooks/useFetch.ts](hooks/useFetch.ts). Adentro está **el mismo código** del bloque de la izquierda (los `useState` y el `useEffect`), con comentarios. El `<T>` es un "hueco" de TypeScript para decir qué tipo de datos esperás: `useFetch<FakeProduct[]>(…)` si pedís productos.
3. En el recuadro de abajo, el **mismo hook** se usa en dos componentes: uno pide productos y el otro categorías.
4. Cambiá **"Cuántos productos pedir"**: cambia la URL, el efecto se vuelve a ejecutar (porque la URL está en el array `[url]`) y pide datos nuevos.

**Regla de oro:** el nombre de un custom hook **siempre empieza con `use`** (`useFetch`, `useAuth`…).

> 💡 Es como contratar a un Personal Shopper: en vez de ir vos al súper, le decís `useFetch(frutas)` y te trae todo limpio a casa.

## 5. La magia de Next.js: fetching en el servidor ⭐

**Dónde:** [/fetching#seccion-5](http://localhost:3000/fetching#seccion-5). **Código:** [components/fetching/ServerFetchDemo.tsx](components/fetching/ServerFetchDemo.tsx).

Next.js nos da un atajo: hacer el fetch en un **Server Component**. Fijate todo lo que **no** necesitamos:

- ❌ `useEffect`
- ❌ `useState(loading)`
- ❌ `"use client"`

El componente es `async` y usa `await fetch()`. El servidor "pausa" el render hasta que los datos llegan.

1. Mirá el código: son **3 líneas** de fetching, contra las ~25 de la sección 2.
2. Hacé clic derecho en la página → **Ver código fuente**, y buscá (`Ctrl+F`) `Fjallraven`, la mochila de esta sección. **¡Está en el HTML!** Llegó completa desde el servidor. Eso es excelente para el SEO: un buscador como Google la ve.
3. Ahora buscá `jewelery`, una de las categorías de la sección 4. **No está.** Esa se pide con `useEffect`: recién aparece en el navegador, cuando corre el JavaScript, después de que la página cargó.

> 💡 Hacer fetch en el cliente es pedir delivery y esperar en la puerta. Hacerlo en el servidor es cocinar en el restaurante: cuando el plato sale a la mesa, ya tiene todos los ingredientes.

## 6. Next.js fetch: controlando la caché ⭐

**Dónde:** [/fetching#seccion-6](http://localhost:3000/fetching#seccion-6). **Código:** [components/fetching/CacheDemo.tsx](components/fetching/CacheDemo.tsx).

Next.js le da al `fetch()` nativo una **memoria** (caché). Con la opción `cache` elegís cómo se comporta:

| Opción | Qué hace | Ideal para |
|---|---|---|
| `{ cache: "force-cache" }` | **Guarda** la respuesta y la reutiliza. Súper rápido. | Páginas casi estáticas (un blog) |
| `{ cache: "no-store" }` | **No guarda nada**: consulta a la API en cada visita. | Datos en tiempo real (stock, precios) |
| *(sin opciones)* | Next.js decide. En desarrollo pide siempre; en producción, si la página es estática, lo pide una sola vez (al hacer el `build`). **No** es lo mismo que `force-cache`. | Cuando todavía no te importa la caché |

> ⚠️ **Ojo si ves tutoriales viejos:** en Next.js 14 y anteriores `force-cache` era el comportamiento **por defecto**. Desde Next.js 15 la caché es **opcional**: si no pedís nada, no se guarda. Por eso, cuando quieras cachear, hay que escribir `force-cache` explícitamente.

La demo pide **exactamente lo mismo** dos veces, una con cada opción, y te muestra a qué hora contestó la API:

1. La **primera vez** que entrás, los dos paneles muestran casi la misma hora. Es normal: la caché estaba vacía, así que `force-cache` también tuvo que ir a la API (y de paso guardó la respuesta).
2. Tocá **"Recargar la página"** (o `F5`) varias veces y compará:
   - `force-cache`: la hora de "La API contestó a las" se queda **clavada**, la "antigüedad" sube y el fetch tarda **muchísimo menos** que el de `no-store`. El dato sale de la **caché**.
   - `no-store`: la hora avanza con vos y el fetch tarda unos cientos de milisegundos, porque va a internet cada vez.

> 💡 `force-cache` es un programa de cocina grabado: instantáneo, pero es el menú de ayer. `no-store` son las noticias en vivo: cuesta más, pero ves lo que pasa en este segundo exacto.

### Probalo en producción (opcional)

La caché se nota **mejor en producción**. Frená `npm run dev` y corré:

```bash
npm run build
npm start
```

Fijate que el primer valor de `force-cache` ya está "viejo" desde la primera visita: se guardó durante el `build`. Para volver a probar desde cero, frená el servidor, borrá la carpeta `.next` y repetí.

> 🛠️ En desarrollo, Next.js además guarda los `fetch` del servidor entre los cambios de código (*HMR cache*). Si no ves datos nuevos después de editar un archivo, recargá la página entera con `F5`.

## 7. Resumen: fetch en el cliente vs en el servidor

**Dónde:** [/fetching#seccion-7](http://localhost:3000/fetching#seccion-7).

| | Client Component (`useEffect`) | Server Component (`async/await`) |
|---|---|---|
| ¿Necesita `"use client"`? | Sí | No (es el comportamiento por defecto) |
| Loading y error | A mano, con `useState` | Los resuelve Next.js (`loading.tsx`, `error.tsx`) |
| ¿Cuándo se ejecuta? | **Después** de cargar la página | **Antes** de enviarla |
| HTML y SEO | El HTML llega vacío | Llega 100% completo |
| Código | ~25 líneas (o un custom hook) | 3 líneas |

**La regla de oro:** siempre que puedas, hacé el fetching en el **servidor**. Bajá al **cliente** solo cuando dependas de algo que el servidor no tiene (la ubicación GPS del usuario, un clic, lo que escribe en un input…). Y se pueden **mezclar**: esta misma página lo hace.

---

## 🧩 Práctica: integrando la FakeStore API

Esta práctica no está en `/fetching`: se abre aparte.

**Punto de partida:** [/fetching/practica](http://localhost:3000/fetching/practica) → [app/fetching/practica/page.tsx](app/fetching/practica/page.tsx).
**Versión terminada:** [/fetching/productos](http://localhost:3000/fetching/productos) → [app/fetching/productos/page.tsx](app/fetching/productos/page.tsx).

El punto de partida es un catálogo con **un solo producto de mentira** (un array escrito a mano). El objetivo: reemplazarlo por los **20 productos reales** de la API. En el código hay comentarios `PASO`. Seguilos **en orden**, guardá después de cada uno y mirá el navegador: la página tiene que seguir funcionando en cada paso.

1. **Hacé el componente asíncrono:** escribí `async` antes de `function`, para que quede `export default async function PracticaPage()`. Todavía no cambia nada en la pantalla.
2. **Pedí los datos a la API:** borrá la línea `const products = mockProducts;` y en su lugar pegá:
   ```tsx
   const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
   const products: FakeProduct[] = await res.json();
   ```
   Guardá: **¡20 productos reales!** El `.map()` de abajo no lo tocaste: sigue recorriendo `products`; lo único que cambió es **de dónde** vienen.
3. **Borrá el array** `mockProducts` de arriba: ya no lo usa nadie. VS Code te lo avisa mostrando el nombre más apagado.
4. **Hacé que cada tarjeta lleve al detalle:** agregale a `<FakeProductCard>` la prop ``href={`/fetching/productos/${product.id}`}``.

Después compará con la versión terminada y mirá el **detalle**, [/fetching/productos/1](http://localhost:3000/fetching/productos/1): usa la ruta dinámica `[id]` (clase 3) y `params.id` para pedirle **un solo** producto a la API. Mirá cómo maneja el producto que no existe en [/fetching/productos/999](http://localhost:3000/fetching/productos/999).

---

## Errores que te podés cruzar

| Error | Qué pasa y cómo arreglarlo |
|---|---|
| Un error de `next/image` que dice que el *hostname* `fakestoreapi.com` *is not configured under images* | Next.js no deja mostrar imágenes de otros sitios sin permiso. Autorizá el dominio en `images.remotePatterns` de [next.config.ts](next.config.ts) y **reiniciá** `npm run dev`. |
| Un error que dice que `useEffect` o `useState` solo funcionan en un *Client Component* | Te falta `"use client"` arriba de todo en el archivo. |
| Un error que dice que un *Client Component* no puede ser `async` | Un componente con `"use client"` no puede ser `async`. Si no usás hooks, sacale el `"use client"` (así es un Server Component). Si los necesitás, hacé el fetch con `useEffect`. |
| `Cannot read properties of null (reading 'title')` | Usaste los datos antes de que lleguen: al principio valen `null`. Mostrá «Cargando…» mientras `loading` sea `true`. |
| La pantalla se queda en «Cargando…» o la compu se cuelga | Probablemente un `useEffect` **sin array** que cambia un estado: loop infinito. Agregale el array `[]`. |
| El `fetch` "funciona" pero con un 404 o 500 no avisa nada | `fetch` **no falla** con errores HTTP, solo cuando no hay conexión. Revisá `if (!res.ok) throw new Error(…)`. |
| `Unexpected end of JSON input` en `/fetching/productos/999` | La API devuelve **vacío** si el producto no existe y `res.json()` se rompe. Leé el texto primero (`res.text()`) y si está vacío usá `notFound()`. |
| Los efectos corren dos veces | Es el *Strict Mode* de desarrollo (sección 3). En producción corren una sola vez. |
| No veo datos nuevos después de editar un archivo | La *HMR cache* de desarrollo. Recargá la página entera con `F5`. |
