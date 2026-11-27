// components/formularios/ValidationDemo.tsx
//
// Validación de formularios: SÍNCRONA vs ASÍNCRONA.
//
// Validar evita guardar basura en la base de datos y guía al usuario cuando se equivoca.
//
//   - SÍNCRONA (inmediata): reglas rápidas, en memoria, sin preguntarle nada a nadie.
//     Ej: campo obligatorio, que tenga @, mínimo 6 caracteres. → "¿el FORMATO es válido?"
//   - ASÍNCRONA: hay que consultar un servicio externo (la base de datos, una API), y tarda.
//     Ej: ¿este email ya está registrado? ¿el cupón existe? → "¿el DATO es válido para el negocio?"
//
// Es como el patovica de un boliche: mirar si traés documento es instantáneo (síncrona);
// buscarte en la lista VIP de la compu lleva un ratito (asíncrona).
//
// Regla de oro de seguridad: validar en el navegador sirve para dar feedback rápido, pero
// SIEMPRE hay que validar también en el servidor, porque el navegador se puede manipular.

"use client";

import { useState } from "react";
import { verificarEmail } from "@/app/formularios/actions";
import { inputClass, labelClass } from "@/components/formularios/styles";

type AsyncStatus = "idle" | "checking" | "available" | "taken" | "error";

export default function ValidationDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [ms, setMs] = useState(0);

  // ⚡ Validación SÍNCRONA: se calcula en cada render, al instante, sin esperar a nadie
  const rules = [
    { ok: email.length > 0, text: "El email no está vacío" },
    { ok: email.includes("@"), text: "El email tiene @" },
    { ok: password.length >= 6, text: "La contraseña tiene al menos 6 caracteres" },
  ];
  const emailFormatOk = rules[0].ok && rules[1].ok;

  // ☁️ Validación ASÍNCRONA: le preguntamos al servidor (que le pregunta a la base de datos)
  async function handleCheck() {
    setStatus("checking");
    const start = performance.now();
    try {
      const { disponible } = await verificarEmail(email); // una Server Action (sección 5)
      setStatus(disponible ? "available" : "taken");
    } catch {
      setStatus("error");
    }
    setMs(Math.round(performance.now() - start));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Columna 1: síncrona */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-amber-900">⚡ Síncrona: instantánea</p>
          <p className="text-sm text-amber-800">¿El formato es válido? Se revisa con cada tecla.</p>

          <div className="mt-4 flex flex-col gap-3">
            <div>
              <label htmlFor="val-email" className={labelClass}>
                Email
              </label>
              <input
                id="val-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle"); // si cambia el email, la consulta anterior ya no vale
                }}
                placeholder="lucia@vicecity.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="val-password" className={labelClass}>
                Contraseña
              </label>
              <input
                id="val-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <ul className="mt-4 space-y-1 text-sm">
            {rules.map((rule) => (
              <li key={rule.text} className={rule.ok ? "text-emerald-700" : "text-zinc-500"}>
                {rule.ok ? "✅" : "⬜"} {rule.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 2: asíncrona */}
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <p className="font-semibold text-sky-900">☁️ Asíncrona: consulta externa</p>
          <p className="text-sm text-sky-800">¿El dato sirve? Hay que preguntarle a la base de datos.</p>

          <div className="mt-4 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={handleCheck}
              disabled={!emailFormatOk || status === "checking"}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {status === "checking" ? "Consultando…" : "¿Ese email ya está registrado?"}
            </button>
            {!emailFormatOk && (
              <p className="text-xs text-sky-800">
                Primero lo rápido: el botón se activa cuando el email tiene formato válido. No tiene sentido
                preguntarle a la base de datos por un email sin @.
              </p>
            )}

            <div className="min-h-12 text-sm">
              {status === "checking" && <p className="animate-pulse text-sky-700">⏳ Buscando en la base de datos…</p>}
              {status === "available" && (
                <p className="font-medium text-emerald-700">✅ Está libre: podés usarlo ({ms} ms)</p>
              )}
              {status === "taken" && (
                <p className="font-medium text-red-700">❌ Ese email ya está registrado ({ms} ms)</p>
              )}
              {status === "error" && <p className="font-medium text-red-700">🔴 No pudimos consultar al servidor</p>}
            </div>

            <p className="text-xs text-sky-800">
              Probá con <code>lucia@vicecity.com</code> o <code>jason@vicecity.com</code>, que ya están registrados,
              y con un email inventado.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-pink-50 p-4 text-sm text-pink-900">
        <p className="font-semibold">🔒 La regla de oro</p>
        <p className="mt-1">
          Validar en el navegador es para darle al usuario un aviso <strong>rápido</strong>. Pero el código del
          navegador se puede manipular (cualquiera puede abrir las DevTools y saltearlo), así que{" "}
          <strong>siempre</strong> hay que volver a validar en el servidor. Eso lo vemos en la sección 6.
        </p>
      </div>
    </div>
  );
}
