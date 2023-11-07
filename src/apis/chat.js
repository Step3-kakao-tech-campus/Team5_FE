import { instance } from "./index";

export const createChatRoom = async (plannerId) => {
  const response = await instance.post("/api/chat", {
    plannerId,
  });
  return response.data;
};
