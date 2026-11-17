// app/dashboard/layout.tsx
// Layout del dashboard: agrega el Sidebar a TODAS las rutas que están
// dentro de app/dashboard/ (/dashboard, /dashboard/analytics, /dashboard/settings...).
//
// Así quedan anidados al entrar a /dashboard/settings:
//   <RootLayout>            ← app/layout.tsx (navbar + footer)
//     <DashboardLayout>     ← este archivo (sidebar)
//       <SettingsPage />    ← app/dashboard/settings/page.tsx
//     </DashboardLayout>
//   </RootLayout>

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <Sidebar />
      <div className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white p-6">
        {children}
      </div>
    </div>
  );
}
