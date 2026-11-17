// app/layout.tsx  →  LAYOUT RAÍZ
//
// Pensalo como el "marco" de toda la app: lo que pongas acá aparece en TODAS las páginas.
// Por eso es el lugar ideal para la Navbar y el Footer.
//
// Dos reglas que tiene que cumplir sí o sí:
//   - Tiene que existir: Next.js no arranca sin un layout raíz.
//   - Tiene que tener las etiquetas <html> y <body>.
//
// La prop `children` es la página que estás visitando (o el layout que la envuelve).

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevStore · Demo Next.js",
  description: "Tienda de ejemplo para aprender Next.js y el App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: algunas extensiones del navegador (ColorZilla,
          Grammarly, etc.) agregan atributos al <body> y causan un "hydration error".
          Esto le dice a React que ignore esas diferencias SOLO en esta etiqueta. */}
      <body
        className="flex min-h-full flex-col bg-zinc-50 text-zinc-900"
        suppressHydrationWarning
      >
        <Navbar />

        {/* Acá adentro se renderiza la página de la ruta actual */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
