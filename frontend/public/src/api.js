import axios from "axios";

const api = axios.create({
  baseURL: "/api", // relative, Vercel will route it to FastAPI
});

export default api;
