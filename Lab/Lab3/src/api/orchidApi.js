import axiosClient from "./axiosClient";

export const getAllOrchids = async () => {
  const res = await axiosClient.get("/orchids");
  return res.data; // ❗ BẮT BUỘC
};

export const createOrchid = async (data) => {
  const res = await axiosClient.post("/orchids", data);
  return res.data;
};

export const updateOrchid = async (id, data) => {
  const res = await axiosClient.put(`/orchids/${id}`, data);
  return res.data;
};
x;

export const deleteOrchid = async (id) => {
  await axiosClient.delete(`/orchids/${id}`);
};
