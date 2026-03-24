import { useState } from "react";
import { PRIORITY_CONFIG, CAT_COLORS } from "../constants";
import { todoApi } from "../api/todoApi";

export default function TodoCard({ todo, onRefetch }) {
  const [expanded, setExpanded] = useState(false);
  const [fulfillment, setFulfillment] = useState(todo.fulfillment || 0);
  const [deleting, setDeleting] = useState(false);

  const pCfg = PRIORITY_CONFIG[todo.priority] || PRIORITY_CONFIG.Low;
  const catColor = CAT_COLORS[todo.category] || "#a78bfa";

  const handleFulfillmentChange = async (val) => {
    setFulfillment(val);
    await todoApi.update(todo._id, { fulfillment: val });
    onRefetch();
  };

  const handleDelete = () => {
    setDeleting(true);

    setTimeout(async () => {
      await todoApi.delete(todo._id);
      onRefetch();
    }, 400);
  };

  return (
     <div
      className={`todo-card group relative rounded-2xl cursor-pointer transition-all duration-500 ${
        deleting ? "scale-90 opacity-0" : "scale-100 opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(15,15,35,0.95) 0%, rgba(25,25,55,0.9) 100%)",
        border: `1px solid ${pCfg.color}33`,
        boxShadow: `0 0 0 1px ${pCfg.color}22, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Priority glow bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
        style={{
          background: pCfg.color,
          boxShadow: `0 0 12px ${pCfg.color}`,
        }}
      />

      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Category + Priority */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  color: catColor,
                  background: `${catColor}22`,
                  border: `1px solid ${catColor}44`,
                }}
              >
                {todo.category || "OTHER"}
              </span>

              <span
                className="text-xs font-black tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  color: pCfg.color,
                  background: `${pCfg.color}22`,
                }}
              >
                {pCfg.icon} {pCfg.label}
              </span>
            </div>

            {/* Task Title */}
            <h3 className="font-bold text-white text-base leading-tight truncate">
              {todo.task}
            </h3>
          </div>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-300 active:scale-95 transition-all duration-200 p-2 md:p-1 rounded-lg shrink-0"
            style={{ background: "rgba(248,113,113,0.15)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="3,6 5,6 21,6" />
              <path d="M19,6l-1,14H6L5,6" />
              <path d="M10,11v6M14,11v6" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">PROGRESS</span>

            <span
              className="text-xs font-bold"
              style={{ color: pCfg.color }}
            >
              {fulfillment}%
            </span>
          </div>

          <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
              style={{
                width: `${fulfillment}%`,
                background: `linear-gradient(90deg, ${pCfg.color}88, ${pCfg.color})`,
                boxShadow: `0 0 8px ${pCfg.color}`,
              }}
            />
          </div>
        </div>

        {/* Expanded Section */}
        <div
          className="mt-3"
        >
          {/* Description */}
          {todo.description && (
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">
              {todo.description}
            </p>
          )}

          {/* Date */}
          {todo.when && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>

              {new Date(todo.when).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}

          {/* Progress Slider */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="space-y-1"
          >
            <span className="text-xs text-slate-400">
              Drag to update progress:
            </span>

            <input
              type="range"
              min="0"
              max="100"
              value={fulfillment}
              onChange={(e) =>
                handleFulfillmentChange(parseInt(e.target.value))
              }
              className="w-full cursor-pointer"
              style={{ accentColor: pCfg.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}