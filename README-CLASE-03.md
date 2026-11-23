# Clase 3 · Primeros pasos con Next.js

En esta clase viste cómo está armado un proyecto de Next.js y cómo el **App Router** convierte carpetas en páginas. Esta guía te lleva por cada concepto en orden: para cada uno tenés **qué abrir en el navegador** y **qué archivo mirar**.

Antes de arrancar, levantá el proyecto:

```bash
npm run dev
```

y abrí [http://localhost:3000](http://localhost:3000).

---

## 1. La estructura del proyecto

Dale una recorrida a lo que hay en la raíz. No hace falta entender todo ahora, solo saber qué es cada cosa:

| Archivo o carpeta | Para qué sirve |
|---|---|
| `app/` | Tus páginas. Cada carpeta adentro es un pedazo de la URL. |
| `public/` | Imágenes y archivos estáticos. Lo que pongas acá se accede desde `/`. |
| `package.json` | Las dependencias y los comandos (`dev`, `build`, `start`). |
| `next.config.ts` | La configuración de Next.js. |
| `proxy.ts` | Código que se ejecuta *antes* de llegar a una página (lo ves en el paso 12). |
| `tsconfig.json` | La configuración de TypeScript. Acá se define el atajo `@/` para los imports. |
| `app/globals.css` | Los estilos globales. Con Tailwind v4 alcanza con una línea. |

## 2. `page.tsx`: lo que hace que una URL exista

Abrí [/](http://localhost:3000) y después mirá [app/page.tsx](app/page.tsx). Ese archivo **es** la página de inicio.

Una carpeta sin `page.tsx` no se puede visitar. El `page.tsx` es lo que la "publica".

## 3. Segmentos y rutas anidadas

Andá a [/dashboard/settings](http://localhost:3000/dashboard/settings) y buscá el archivo: está en `app/dashboard/settings/page.tsx`.

Cada carpeta es un **segmento** de la URL. Carpeta adentro de carpeta = ruta anidada.

## 4. El layout raíz

Navegá por varias páginas: la Navbar de arriba y el Footer de abajo están **siempre**. Es porque viven en [app/layout.tsx](app/layout.tsx), el layout raíz que envuelve a toda la app.

## 5. Layouts anidados

Ahora fijate en dos detalles:

- El **banner rosa** de envíos gratis solo aparece en [/products](http://localhost:3000/products) y sus páginas hijas. Viene de [app/products/layout.tsx](app/products/layout.tsx).
- El **Sidebar** solo aparece en [/dashboard](http://localhost:3000/dashboard). Viene de [app/dashboard/layout.tsx](app/dashboard/layout.tsx).

Un `layout.tsx` adentro de una carpeta solo afecta a esa carpeta y a las que tiene adentro.

## 6. El layout conserva el estado

En el [dashboard](http://localhost:3000/dashboard), sumá unos cuantos clics en el contador del Sidebar. Después cambiá de sección (Analíticas, Configuración...).

**El número no se reinicia.** Cuando navegás, Next.js cambia solo la página; el layout queda montado y se acuerda de todo. El código está en [components/ClickCounter.tsx](components/ClickCounter.tsx).

## 7. `loading.tsx`: pantalla de carga

Entrá a [/products](http://localhost:3000/products). Durante un segundo y medio vas a ver tarjetas grises que "laten". Esa demora es a propósito, para que llegues a ver [app/products/loading.tsx](app/products/loading.tsx) en acción.

## 8. Rutas dinámicas con `[id]`

Probá estas tres URLs:

- [/products/1](http://localhost:3000/products/1)
- [/products/4](http://localhost:3000/products/4)
- [/products/999](http://localhost:3000/products/999) → no existe ese producto

Las tres usan **el mismo archivo**: [app/products/[id]/page.tsx](app/products/[id]/page.tsx). Los corchetes hacen que esa parte de la URL sea variable. Cuando el producto no existe, se muestra [app/products/[id]/not-found.tsx](app/products/[id]/not-found.tsx).

## 9. `error.tsx`: cuando algo se rompe

Andá a [/dashboard/reports](http://localhost:3000/dashboard/reports) y tocá el botón rojo.

En lugar de que se caiga todo el sitio, aparece la pantalla de [app/dashboard/error.tsx](app/dashboard/error.tsx). Fijate que **el Sidebar sigue funcionando**: el error solo reemplaza el contenido de la página. Con "Intentar de nuevo" la recuperás.

## 10. `not-found.tsx` global

Escribí cualquier cosa en la URL, por ejemplo [/cualquier-cosa](http://localhost:3000/cualquier-cosa). Eso es [app/not-found.tsx](app/not-found.tsx).

## 11. `route.ts`: un endpoint de API

Abrí [/api/products](http://localhost:3000/api/products). No ves una página: ves **JSON**. Un `route.ts` no muestra pantallas, responde datos. Mirá lo corto que es [app/api/products/route.ts](app/api/products/route.ts).

## 12. `proxy.ts`: código que corre antes

Abrí la terminal donde está corriendo `npm run dev` y navegá por el dashboard. Cada vez que entrás a una página aparece un mensaje `[proxy] Alguien entró a: ...`. Eso lo escribe [proxy.ts](proxy.ts).

## 13. Server Components vs Client Components

Compará estos dos archivos:

- [components/Footer.tsx](components/Footer.tsx) → **Server Component**. Solo muestra contenido, no necesita nada más.
- [components/Navbar.tsx](components/Navbar.tsx) → **Client Component**. Tiene `"use client"` arriba de todo porque usa `usePathname()` para saber en qué página estás y resaltar el link activo.

Regla práctica: si tu componente usa hooks (`useState`, `usePathname`...) o eventos (`onClick`), necesita `"use client"`.

---

## 🧩 Desafío: creá tu propia página `/about`

1. Creá la carpeta `app/about/` y adentro un archivo `page.tsx` que exporte un componente con un título.
2. Entrá a [/about](http://localhost:3000/about) y comprobá que funciona.
3. Agregá el link en la lista `links` de [components/Navbar.tsx](components/Navbar.tsx).

**Bonus:** ¿qué pasa si en lugar de `page.tsx` llamás al archivo `about.tsx`? Probalo y pensá por qué.

<details>
<summary>Ver la respuesta</summary>

Da **404**. Next.js solo convierte en página a los archivos que se llaman exactamente `page.tsx`. Cualquier otro nombre lo trata como un archivo común (por ejemplo, un componente).

</details>
