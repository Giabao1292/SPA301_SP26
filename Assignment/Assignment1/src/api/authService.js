import apiClient from "./client";

export const login = async (payload) => {
  const { data } = await apiClient.post("/api/auth/login", payload);
  return data;
};
