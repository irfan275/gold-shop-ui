import api from "./api";

const API_URL = "customer";

// GET all customers
export const getCustomers = (page, size, search) => {
  return api.get(API_URL, {
    params: { page, size, search }
  });
};

// GET customer by id
export const getCustomerById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

// CREATE customer
export const createCustomer = (customer) => {
  return api.post(API_URL, customer);
};

// UPDATE customer
export const updateCustomer = (id, customer) => {
  return api.put(`${API_URL}/${id}`, customer);
};

// DELETE customer
export const deleteCustomer = (id) => {
  return api.delete(`${API_URL}/${id}`);
};