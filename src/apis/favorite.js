import { instance } from "./index";

export const getFavoriteList = async (page) => {
  const response = await instance.get(`/api/favorite?page=${page}`);
  return response.data.response;
};

export const addFavorite = async ({ portfolioId }) => {
  const response = await instance.post(`/api/favorite/${portfolioId}`);
  return response.data.response;
};

export const deleteFavorite = async ({ portfolioId }) => {
  const response = await instance.delete(`/api/favorite/${portfolioId}`);
  return response.data.response;
};
