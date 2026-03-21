export default function SearchBar({ search, setSearch, sortBy, setSortBy, onAddClick }) {
  return (
    <div className="flex gap-3 mb-4">
      {/* Search input */}
      <div className="flex-1 relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none"
          style={{
            background:  "rgba(255,255,255,0.04)",
            border:      "1px solid rgba(255,255,255,0.08)",
            fontFamily:  "'Space Mono', monospace",
            fontSize:    "12px",
          }}
        />
      </div>

      {/* Sort dropdown */}
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="px-3 py-3 rounded-xl text-xs text-slate-400 outline-none"
        style={{
          background: "rgba(255,255,255,0.04)",
          border:     "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        <option value="newest">NEWEST</option>
        <option value="priority">PRIORITY</option>
        <option value="progress">PROGRESS</option>
      </select>

      {/* Add button */}
      <button
        onClick={onAddClick}
        className="px-5 py-3 rounded-xl font-black text-sm tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background:  "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color:       "white",
          boxShadow:   "0 0 24px rgba(99,102,241,0.4)",
          fontFamily:  "'Exo 2', sans-serif",
          whiteSpace:  "nowrap",
        }}
      >
        + NEW
      </button>
    </div>
  );
}