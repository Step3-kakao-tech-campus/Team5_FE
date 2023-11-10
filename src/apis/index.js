import axios from "axios";
import { getReactAppApiUrl } from "../utils/convert";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
    return response;
  },
  async (error) => {
    console.log(error?.response?.data?.error);
    if (error.code === "ECONNABORTED") {
      alert(
        "죄송합니다, 서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.",
      );
      window.location.href = "/";
    }
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      // 액세스 토큰 만료
      if (error?.response?.data?.error?.status === 2100) {
        const originalRequest = config;
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        // refresh token으로 access token 재발급
        const res = await instance.post(
          `${getReactAppApiUrl()}/api/user/token`, // token refresh api
          {},
          { headers: { Authorization: accessToken, Refresh: refreshToken } },
        );
        // 재발급 받은 토큰 local storage에 저장
        const newAccessToken = res.headers.authorization;
        const newRefreshToken = res.headers.refresh;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        originalRequest.headers.authorization = newAccessToken;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
      // 리프레시 토큰 만료
      if (error?.response?.data?.error?.status === 2102) {
        // refresh token이 만료된 경우
        localStorage.clear();
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }
      if (error?.response?.data?.error?.status > 2102) {
        localStorage.clear();
        alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
