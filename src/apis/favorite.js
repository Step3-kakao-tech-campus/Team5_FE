import { instance } from "./index";

export const getFavoriteList = async (page) => {
  const response = await instance.get(`/favorites?page=${page}`);
  return response.data.response;
};
