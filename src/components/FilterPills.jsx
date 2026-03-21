import { PRIORITY_CONFIG, CAT_COLORS, CATEGORIES, PRIORITIES } from "../constants";

const FILTER_OPTIONS = ["All", ...PRIORITIES, ...CATEGORIES];

export default function FilterPills({ filter, setFilter }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
      {FILTER_OPTIONS.map(f => {
        const isActive = filter === f;
        const color =
          f === "All"
            ? "#818cf8"
            : PRIORITY_CONFIG[f]?.color || CAT_COLORS[f] || "#818cf8";

        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-bold tracking-widest shrink-0 transition-all duration-200"
            style={{
              color:      isActive ? color : "rgba(255,255,255,0.3)",
              background: isActive ? `${color}22` : "rgba(255,255,255,0.03)",
              border:     `1px solid ${isActive ? color : "rgba(255,255,255,0.06)"}`,
              boxShadow:  isActive ? `0 0 12px ${color}44` : "none",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {f.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}