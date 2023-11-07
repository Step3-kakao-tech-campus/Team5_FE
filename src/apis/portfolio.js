import { instance } from "./index";

export const getPortfolioList = async (
  nextCursor,
  name,
  location,
  minPrice,
  maxPrice,
) => {
  const response = await instance.get(
    `/api/portfolio?cursor=${nextCursor}&name=${name}&location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
  );
  return response.data.response;
};

export const getPortfolioDetail = async (portfolioId) => {
  const response = await instance.get(`/api/portfolio/${portfolioId}`);
  return response.data;
};

export const createPortfolio = async (portfolioData) => {
  const response = await instance.post("/api/portfolio", portfolioData);
  return response.data;
};

export const updatePortfolio = async (portfolioData) => {
  const response = await instance.put("/api/portfolio", portfolioData);
  return response.data;
};

export const deletePortfolio = async () => {
  const response = await instance.delete("/api/portfolio");
  return response.data;
};

export const getPortfolioSelf = async () => {
  const res = await instance.get("/api/portfolio/self");
  return res.data.response;
};
