import apiClient from "./client";

export const fetchCategories = async (keyword) => {
  const { data } = await apiClient.get("/api/staff/categories", {
    params: keyword ? { keyword } : undefined,
  });
  return data;
};

export const fetchCategoryById = async (id) => {
  const { data } = await apiClient.get(`/api/staff/categories/${id}`);
  return data;
};

export const createCategory = async (payload) => {
  const { data } = await apiClient.post("/api/staff/categories", payload);
  return data;
};

export const updateCategory = async (id, payload) => {
  const { data } = await apiClient.put(`/api/staff/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  await apiClient.delete(`/api/staff/categories/${id}`);
};
