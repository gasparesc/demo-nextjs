# Clase 5 · Estilizado moderno con Tailwind CSS

En esta clase dejaste de lado el CSS tradicional y aprendiste a estilizar con **Tailwind**: clases chiquitas escritas directo en el JSX. Todo está en el mismo proyecto Leonida Store de las clases [3](README-CLASE-03.md) y [4](README-CLASE-04.md). Tailwind ya venía instalado, así que no hace falta instalar nada.

## Antes de empezar

```bash
npm run dev
```

Abrí [http://localhost:3000/estilos](http://localhost:3000/estilos) (también está en la Navbar como **Estilos**). Es un laboratorio con **una sección por cada tema**. Arriba de todo tiene un índice para saltar a cada una.

> 💡 Tip: abrí VS Code y el navegador lado a lado. Cada sección te dice abajo, en gris, **en qué archivo está su código**.

## Qué hay de nuevo en el proyecto

```
app/
├── estilos/
│   ├── [[...tab]]/page.tsx         → /estilos, /estilos/envios · el laboratorio (optional catch-all)
│   └── practica/page.tsx           → /estilos/practica · el catálogo SIN estilos (punto de partida)
└── products/page.tsx               → (actualizado) grilla md:grid-cols-2 lg:grid-cols-3

components/
├── estilos/                        → Una demo por tema
│   ├── DemoSection.tsx             → El "marco" que comparten todas las secciones
│   ├── CodeBlock.tsx               → Caja oscura que muestra el código con colores (resaltado de sintaxis)
│   ├── TraditionalVsTailwind.tsx   → El mismo botón con CSS y con Tailwind
│   ├── TraditionalButton.module.css→ El CSS "a la antigua"
│   ├── UtilityPlayground.tsx       → Armá un botón prendiendo clases de a una
│   ├── ResponsiveDemo.tsx          → sm: md: lg: xl:
│   ├── StatesDemo.tsx              → hover: focus: active: disabled:
│   ├── DarkModeDemo.tsx            → dark:
│   ├── ArbitraryValuesDemo.tsx     → w-[147px], bg-[#FF0055]
│   └── ConditionalClassesDemo.tsx  → className={`... ${condición ? "a" : "b"}`}
├── ProductImage.tsx                → <Image> de Next.js que rellena su contenedor (fill)
├── AddToCartButton.tsx             → Botón con clases condicionales según stock y estado
└── ProductCard.tsx                 → (actualizado) la práctica TERMINADA

lib/products.ts                     → (actualizado) productos de Vice City con "stock" e "image"
public/gta/                         → (nuevo) imágenes de cada producto (y la del inicio)
```

---

## 1. ¿Adiós al CSS tradicional?

**Dónde:** [/estilos#seccion-1](http://localhost:3000/estilos#seccion-1). **Código:** [components/estilos/TraditionalVsTailwind.tsx](components/estilos/TraditionalVsTailwind.tsx).

1. Mirá los dos botones "Comprar": se ven iguales.
2. El de la izquierda necesita **dos archivos**: el componente y [TraditionalButton.module.css](components/estilos/TraditionalButton.module.css), con un nombre inventado (`btn-primary--active`).
3. El de la derecha tiene todo en **una línea**, adentro del JSX.
4. Pasale el mouse a los dos: el hover también es igual. En CSS hizo falta escribir un bloque `:hover` aparte. En Tailwind es una palabra más: `hover:bg-blue-700`.

> 💡 Escribir CSS tradicional es pedir colores por carta postal. Tailwind es tener la paleta en la mano y pintar la pared directo con el pincel.

## 2. Filosofía Utility-First

**Dónde:** [/estilos#seccion-2](http://localhost:3000/estilos#seccion-2). **Código:** [components/estilos/UtilityPlayground.tsx](components/estilos/UtilityPlayground.tsx).

1. Arranca con un botón "Comprar" **sin ninguna clase**: se ve como texto pelado.
2. Prendé las piezas **de a una** y mirá cómo cambia el botón y el `className` de abajo:
   `bg-blue-500` → `text-white` → `font-bold` → `py-2` → `px-4` → `rounded`.
3. Cada clase hace **una sola cosa**. No hay una clase `boton` pre-armada: el botón lo armás vos.

¿Y esto no "ensucia" el JSX? No: la vista y sus estilos quedan **en un solo lugar**. Y en producción el CSS pesa muy poco, porque Tailwind solo incluye las clases que usaste.

> 💡 Tailwind es un set de Legos. No tenés una pieza llamada "silla": tenés bloques chiquitos (color, relleno, borde) para armar exactamente la silla que querés.

## 3. Responsive: Mobile-First

**Dónde:** [/estilos#seccion-3](http://localhost:3000/estilos#seccion-3). **Código:** [components/estilos/ResponsiveDemo.tsx](components/estilos/ResponsiveDemo.tsx).

1. El cartel negro te dice **en qué tamaño estás** ahora. Achicá y agrandá la ventana, o abrí las DevTools (F12) y tocá el ícono del celular (`Ctrl+Shift+M`).
2. La barra celeste es el ejemplo clásico: `w-full md:w-1/2 lg:w-1/3`. Ocupa todo el ancho en el celular, la mitad en tablet y un tercio en monitor.
3. La tarjeta del deportivo va **apilada** en el celular (`flex-col`) y **de costado** desde tablet (`md:flex-row`).
4. Mirá los dos recuadros de abajo: el error más común es usar `sm:` pensando en el celular.

| Prefijo | Desde | Pensalo como |
|---|---|---|
| *(ninguno)* | 0px | Celular: **la base** |
| `sm:` | 640px | Celular horizontal |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Notebook |
| `xl:` | 1280px | Monitor grande |

> 💡 Primero vestís al maniquí chiquito. Después decís: "a partir del talle medium (`md:`), ponele este saco". Y "a partir del talle large (`lg:`), sumale el sombrero".

## 4. Interactividad: estados y pseudo-clases

**Dónde:** [/estilos#seccion-4](http://localhost:3000/estilos#seccion-4). **Código:** [components/estilos/StatesDemo.tsx](components/estilos/StatesDemo.tsx).

| Prefijo | Cuándo se aplica | Probalo |
|---|---|---|
| `hover:` | El mouse está encima | Pasá el mouse por el botón azul |
| `active:` | Mientras mantenés apretado el clic | Mantené apretado el botón: se achica (`active:scale-95`) |
| `focus:` | El elemento está seleccionado | Hacé clic en el campo de email: aparece el borde rosa |
| `disabled:` | El elemento está deshabilitado | El botón gris no se puede tocar |

Fijate que el archivo **no tiene `"use client"`**: todo esto es CSS puro, no JavaScript.

> 💡 Un hover en Tailwind es decirle al botón directo a la cara: "cuando te pasen por arriba, cambiate a azul oscuro". Todo en la misma orden.

## 5. Modo oscuro y valores arbitrarios

**Dónde:** [/estilos#seccion-5](http://localhost:3000/estilos#seccion-5). **Código:** [DarkModeDemo.tsx](components/estilos/DarkModeDemo.tsx) y [ArbitraryValuesDemo.tsx](components/estilos/ArbitraryValuesDemo.tsx).

### Modo oscuro (`dark:`)

Tailwind activa las clases `dark:` cuando **tu sistema operativo** está en modo oscuro. Para probarlo sin cambiar todo tu sistema:

1. Abrí las DevTools (F12).
2. Apretá `Ctrl+Shift+P`, escribí **dark** y elegí **Emulate CSS prefers-color-scheme: dark**.
3. La tarjeta cambia a 🌙. Para volver, repetí con **light**.

Solo cambia la tarjeta, no el resto de Leonida Store. ¿Por qué? Porque **solo cambia lo que tiene clases `dark:`**, y en el resto del sitio todavía no escribimos ninguna.

### Valores arbitrarios (`[ ]`)

1. Mirá las tres barras: `w-36` mide 144px y `w-40` mide 160px. No hay nada en el medio.
2. Si el diseñador pide **147px exactos**, sacás el comodín: `w-[147px]`.
3. Lo mismo con colores de marca: `bg-[#FF0055]`, `bg-[#1da1f2]`.

Usalos como **último recurso**. Si llenás todo de corchetes, perdés la consistencia que te da la escala de Tailwind.

**Ojo con los valores dinámicos:** `` w-[${ancho}px] `` **no funciona**, porque Tailwind lee tu código antes de que corra y no puede adivinar cuánto vale `ancho`. Abajo de los ejemplos tenés las dos formas que sí funcionan:

1. **La prop `style`:** `style={{ width: `${ancho}px` }}`. Sirve para valores que cambian o vienen de datos.
2. **Un objeto con clases completas:** `{ chico: "w-24", mediano: "w-36" }`. Sirve cuando los valores posibles son pocos y los conocés de antemano.

> 💡 Los corchetes son tu botón de emergencia. Se usan cuando no queda otra.

## 6. Clases condicionales ⭐

**Dónde:** [/estilos#seccion-6](http://localhost:3000/estilos#seccion-6). **Código:** [components/estilos/ConditionalClassesDemo.tsx](components/estilos/ConditionalClassesDemo.tsx).

Acá se juntan cosas que ya sabés: el **estado** de React (`useState`, clase 2), las **rutas catch-all** con `useParams()` (clase 4) y las clases de Tailwind.

1. **El botón básico:** tocalo y mirá cómo `isActive` pasa de `false` a `true`, y el color cambia de gris a verde.
2. **Pestañas controladas por la URL** ⭐: tocá una pestaña y mirá la barra de direcciones, que pasa a `/estilos/envios`. La pestaña activa no se guarda en `useState`: se lee de la URL con `useParams()` y la condición es `activeSlug === tab.slug`. Probá también `/estilos/algo` (una pestaña que no existe) y fijate el mensaje rojo. Como la pestaña vive en la URL, podés copiar el link y mandárselo a alguien.
   - **Por qué `[[...tab]]` con doble corchete:** `/estilos` tiene que seguir funcionando sin ninguna pestaña (optional catch-all, clase 4). Con `[tab]` simple, `/estilos` daría 404.
   - `/estilos/practica` no se pisa con esto: las rutas fijas ganan sobre las dinámicas.
3. **El semáforo:** escribí un email. Vacío → gris, sin `@` → rojo, válido → verde.

La receta siempre es la misma:

```tsx
<button className={`px-4 py-2 ${isActive ? "bg-green-500" : "bg-gray-400"}`}>
```

- **Comillas invertidas** (`` ` ``) en vez de comillas comunes. Si no las encontrás en tu teclado, en Windows salen con `Alt` + `96`.
- `${ }` para meter JavaScript.
- Un **ternario**: `condición ? "si es true" : "si es false"`.

> 💡 Es un semáforo inteligente: el JSX le pregunta al estado "¿hay error?". Si dice que sí, inyecta la clase roja. Si no, se queda con la gris.

---

## 🧩 Práctica: maquetando nuestro catálogo

Esta práctica no está en `/estilos`: la abrís aparte.

**Punto de partida:** [/estilos/practica](http://localhost:3000/estilos/practica) → [app/estilos/practica/page.tsx](app/estilos/practica/page.tsx).
**Versión terminada:** [/products](http://localhost:3000/products) → [components/ProductCard.tsx](components/ProductCard.tsx).

Abrí el punto de partida: es una lista cruda, sin estilos. En el código hay 4 comentarios `PASO`. Andá de a uno, guardá y mirá el navegador:

1. **Grilla responsive.** Al `div` que envuelve la lista sumale `grid gap-6 md:grid-cols-2 lg:grid-cols-3`. Achicá la ventana: 1, 2 y 3 columnas.
2. **La tarjeta.** A cada producto sumale `flex flex-col rounded-xl bg-white p-5 shadow-lg`. Bonus: `transition hover:-translate-y-1`.
3. **Botón interactivo.** `rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 active:scale-95`.
4. **Sin stock → botón gris.** Pasá el `className` a comillas invertidas con un ternario sobre `product.stock === 0`: gris + `cursor-not-allowed` si no hay stock, rosa si hay. Sumá `disabled={product.stock === 0}`.

Los productos sin stock son la **Lancha Flamingo** y la **Mochila Everglades**. Fijate que en tu versión les quede el botón gris.

Cuando termines, compará con [ProductCard.tsx](components/ProductCard.tsx). La versión terminada suma algunas cosas más:

- Un **badge** verde o rojo de stock (otra clase condicional).
- `group` + `group-hover:text-pink-700`: el título cambia de color cuando pasás el mouse por **toda la tarjeta**.
- [AddToCartButton.tsx](components/AddToCartButton.tsx): al hacer clic se pone **verde** por 2 segundos. Combina el stock (props) con un `useState`.

---

## Errores que te podés cruzar

| Error | Qué pasa y cómo arreglarlo |
|---|---|
| Uso `sm:` y en el celular no cambia nada | `sm:` empieza en 640px. Lo del celular va **sin prefijo**. |
| Armé la clase con una variable (`` `bg-${color}-500` ``) y no tiene color | Tailwind solo genera las clases que encuentra **escritas completas** en el código. Escribí la clase entera: `color === "rojo" ? "bg-red-500" : "bg-blue-500"`. |
| `className="px-4 ${isActive ? ...}"` muestra el texto `${isActive...}` literal | Usaste comillas comunes. Tienen que ser **invertidas** y con llaves: `` className={`...`} ``. |
| El `dark:` no hace nada | Tu sistema está en modo claro. Emulalo desde las DevTools (sección 5). |
| Puse `hover:bg-blue-700` y no se ve el cambio | Fijate que el elemento no tenga **otro** `bg-` que lo pise, y que el color sea distinto del de base. |
| Un `<button>` adentro de un `<Link>` tira un warning | Un botón no puede ir adentro de un link. En `ProductCard` el link envuelve solo la imagen y el título. |
