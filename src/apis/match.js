import { instance } from "./index";

export const createChatRoom = async (plannerId) => {
  try {
    const response = await instance.post("/match/chat", {
      plannerId,
    });
    return response.data;
  } catch (error) {
    console.log("Create Chat Room Api Error", error);
    throw error;
  }
};
