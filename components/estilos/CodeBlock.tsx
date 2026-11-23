// components/estilos/CodeBlock.tsx
//
// Caja oscura para mostrar código en la UI, con un título opcional (el nombre del archivo).
// Además pinta el código con colores ("resaltado de sintaxis"), para que se entienda mejor:
//
//   rosa      → palabras clave de JavaScript (const, import, return...)
//   celeste   → etiquetas de JSX (<button>, <Link>)
//   amarillo  → atributos (className, href) y funciones o hooks (useParams, includes)
//   verde     → textos entre comillas (acá van las clases de Tailwind)
//   naranja   → el ternario (? :), los operadores (===, ??), números, true/false y ${ }
//   gris      → comentarios
//
// El resaltador es un mini "tokenizador" que escribimos nosotros (sin librerías):
// recorre el texto letra por letra y le va asignando un color a cada pedacito.
// Es un Server Component: los colores se calculan en el servidor, no en el navegador.

import type { ReactNode } from "react";

// Tailwind necesita ver las clases completas, por eso están escritas enteras (no armadas a pedazos)
const colors = {
  keyword: "text-pink-400",
  tag: "text-cyan-300",
  attribute: "text-yellow-200",
  func: "text-yellow-300",
  string: "text-emerald-300",
  operator: "text-orange-300",
  comment: "text-zinc-500 italic",
} as const;

type Kind = keyof typeof colors;

const keywords = new Set([
  "const", "let", "var", "function", "return", "import", "export", "from",
  "default", "if", "else", "new", "typeof", "as", "type", "async", "await",
]);
const literals = new Set(["true", "false", "null", "undefined"]);

// Pinta un pedacito de texto con el color de su tipo
function paint(kind: Kind, text: string, key: string) {
  return (
    <span key={key} className={colors[kind]}>
      {text}
    </span>
  );
}

// Recorre el código desde la posición `start`.
// Si `insideBraces` es true, estamos adentro de un ${ ... } y paramos en la llave que lo cierra.
function tokenize(
  code: string,
  start: number,
  insideBraces: boolean,
): { nodes: ReactNode[]; end: number } {
  const nodes: ReactNode[] = [];
  let plain = ""; // texto sin color que vamos juntando
  let depth = 0; // llaves { } abiertas adentro de un ${ }
  let i = start;
  let count = 0; // contador para darle a cada trozo de color una "key" única (React la pide en las listas)

  // Antes de pintar algo con color, "soltamos" el texto plano acumulado
  const flush = () => {
    if (plain) nodes.push(plain);
    plain = "";
  };
  const add = (kind: Kind, text: string) => {
    flush();
    nodes.push(paint(kind, text, `${start}-${count++}`));
  };

  while (i < code.length) {
    const rest = code.slice(i);
    const char = code[i];

    // Fin de un ${ ... }
    if (insideBraces && char === "}" && depth === 0) break;
    if (insideBraces && char === "{") depth++;
    if (insideBraces && char === "}") depth--;

    // 1) Comentarios: // hasta el final de la línea
    let match = rest.match(/^\/\/[^\n]*/);
    if (match) {
      add("comment", match[0]);
      i += match[0].length;
      continue;
    }

    // 2) Textos entre comillas simples o dobles.
    //    Las comillas dobles pueden ocupar varias líneas (como un className largo en JSX).
    match = rest.match(/^"(?:[^"\\]|\\.)*"|^'(?:[^'\\\n]|\\.)*'/);
    if (match) {
      add("string", match[0]);
      i += match[0].length;
      continue;
    }

    // 3) Template literal (comillas invertidas): texto verde con ${ expresiones } adentro
    if (char === "`") {
      add("string", "`");
      i++;
      let text = "";
      const flushText = () => {
        if (text) add("string", text);
        text = "";
      };
      while (i < code.length && code[i] !== "`") {
        if (code.startsWith("${", i)) {
          flushText();
          add("operator", "${");
          i += 2;
          const inner = tokenize(code, i, true);
          flush();
          nodes.push(...inner.nodes);
          i = inner.end;
          add("operator", "}");
          i++;
        } else {
          text += code[i];
          i++;
        }
      }
      flushText();
      if (i < code.length) {
        add("string", "`");
        i++;
      }
      continue;
    }

    // 4) Etiquetas JSX: <button, </Link, <div ...  (no confundir con <{ de los genéricos)
    match = rest.match(/^<\/?[A-Za-z][\w.]*/);
    if (match) {
      const bracket = match[0].startsWith("</") ? "</" : "<";
      plain += bracket;
      add("tag", match[0].slice(bracket.length));
      i += match[0].length;
      continue;
    }

    // 5) Palabras: keywords, hooks, funciones, atributos, true/false
    match = rest.match(/^[A-Za-z_$][\w$]*/);
    if (match) {
      const word = match[0];
      const after = code.slice(i + word.length);
      if (keywords.has(word)) add("keyword", word);
      else if (literals.has(word)) add("operator", word);
      else if (/^=(?![=>])/.test(after)) add("attribute", word); // className=  href=
      else if (/^\(/.test(after) || /^use[A-Z]/.test(word)) add("func", word);
      else plain += word;
      i += word.length;
      continue;
    }

    // 6) Números
    match = rest.match(/^\d+(\.\d+)?/);
    if (match) {
      add("operator", match[0]);
      i += match[0].length;
      continue;
    }

    // 7) Operadores: ===, !==, =>, ??, &&, ||
    match = rest.match(/^(===|!==|=>|\?\?|&&|\|\|)/);
    if (match) {
      add("operator", match[0]);
      i += match[0].length;
      continue;
    }

    // 8) El ternario: un ? o : rodeado de espacios (condición ? si : no)
    if ((char === "?" || char === ":") && /\s/.test(code[i - 1] ?? "") && /\s/.test(code[i + 1] ?? "")) {
      add("operator", char);
      i++;
      continue;
    }

    plain += char;
    i++;
  }

  flush();
  return { nodes, end: i };
}

// Versión chiquita para CSS: selectores, propiedades, valores y comentarios
function highlightCss(code: string): ReactNode[] {
  const pattern =
    /(\/\*[\s\S]*?\*\/)|(\.[\w-]+)|(:hover|:focus|:active)|([\w-]+)(?=\s*:)|(#[0-9a-fA-F]{3,8}|\b\d+(?:\.\d+)?(?:rem|px|%)?)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const m of code.matchAll(pattern)) {
    const index = m.index ?? 0;
    if (index > last) nodes.push(code.slice(last, index));
    const kind: Kind = m[1] ? "comment" : m[2] ? "tag" : m[3] ? "keyword" : m[4] ? "attribute" : "operator";
    nodes.push(paint(kind, m[0], `css-${index}`));
    last = index + m[0].length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}

export default function CodeBlock({
  title,
  language = "tsx",
  children,
}: {
  title?: string;
  language?: "tsx" | "css";
  children: string;
}) {
  const content = language === "css" ? highlightCss(children) : tokenize(children, 0, false).nodes;

  return (
    <div className="overflow-hidden rounded-lg bg-zinc-900 text-xs">
      {title && (
        <p className="border-b border-zinc-700 px-4 py-2 font-mono text-zinc-400">
          {title}
        </p>
      )}
      {/* overflow-x-auto: si una línea es muy larga, aparece scroll horizontal
          solo en esta caja (y no se rompe toda la página en el celular) */}
      <pre className="overflow-x-auto p-4 leading-relaxed text-zinc-100">
        <code>{content}</code>
      </pre>
    </div>
  );
}
