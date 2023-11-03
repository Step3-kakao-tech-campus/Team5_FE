import { instance } from "./index";

export const createReview = async ({ chatId, content, stars, imageItems }) => {
  const response = await instance.post(`/reviews?chatId=${chatId}`, {
    content,
    stars,
    imageItems,
  });
  return response.data;
};

export const getMatchReviews = async () => {
  const response = await instance.get("/match/reviews");
  return response.data.response;
};
