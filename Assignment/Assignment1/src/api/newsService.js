import apiClient from "./client";

export const fetchNews = async (keyword) => {
  const { data } = await apiClient.get("/api/staff/news", {
    params: keyword ? { keyword } : undefined,
  });
  return data;
};

export const fetchNewsById = async (id) => {
  const { data } = await apiClient.get(`/api/staff/news/${id}`);
  return data;
};

export const createNews = async (payload) => {
  const { data } = await apiClient.post("/api/staff/news", payload);
  return data;
};

export const updateNews = async (id, payload) => {
  const { data } = await apiClient.put(`/api/staff/news/${id}`, payload);
  return data;
};

export const deleteNews = async (id) => {
  await apiClient.delete(`/api/staff/news/${id}`);
};

export const fetchNewsHistory = async (accountId) => {
  const { data } = await apiClient.get(`/api/staff/news/history/${accountId}`);
  return data;
};

export const fetchPublicNews = async () => {
  const { data } = await apiClient.get("/api/public/news");
  return data;
};
