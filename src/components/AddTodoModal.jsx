import { useState } from "react";
import { CATEGORIES, PRIORITIES, PRIORITY_CONFIG } from "../constants";
import { todoApi } from "../api/todoApi";

const DEFAULT_FORM = {
  task:        "",
  description: "",
  category:    "Work",
  when:        "",
  priority:    "Medium",
  fulfillment: 0,
};

export default function AddTodoModal({ onClose, onCreated }) {
  const [form,    setForm]    = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.task.trim()) return;
    setLoading(true);
    try {
      await todoApi.create(form);
      onCreated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-md" style={{ background: "rgba(5,5,20,0.85)" }} />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,40,0.98) 0%, rgba(20,20,60,0.96) 100%)",
          border:     "1px solid rgba(129,140,248,0.3)",
          boxShadow:  "0 0 0 1px rgba(129,140,248,0.1), 0 40px 80px rgba(0,0,0,0.8), 0 0 80px rgba(129,140,248,0.1)",
          animation:  "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.8), transparent)" }}
        />

        <div className="p-6">
          {/* Modal header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-xl font-black text-white"
                style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: "-0.5px" }}
              >
                NEW TASK
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 tracking-widest">CREATE · ACHIEVE · CONQUER</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-300 transition-colors p-2 rounded-xl hover:bg-white/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6"  x2="6"  y2="18" />
                <line x1="6"  y1="6"  x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Task name */}
            <div>
              <label className="text-xs font-bold text-slate-500 tracking-widest block mb-1.5">
                TASK NAME *
              </label>
              <input
                value={form.task}
                onChange={e => handleChange("task", e.target.value)}
                placeholder="What needs to be done?"
                required
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border:     "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Exo 2', sans-serif",
                }}
                onFocus={e => {
                  e.target.style.borderColor = "rgba(129,140,248,0.5)";
                  e.target.style.boxShadow   = "0 0 20px rgba(129,140,248,0.1)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = "rgba(255,255,255,0.08)";
                  e.target.style.boxShadow   = "none";
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-500 tracking-widest block mb-1.5">
                DESCRIPTION
              </label>
              <textarea
                value={form.description}
                onChange={e => handleChange("description", e.target.value)}
                placeholder="Add details..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none transition-all duration-200 resize-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border:     "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={e => { e.target.style.borderColor = "rgba(129,140,248,0.5)"; }}
                onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
              />
            </div>

            {/* Category + Due date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-widest block mb-1.5">
                  CATEGORY
                </label>
                <select
                  value={form.category}
                  onChange={e => handleChange("category", e.target.value)}
                  className="w-full px-3 py-3 rounded-xl text-white text-sm outline-none"
                  style={{ background: "rgba(15,15,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 tracking-widest block mb-1.5">
                  DUE DATE
                </label>
                <input
                  type="date"
                  value={form.when}
                  onChange={e => handleChange("when", e.target.value)}
                  className="w-full px-3 py-3 rounded-xl text-white text-sm outline-none"
                  style={{
                    background:  "rgba(15,15,40,0.9)",
                    border:      "1px solid rgba(255,255,255,0.1)",
                    colorScheme: "dark",
                  }}
                />
              </div>
            </div>

            {/* Priority selector */}
            <div>
              <label className="text-xs font-bold text-slate-500 tracking-widest block mb-2">
                PRIORITY
              </label>
              <div className="flex gap-2">
                {PRIORITIES.map(p => {
                  const cfg      = PRIORITY_CONFIG[p];
                  const isActive = form.priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleChange("priority", p)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all duration-200"
                      style={{
                        color:      cfg.color,
                        background: isActive ? `${cfg.color}22` : "rgba(255,255,255,0.03)",
                        border:     `1px solid ${isActive ? cfg.color : "rgba(255,255,255,0.08)"}`,
                        boxShadow:  isActive ? `0 0 16px ${cfg.glow}` : "none",
                      }}
                    >
                      {cfg.icon} {p.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color:      "white",
                boxShadow:  "0 0 30px rgba(99,102,241,0.4), 0 4px 20px rgba(0,0,0,0.4)",
                fontFamily: "'Exo 2', sans-serif",
              }}
            >
              {loading ? "CREATING..." : "⚡ CREATE TASK"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}