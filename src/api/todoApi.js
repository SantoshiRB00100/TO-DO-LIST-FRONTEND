const BASE_URL = "https://to-do-list-backend-7zbt.onrender.com/api/todos";

export const todoApi = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/get`);
    const data = await res.json();
    return data.data || [];
  },

  create: async (formData) => {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        when: formData.when || undefined,
      }),
    });

    const data = await res.json();
    return data;
  },

  update: async (id, updates) => {
    const res = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });

    return res.json();
  },
};