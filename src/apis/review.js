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

export const getReviewsListSelf = async () => {
  const response = await instance.get("/reviews/collect");
  return response.data.response;
};

export const getReivewDetail = async (reviewId) => {
  const response = await instance.get(`/reviews/${reviewId}`);
  return response.data.response;
};

export const deleteReview = async (reviewId) => {
  const response = await instance.delete(`/reviews/${reviewId}`);
  return response.data;
};

export const updateReview = async ({ reviewId, content, stars, images }) => {
  const response = await instance.put(`/reviews/${reviewId}`, {
    content,
    stars,
    images,
  });
  return response.data;
};

export const getPortfolioReviews = async (page) => {
  const response = await instance.get(`/reviews?page=${page}`);
  return response.data.response.reviews;
};
