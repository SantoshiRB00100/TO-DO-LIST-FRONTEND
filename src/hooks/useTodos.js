import { useState, useEffect } from "react";
import { todoApi } from "../api/todoApi";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const data = await todoApi.getAll();

      if (Array.isArray(data)) {
        setTodos(data);
      } else if (data.todos) {
        setTodos(data.todos);
      } else {
        setTodos([]);
      }

    } catch (error) {
      console.error("Fetch todos error:", error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, refetch: fetchTodos };
}