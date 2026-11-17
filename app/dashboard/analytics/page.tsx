// app/dashboard/analytics/page.tsx  →  URL: /dashboard/analytics

const sales = [
  { month: "Julio", amount: 40 },
  { month: "Agosto", amount: 65 },
  { month: "Septiembre", amount: 52 },
  { month: "Octubre", amount: 80 },
  { month: "Noviembre", amount: 95 },
];

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Analíticas</h1>
      <p className="mt-1 text-zinc-600">Ventas de los últimos meses.</p>

      <ul className="mt-6 flex flex-col gap-3">
        {sales.map((item) => (
          <li key={item.month} className="flex items-center gap-3">
            <span className="w-24 text-sm text-zinc-600">{item.month}</span>
            <div className="h-6 flex-1 rounded bg-zinc-100">
              <div
                className="h-6 rounded bg-violet-500"
                style={{ width: `${item.amount}%` }}
              />
            </div>
            <span className="w-10 text-right text-sm font-semibold">
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
