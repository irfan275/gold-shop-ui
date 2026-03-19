import api from "./api";

const API_URL = "purchase";

// GET all customers
export const getInvoices = (page, size, search) => {
  return api.get(API_URL, {
    params: { page, size, search }
  });
};

// GET customer by id
export const getInvoiceById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

// CREATE customer
export const createInvoice = (customer) => {
  return api.post(API_URL, customer);
};

// UPDATE customer
export const updateInvoice = (id, customer) => {
  return api.put(`${API_URL}/${id}`, customer);
};

// DELETE customer
export const deleteInvoice = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getInvoiceNumber = (id) => {
  return api.get(`shop/purchase/sequence/${id}`);
};