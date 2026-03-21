export default function StatsBar({ todos }) {
  const total      = todos.length;
  const done       = todos.filter(t => t.fulfillment >= 100).length;
  const high       = todos.filter(t => t.priority === "High").length;
  const avgProgress = total
    ? Math.round(todos.reduce((sum, t) => sum + (t.fulfillment || 0), 0) / total)
    : 0;

  const stats = [
    { label: "TOTAL",  value: total,          color: "#818cf8" },
    { label: "DONE",   value: done,            color: "#4ade80" },
    { label: "URGENT", value: high,            color: "#f87171" },
    { label: "AVG %",  value: `${avgProgress}%`, color: "#facc15" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {stats.map(s => (
        <div
          key={s.label}
          className="rounded-2xl p-3 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}22` }}
        >
          <div
            className="text-2xl font-black"
            style={{ color: s.color, fontFamily: "'Exo 2', sans-serif", textShadow: `0 0 20px ${s.color}66` }}
          >
            {s.value}
          </div>
          <div className="text-xs text-slate-600 tracking-widest mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}