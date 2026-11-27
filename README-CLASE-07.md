# Clase 7 · Formularios modernos en React y Next.js

Hasta la clase 6 solo **leíamos** datos. Hoy empezamos a **enviarlos**. Vas a ver los dos patrones clásicos de React (controlados y no controlados), cómo validar, y la forma moderna de Next.js: **Server Actions** con **useActionState**. Al final, lo mismo a escala con **React Hook Form + Zod**.

## Antes de empezar

Esta clase suma **3 librerías nuevas** (para la sección 8). Si bajaste los cambios del repo, instalalas:

```bash
npm install
npm run dev
```

> 🔁 Si ya tenías `npm run dev` corriendo, frenalo (`Ctrl+C`) y volvé a levantarlo después del `npm install`.

Abrí [http://localhost:3000/formularios](http://localhost:3000/formularios) (también está en la Navbar como **Formularios**). Es un laboratorio con **una sección por tema** y un índice arriba. Abajo de cada sección, en gris, te dice **en qué archivo está el código**.

> 💡 Tené a la vista **la terminal** donde corre `npm run dev`: desde la sección 5, ahí van a aparecer mensajes que manda el **servidor**.

## Qué hay de nuevo en el proyecto

```
app/formularios/
├── page.tsx                    → /formularios · el laboratorio (una sección por tema)
├── actions.ts                  → Las Server Actions del laboratorio ("use server")
├── practica/                   → /formularios/practica · el PUNTO DE PARTIDA de la práctica
│   ├── page.tsx
│   └── RegistroForm.tsx        → Un formulario que todavía no hace nada
└── registro/                   → /formularios/registro · la práctica TERMINADA
    ├── page.tsx
    ├── actions.ts              → registrarUsuario(prevState, formData)
    └── RegistroForm.tsx        → useActionState

components/formularios/         → Una demo por tema
├── PillarsDemo.tsx             → Los 3 pilares y el <label htmlFor>
├── ControlledDemo.tsx          → useState + onChange + preventDefault
├── UncontrolledDemo.tsx        → FormData y el atributo name
├── ValidationDemo.tsx          → Validación síncrona vs asíncrona
├── ServerActionDemo.tsx        → <form action={crearUsuario}>
├── ServerValidationDemo.tsx    → Validar en el servidor y devolver un objeto
├── ActionStateDemo.tsx         → useActionState: state, formAction, isPending
├── RhfZodDemo.tsx              → React Hook Form + Zod
└── styles.ts                   → Las clases de Tailwind de los inputs y botones

lib/
├── usuarios.ts                 → Una "base de datos" de mentira, en la memoria del servidor
└── schemas/registro.ts         → El esquema de Zod (se usa en el navegador y en el servidor)

package.json                    → (actualizado) react-hook-form, zod y @hookform/resolvers
```

---

## 1. Formularios en la web: los 3 pilares

**Dónde:** [/formularios#seccion-1](http://localhost:3000/formularios#seccion-1). **Código:** [components/formularios/PillarsDemo.tsx](components/formularios/PillarsDemo.tsx).

Todo buen formulario cuida 3 cosas:

| Pilar | Qué es |
|---|---|
| **Accesibilidad** | HTML semántico: cada campo con su `<label htmlFor="...">`, y que se pueda usar solo con el teclado (`Tab`). |
| **Validación** | Avisarle al usuario si le falta un dato o si tiene mal formato. |
| **Serialización** | Juntar los datos limpios y mandarlos al servidor. |

1. Hacé clic en la palabra **«Email»** de cada recuadro. En el rojo (un `<p>` suelto) no pasa nada. En el verde (`<label htmlFor>`) el cursor salta al campo.
2. Mirá el código: el `htmlFor` del label es **igual** al `id` del input. Así quedan conectados.
3. Hacé clic en un campo y apretá `Tab`: el foco salta al siguiente. Un buen formulario se llena entero sin mouse.

> 💡 Un buen formulario es como la ventanilla de trámites de un banco: carteles claros (accesibilidad), un empleado que revisa si te faltó firmar (validación) y una carpeta ordenada con los papeles (serialización).

## 2. Patrón 1: componentes controlados (el clásico)

**Dónde:** [/formularios#seccion-2](http://localhost:3000/formularios#seccion-2). **Código:** [components/formularios/ControlledDemo.tsx](components/formularios/ControlledDemo.tsx).

El estado de React (`useState`) es la **única fuente de verdad** del input: cada letra dispara `onChange` y actualiza el estado.

1. Escribí en los campos y mirá a la derecha: el estado `values` cambia **letra por letra**, y el contador de **re-renders** sube con cada tecla.
2. Mirá el contador de caracteres de la contraseña: como el valor está en el estado, podemos reaccionar **mientras** escribís. Para eso sirve este patrón: buscadores en vivo, contadores, etc.
3. Tocá **Enviar**: los datos aparecen abajo sin recargar la página.
4. Ahora marcá **"Olvidarme del event.preventDefault()"** y volvé a enviar. 😱 La página se **recarga entera**, lo que escribiste se borra, y en la barra de direcciones quedaron tus datos… **¡incluida la contraseña!** Eso hace el navegador por defecto (el HTML de los años 90). `event.preventDefault()` lo frena.

**La contra:** cada tecla re-renderiza el componente entero. Con un formulario de 15 campos, se nota.

> 💡 Un formulario controlado es como un copiloto súper atento que anota cada milímetro que girás el volante: sabe todo lo que pasa, pero se cansa rápido si el viaje es largo.

## 3. Patrón 2: no controlados y FormData

**Dónde:** [/formularios#seccion-3](http://localhost:3000/formularios#seccion-3). **Código:** [components/formularios/UncontrolledDemo.tsx](components/formularios/UncontrolledDemo.tsx).

Acá **no** usamos un `useState` por campo: el navegador guarda lo que escribís, y leemos todo **junto** al apretar Enviar, con `new FormData(form)`.

1. Fijate en el código: los inputs no tienen `value` ni `onChange`. Solo tienen **`name`**.
2. Escribí en los 3 campos: el contador de re-renders queda en **0**. React ni se entera de lo que tipeás.
3. Tocá **Enviar** y mirá lo que leyó FormData. El teléfono dice **`null`** aunque lo hayas escrito: ese input **no tiene `name`**, y sin `name` el campo no viaja.

**Requisito indispensable:** cada `<input>` tiene que tener su atributo `name="..."`.

"No controlado" no significa "descontrolado" ni "malo": hoy es el patrón más usado para formularios comunes, porque aprovecha lo que ya hace el navegador. Y es el que usan las Server Actions (sección 5).

> 💡 Es como llenar una planilla en papel en el médico: nadie te mira letra por letra. Recién cuando entregás la hoja, leen todos los campos juntos.

## 4. Validación: síncrona vs asíncrona

**Dónde:** [/formularios#seccion-4](http://localhost:3000/formularios#seccion-4). **Código:** [components/formularios/ValidationDemo.tsx](components/formularios/ValidationDemo.tsx).

| | Síncrona ⚡ | Asíncrona ☁️ |
|---|---|---|
| ¿Qué revisa? | ¿El **formato** es válido? | ¿El **dato** sirve para el negocio? |
| ¿Cómo? | Reglas rápidas, en memoria | Consulta a la base de datos o a una API |
| ¿Cuánto tarda? | Nada: es instantánea | Un ratito: hay que esperar la respuesta |
| Ejemplos | Campo obligatorio, que tenga `@`, mínimo 6 caracteres | ¿Este email ya está registrado? ¿El cupón existe? |

1. Escribí en la columna amarilla: las reglas se ponen en verde **al instante**, con cada tecla.
2. El botón azul se activa recién cuando el email tiene un formato válido: no tiene sentido preguntarle a la base de datos por un email sin `@`.
3. Probá con **`lucia@vicecity.com`** (ya registrado) y con un email inventado. Fijate el «Consultando…»: esa espera es la validación **asíncrona**.

> 🔒 **La regla de oro:** validar en el navegador sirve para dar feedback **rápido**, pero el navegador se puede manipular. **Siempre** hay que validar también en el servidor (sección 6).

> 💡 La validación síncrona es el patovica mirando si trajiste documento (lo ve en un segundo). La asíncrona es cuando te busca en la lista VIP en la compu.

## 5. Lo que se usa hoy en Next.js: Server Actions ⭐

**Dónde:** [/formularios#seccion-5](http://localhost:3000/formularios#seccion-5). **Código:** [components/formularios/ServerActionDemo.tsx](components/formularios/ServerActionDemo.tsx) y [app/formularios/actions.ts](app/formularios/actions.ts).

Le pasamos una función **directamente** al `action={...}` del `<form>`. Como esa función está en un archivo con `"use server"`, corre en el **servidor** y recibe automáticamente un `FormData` con todos los inputs.

1. Completá nombre y email y tocá **Crear usuario**. El usuario aparece en la lista de la derecha.
2. Mirá **la terminal** donde corre `npm run dev`: está el mensaje `📨 Llegó un formulario al servidor`. Ese `console.log` **no** aparece en la consola del navegador: la función corrió en el servidor.
3. Abrí [ServerActionDemo.tsx](components/formularios/ServerActionDemo.tsx) y fijate todo lo que **no** tiene: ni `"use client"`, ni `useState`, ni `onSubmit`, ni `preventDefault`, ni una ruta de API.

> 🗂️ La "base de datos" es de mentira: una lista en la memoria del servidor ([lib/usuarios.ts](lib/usuarios.ts)). Se borra cada vez que reiniciás `npm run dev`.

> 💡 Antes, enviar un formulario era mandar una carta al correo (una ruta de API) para que la reenvíen a la oficina. Con Server Actions, tenés un tubo neumático directo desde el botón hasta la oficina del servidor.

## 6. Next.js sin librerías (1/2): validar en la Server Action

**Dónde:** [/formularios#seccion-6](http://localhost:3000/formularios#seccion-6). **Código:** [components/formularios/ServerValidationDemo.tsx](components/formularios/ServerValidationDemo.tsx) y `registrarUsuario` en [app/formularios/actions.ts](app/formularios/actions.ts).

Validamos **adentro de la Server Action**, con `if` de JavaScript puro. Y en vez de tirar un error (`throw`) que rompe la pantalla, **devolvemos** un objeto: `{ error: "..." }` o `{ success: true, message: "..." }`.

1. Tocá **Registrarme** con todo vacío: te frena el **navegador** (por el `required` del input).
2. Marcá **"Saltear la validación del navegador"** (como haría alguien que quiere hacer trampa) y volvé a probar: ahora el envío pasa… y te frena el **servidor**. Por eso siempre se valida en el servidor.
3. Probá un email sin `@`, una contraseña corta y, por último, datos correctos. A la derecha ves **el objeto que devolvió el servidor**, tal cual.

¿Por qué la función recibe `prevState` como **primer** parámetro? Porque la conectamos con `useActionState` (sección 7), que le pasa el estado anterior y después el `FormData`.

> 💡 En vez de cortarte el teléfono en la cara (`throw`), el servidor te manda una nota prolija: «Che, te faltó el @ en el mail, corregilo y mandalo de nuevo».

## 7. Next.js sin librerías (2/2): feedback con `useActionState` ⭐

**Dónde:** [/formularios#seccion-7](http://localhost:3000/formularios#seccion-7). **Código:** [components/formularios/ActionStateDemo.tsx](components/formularios/ActionStateDemo.tsx).

`useActionState` (un hook de **React**) conecta la Server Action con el formulario y devuelve 3 cosas:

```tsx
const [state, formAction, isPending] = useActionState(registrarUsuario, initialState);
```

| | Qué es | Para qué lo usamos |
|---|---|---|
| `state` | Lo último que devolvió el servidor | Mostrar `state.error` en rojo o `state.message` en verde |
| `formAction` | La acción, lista para el formulario | `<form action={formAction}>` |
| `isPending` | `true` mientras el servidor trabaja | Deshabilitar el botón y mostrar «Enviando…» |

1. Tocá **Registrarme**: durante 1 segundo el botón se apaga y dice «Enviando…». (En el servidor hay una demora de mentira para que se vea.) Así nadie hace doble clic en "Registrar" o "Comprar".
2. Probá con errores: el mensaje rojo es el `state.error` del servidor.
3. Registrá un email **nuevo**: sale el mensaje verde. Ahora registralo **otra vez**: el servidor te avisa que ya existe (¡validación asíncrona en el servidor!).

Este componente lleva `"use client"` porque usa un hook. Pero la lógica importante (validar y guardar) sigue corriendo **100% en el servidor**.

> 💡 `useActionState` es el seguimiento de un envío: te muestra el último mensaje (`state`), te da el botón para despachar el paquete (`formAction`) y prende la luz de «En camino…» (`isPending`) para que no lo mandes dos veces.

## 8. El mismo flujo, a escala: React Hook Form + Zod

**Dónde:** [/formularios#seccion-8](http://localhost:3000/formularios#seccion-8). **Código:** [components/formularios/RhfZodDemo.tsx](components/formularios/RhfZodDemo.tsx) y [lib/schemas/registro.ts](lib/schemas/registro.ts).

Lo de las secciones 6 y 7 es perfecto para formularios chicos (login, contacto). Cuando el formulario tiene 15 campos y reglas complicadas, la industria suma dos librerías:

- **Zod** reemplaza los `if` a mano por un **esquema**. Y ese mismo esquema se usa en el navegador **y** en el servidor: las reglas se escriben una sola vez.
- **React Hook Form** reemplaza el manejo a mano: te da `register()`, los errores de **cada campo** e `isSubmitting`.

1. Escribí un email sin `@` y pasá al campo siguiente: el error aparece **debajo de ese campo**, al instante, sin ir al servidor.
2. Corregilo: el error desaparece mientras escribís.
3. Con todo bien, tocá **Registrarme**: recién ahí viaja al servidor, que **vuelve** a validar con el mismo esquema.

| React Hook Form + Zod | ≈ Lo que hicimos a mano |
|---|---|
| `z.object({ ... })` | Los `if` de la Server Action (sección 6) |
| `register("email")` | `name="email"` |
| `errors.email?.message` | `state.error` |
| `isSubmitting` | `isPending` |
| `handleSubmit(onSubmit)` | `preventDefault()` + `FormData` |

> ℹ️ En **Zod 4** (la versión que usamos) el email se valida con `z.email("...")`. En tutoriales y ejemplos más viejos vas a ver `z.string().email("...")`: es lo mismo, pero en Zod 4 esa forma quedó vieja.

> 💡 Validar con `if` y `useActionState` es atornillar 4 tornillos con un destornillador: rápido y sin cargar herramientas. React Hook Form + Zod es sacar el taladro cuando tenés que armar una cocina entera.

---

## 🧩 Práctica: un formulario completo, sin librerías

Esta práctica no está en `/formularios`: se abre aparte.

**Punto de partida:** [/formularios/practica](http://localhost:3000/formularios/practica) → [app/formularios/practica/RegistroForm.tsx](app/formularios/practica/RegistroForm.tsx).
**Versión terminada:** [/formularios/registro](http://localhost:3000/formularios/registro) → [app/formularios/registro/](app/formularios/registro/actions.ts).

El punto de partida es un formulario con estilos, `<label>` y `name`, pero que todavía no hace nada (si tocás el botón, la página se recarga: ¿te acordás por qué?). Seguí los pasos **en orden**:

**1 y 2. Creá la Server Action.** Hacé un archivo nuevo **al lado** del formulario, `app/formularios/practica/actions.ts`, con esto:

```ts
"use server";

// Lo que le devolvemos al formulario
export type Estado = {
  error?: string;
  success?: string;
};

export async function registrarUsuario(prevState: Estado, formData: FormData): Promise<Estado> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email.includes("@")) {
    return { error: "El email tiene que tener un @." };
  }
  if (password.length < 6) {
    return { error: "La contraseña tiene que tener al menos 6 caracteres." };
  }

  return { success: `¡Listo! ${email} quedó registrado.` };
}
```

> ⚠️ No te saltees el `type Estado` ni el `: Promise<Estado>`. Sin eso, TypeScript se queja en el paso 3 con un error muy difícil de leer.

**3. Conectá la acción con el formulario.** En `RegistroForm.tsx`:

```tsx
// a) Arriba, debajo de "use client":
import { useActionState } from "react";
import { registrarUsuario } from "./actions";

// b) Adentro de la función, antes del return:
const [state, formAction, isPending] = useActionState(registrarUsuario, {});

// c) En el <form>:
<form action={formAction} className="...">
```

**4. Mostrá la respuesta y bloqueá el botón:**

```tsx
{state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
{state?.success && <p className="text-sm font-medium text-green-600">{state.success}</p>}

<button type="submit" disabled={isPending} className="...">
  {isPending ? "Enviando…" : "Registrarme"}
</button>
```

**5. (Bonus) Simulá una demora.** Como primera línea de `registrarUsuario`, en `actions.ts`:

```ts
await new Promise((resolve) => setTimeout(resolve, 1000));
```

Ahora vas a ver el botón en «Enviando…» y apagado durante un segundo, antes del error o del éxito.

---

## Errores que te podés cruzar

| Error | Qué pasa y cómo arreglarlo |
|---|---|
| `Module not found: Can't resolve 'react-hook-form'` (o `'zod'`) | Te faltan las librerías nuevas. Corré `npm install` y reiniciá `npm run dev`. |
| `formData.get("email")` devuelve `null` | El input no tiene el atributo `name="email"` (o tiene otro nombre). |
| Al enviar, la página se recarga y los datos aparecen en la URL | En un formulario con `onSubmit`, te falta `event.preventDefault()`. En uno con Server Action, te falta `action={...}` en el `<form>`. |
| Un error que dice que `useActionState` (o `useState`) solo funciona en un *Client Component* | Te falta `"use client"` arriba de todo en el archivo del formulario. |
| Un error al pasarle la función al formulario, que habla de funciones y Client Components | Te falta `"use server"` arriba de todo en `actions.ts`. |
| `No overload matches this call` en `useActionState` | La acción no tiene tipo de retorno. Agregale `type Estado` y `: Promise<Estado>` como en la práctica. |
| El `console.log` de la Server Action no aparece en el navegador | Es correcto: corre en el servidor. Buscalo en **la terminal** de `npm run dev`. |
| Los usuarios que registré desaparecieron | La "base de datos" de mentira vive en la memoria: se borra al reiniciar `npm run dev`. |
| El botón no se deshabilita mientras envía | Te falta `disabled={isPending}` en el `<button>`. |
