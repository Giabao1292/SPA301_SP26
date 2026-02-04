import apiClient from "./client";

export const fetchProfile = async (id) => {
  const { data } = await apiClient.get(`/api/staff/profile/${id}`);
  return data;
};

export const updateProfile = async (id, payload) => {
  const { data } = await apiClient.put(`/api/staff/profile/${id}`, payload);
  return data;
};
