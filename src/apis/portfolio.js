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
  return response.data.response;
};

export const createPortfolio = async (portfolioData) => {
  const {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    carrer,
    partnerCompany,
  } = portfolioData;
  console.log(portfolioData);
  const response = await instance.post("/api/portfolio", {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    carrer,
    partnerCompany,
  });
  return response.data;
};

export const updatePortfolio = async (portfolioData) => {
  const {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    carrer,
    partnerCompany,
  } = portfolioData;
  console.log(portfolioData);
  const response = await instance.put("/api/portfolio", {
    plannerName,
    items,
    images,
    title,
    description,
    location,
    carrer,
    partnerCompany,
  });
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
