import { instance } from "./index";

export const createReview = async ({ chatId, content, stars, images }) => {
  const response = await instance.post(`/api/review?chatId=${chatId}`, {
    content,
    stars,
    images,
  });
  return response.data;
};

export const getMatchReviews = async () => {
  const response = await instance.get("/api/match/review");
  return response.data.response;
};

export const getReviewsListSelf = async () => {
  const response = await instance.get("/api/review/all");
  return response.data.response;
};

export const getReviewDetail = async (reviewId) => {
  const response = await instance.get(`/api/review/${reviewId}`);
  return response.data.response;
};

export const deleteReview = async (reviewId) => {
  const response = await instance.delete(`/api/review/${reviewId}`);
  return response.data;
};

export const updateReview = async ({ reviewId, content, stars, images }) => {
  const response = await instance.put(`/api/review/${reviewId}`, {
    content,
    stars,
    images,
  });
  return response.data;
};

export const getPortfolioReviews = async (page) => {
  const response = await instance.get(`/api/review?page=${page}`);
  return response.data.response.reviews;
};
