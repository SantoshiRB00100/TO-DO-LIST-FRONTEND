import { useState, useEffect } from "react";
import { todoApi } from "../api/todoApi";

export function useTodos() {
  const [todos, setTodos]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch {
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  return { todos, loading, refetch: fetchTodos };
}