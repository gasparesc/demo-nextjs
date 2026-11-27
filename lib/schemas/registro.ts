// lib/schemas/registro.ts
//
// El ESQUEMA de Zod del formulario de registro (clase 7).
//
// Un esquema es la descripción de cómo tienen que ser los datos. Reemplaza a todos los
// "if" que escribíamos a mano: Zod los revisa por nosotros y arma los mensajes de error.
//
// Lo lindo: este MISMO archivo se usa en dos lugares:
//   - En el navegador, con React Hook Form, para avisar al instante (feedback rápido).
//   - En el servidor, dentro de la Server Action, para revisar de nuevo (seguridad).
// Las reglas se escriben UNA sola vez.

import { z } from "zod";

export const registroSchema = z.object({
  // z.email() revisa que sea un email válido. (En Zod 3 se escribía z.string().email())
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

// A partir del esquema, Zod nos arma el TIPO de TypeScript: { email: string; password: string }
export type RegistroInput = z.infer<typeof registroSchema>;
