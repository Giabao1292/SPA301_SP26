import apiClient from "./client";

export const fetchAccounts = async (keyword) => {
  const { data } = await apiClient.get("/api/admin/accounts", {
    params: keyword ? { keyword } : undefined,
  });
  return data;
};

export const fetchAccountById = async (id) => {
  const { data } = await apiClient.get(`/api/admin/accounts/${id}`);
  return data;
};

export const createAccount = async (payload) => {
  const { data } = await apiClient.post("/api/admin/accounts", payload);
  return data;
};

export const updateAccount = async (id, payload) => {
  const { data } = await apiClient.put(`/api/admin/accounts/${id}`, payload);
  return data;
};

export const deleteAccount = async (id) => {
  await apiClient.delete(`/api/admin/accounts/${id}`);
};
