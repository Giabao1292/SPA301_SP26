import apiClient from "./client";

export const fetchTags = async (keyword) => {
  const { data } = await apiClient.get("/api/tags", {
    params: keyword ? { keyword } : undefined,
  });
  return data;
};
