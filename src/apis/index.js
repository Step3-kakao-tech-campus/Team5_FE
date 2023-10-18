import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    // console.log("interceptor response", response);
    return response;
  },
  (error) => {
    // console.log("interceptor error", error);
    throw error;
  },
);
