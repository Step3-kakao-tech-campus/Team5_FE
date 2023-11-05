import { instance } from "./index";

export const getFavoriteList = async (page) => {
  const response = await instance.get(`/favorites?page=${page}`);
  return response.data.response;
};

export const addFavorite = async ({ portfolioId }) => {
  const response = await instance.post(`/favorites/${portfolioId}`);
  return response.data.response;
};

export const deleteFavorite = async ({ portfolioId }) => {
  const response = await instance.delete(`/favorites/${portfolioId}`);
  return response.data.response;
};
