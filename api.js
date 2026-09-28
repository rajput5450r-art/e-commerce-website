import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const authConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
};

export default api;