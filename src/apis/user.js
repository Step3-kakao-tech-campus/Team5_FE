import { instance } from "./index";

export const signup = async (data) => {
  try {
    const { role, username, email, password, password2 } = data;
    const response = await instance.post("/user/signup", {
      role,
      email,
      password,
      password2,
      username,
    });
    return response.data;
  } catch (error) {
    console.log("Signup Api Error", error);
    throw error;
  }
};

export const login = async (loginData) => {
  const res = await instance.post("/user/login", loginData);
  // 로그인시 accessToken, refreshToken을 localStorage에 저장
  localStorage.setItem("accessToken", res.headers.get("Authorization"));
  localStorage.setItem("refreshToken", res.headers.get("Refresh"));
  return res.data;
};

export const deleteAccount = async () => {
  try {
    const response = await instance.delete("/user");
    return response.data;
  } catch (error) {
    console.log("Delete Api Error", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await instance.get("/user/info");
    return response.data;
  } catch (error) {
    console.log("Get User Info Api Error", error);
    throw error;
  }
};

export const userUpgrade = async () => {
  try {
    const response = await instance.post("/user/upgrade");
    return response.data;
  } catch (error) {
    console.log("User Upgrade Api Error", error);
    throw error;
  }
};
