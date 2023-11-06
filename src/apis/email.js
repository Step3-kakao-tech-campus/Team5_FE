import { instance } from "./index";

export const sendAuthCode = async ({ email }) => {
  console.log("sendAuthCode");
  const response = await instance.post("/mail", {
    email,
  });
  return response.data;
};

export const verifyAuthCode = async ({ email, authCode }) => {
  const response = await instance.post("/mail/verify", {
    email,
    authCode,
  });
  return response.data;
};
