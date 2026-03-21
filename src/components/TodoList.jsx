import TodoCard from "./TodoCard";

export default function TodoList({ todos, loading, search, filter, onAddClick, onRefetch }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4 opacity-30">◎</div>
        <p
          className="text-slate-600 text-sm tracking-widest"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {search || filter !== "All" ? "NO MATCHING TASKS" : "NO TASKS YET"}
        </p>
        {!search && filter === "All" && (
          <button
            onClick={onAddClick}
            className="mt-4 text-indigo-400 text-xs tracking-widest hover:text-indigo-300 transition-colors"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            + ADD YOUR FIRST TASK →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo, i) => (
        <div key={todo._id} style={{ animationDelay: `${i * 60}ms` }}>
          <TodoCard todo={todo} onRefetch={onRefetch} />
        </div>
      ))}
    </div>
  );
}