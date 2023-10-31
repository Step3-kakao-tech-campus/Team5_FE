import { instance } from "./index";

export const getPortfolioList = async (
  nextCursor,
  name,
  location,
  minPrice,
  maxPrice,
) => {
  const response = await instance.get(
    `/portfolios?cursor=${nextCursor}&name=${name}&location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
  );
  return response.data.response;
};

export const getPortfolioDetail = async (portfolioId) => {
  const response = await instance.get(`/portfolios/${portfolioId}`);
  return response.data;
};

export const createPortfolio = async (portfolioData) => {
  const response = await instance.post("/portfolios", portfolioData);
  return response.data;
};

export const updatePortfolio = async (portfolioData) => {
  const response = await instance.put("/portfolios", portfolioData);
  return response.data;
};

export const deletePortfolio = async () => {
  const response = await instance.delete("/portfolios");
  return response.data;
};

export const getPortfolioSelf = async () => {
  const res = await instance.get("/portfolios/self");
  return res.data.response;
};
