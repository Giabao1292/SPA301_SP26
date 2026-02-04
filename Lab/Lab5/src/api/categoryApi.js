import axios from "axios";

const API = "http://localhost:8080/categories";

export const getAll = () => axios.get(API);
