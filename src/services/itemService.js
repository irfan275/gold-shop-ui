const API_URL = "http://localhost:3000/api/item";

const getToken = () => localStorage.getItem("token");

// GET items
export const getItems = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};

// CREATE item
export const createItem = async (item) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(item)
  });

  return res.json();
};

// UPDATE item
export const updateItem = async (id, item) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(item)
  });

  return res.json();
};

// DELETE item
export const deleteItem = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};