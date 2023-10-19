import { instance } from "./index";

export const signup = async (data) => {
  const { role, username, email, password, password2 } = data;
  const response = await instance.post("/user/signup", {
    role,
    email,
    password,
    password2,
    username,
  });
  return response.data;
};

export const login = async (loginData) => {
  const { email, password } = loginData;
  const response = await instance.post("/user/login", { email, password });
  // 로그인시 accessToken, refreshToken을 localStorage에 저장
  localStorage.setItem("accessToken", response.headers.get("Authorization"));
  localStorage.setItem("refreshToken", response.headers.get("Refresh"));
  return response.data;
};

export const deleteAccount = async () => {
  const response = await instance.delete("/user");
  return response.data;
};

export const getUserInfo = async () => {
  const response = await instance.get("/user/info");
  return response.data;
};

export const userUpgrade = async () => {
  const response = await instance.post("/user/upgrade");
  return response.data;
};
