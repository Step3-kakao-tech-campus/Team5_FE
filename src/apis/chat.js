import { instance } from "./index";

export const createChatRoom = async (plannerId) => {
  const response = await instance.post("/chat", {
    plannerId,
  });
  return response.data;
};
