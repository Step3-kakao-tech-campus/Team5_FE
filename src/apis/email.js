import { instance } from "./index";

export const sendAuthCode = async ({ email }) => {
  const response = await instance.post("/api/mail", {
    email,
  });
  return response.data;
};

export const verifyAuthCode = async ({ email, code }) => {
  const response = await instance.post("/api/mail/verify", {
    email,
    code,
  });
  return response.data;
};
