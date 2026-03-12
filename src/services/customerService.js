const API_URL = "http://localhost:3000/api/customer";

const getToken = () => {
  return localStorage.getItem("token");
};

// GET all customers
export const getCustomers = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.json();
};

// GET customer by id
export const getCustomerById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.json();
};

// CREATE customer
export const createCustomer = async (customer) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(customer)
  });

  return response.json();
};

// UPDATE customer
export const updateCustomer = async (id, customer) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(customer)
  });

  return response.json();
};

// DELETE customer
export const deleteCustomer = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.json();
};