import { useState, useMemo } from "react";

import { useTodos }                    from "./hooks/useTodos";
import FloatingParticles               from "./components/FloatingParticles";
import Header                          from "./components/Header";
import StatsBar                        from "./components/StatsBar";
import SearchBar                       from "./components/SearchBar";
import FilterPills                     from "./components/FilterPills";
import TodoList                        from "./components/TodoList";
import AddTodoModal                    from "./components/AddTodoModal";

export default function App() {
  const { todos, loading, refetch } = useTodos();

  const [showAdd, setShowAdd] = useState(false);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("All");
  const [sortBy,  setSortBy]  = useState("newest");

  const filtered = useMemo(() => {
    return todos
      .filter(t =>
        filter === "All" || t.priority === filter || t.category === filter
      )
      .filter(t =>
        !search || (t.title || "").toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "newest")   return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "priority") return ["High","Medium","Low"].indexOf(a.priority) - ["High","Medium","Low"].indexOf(b.priority);
        if (sortBy === "progress") return (b.fulfillment || 0) - (a.fulfillment || 0);
        return 0;
      });
  }, [todos, filter, search, sortBy]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #050510; min-height: 100vh; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseGlow {
          0%, 100% { text-shadow: 0 0 40px rgba(129,140,248,0.5), 0 0 80px rgba(139,92,246,0.3); }
          50%       { text-shadow: 0 0 60px rgba(129,140,248,0.9), 0 0 120px rgba(139,92,246,0.6); }
        }
        .shine-text {
          background: linear-gradient(90deg, #6366f1 0%, #a855f7 20%, #ec4899 35%, #ffffff 50%, #ec4899 65%, #a855f7 80%, #6366f1 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shine 3s linear infinite, pulseGlow 2.5s ease-in-out infinite;
        }
        .todo-card { animation: slideUp 0.4s ease forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(129,140,248,0.3); border-radius: 4px; }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.1); }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; cursor: pointer; }
      `}</style>

      <div
        className="min-h-screen relative"
        style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 50%), #050510" }}
      >
        <FloatingParticles />

        <div className="fixed inset-0 pointer-events-none z-0" style={{
          backgroundImage: "linear-gradient(rgba(129,140,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
          <Header />
          <StatsBar todos={todos} />
          <SearchBar
            search={search}   setSearch={setSearch}
            sortBy={sortBy}   setSortBy={setSortBy}
            onAddClick={() => setShowAdd(true)}
          />
          <FilterPills filter={filter} setFilter={setFilter} />
          <TodoList
            todos={filtered}  loading={loading}
            search={search}   filter={filter}
            onAddClick={() => setShowAdd(true)}
            onRefetch={refetch}
          />
          <div className="text-center mt-10 text-xs text-slate-800 tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
            ⬡ TO-DO · {todos.length} TASKS TRACKED
          </div>
        </div>

        {showAdd && (
          <AddTodoModal onClose={() => setShowAdd(false)} onCreated={refetch} />
        )}
      </div>
    </>
  );
}