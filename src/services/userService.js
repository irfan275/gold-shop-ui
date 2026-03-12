import axios from "axios";

// Get token from localStorage (or wherever you store it)
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const API_URL = "http://localhost:3000/api/user"; // backend endpoint

export const getUsers = async () => {
  const { data } = await axios.get(API_URL, config);
  return data;
};

export const createUser = async (user) => {
  const { data } = await axios.post(API_URL, user, config);
  return data;
};

export const updateUser = async (id, user) => {
  const { data } = await axios.put(`${API_URL}/${id}`, user, config);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, config);
  return data;
};

export const getShops = async () => {
  const { data } = await axios.get("/api/shop", config);
  return data;
};