import { instance } from "./index";

export const getPortfolioList = async (nextCursor) => {
  try {
    const response = await instance.get(`/portfolios?cursor=${nextCursor}`);
    return response.data.response;
  } catch (error) {
    console.log("Get Portfolio List Api Error", error);
    throw error;
  }
};

export const getPortfolioDetail = async (portfolioId) => {
  try {
    const response = await instance.get(`/portfolios/${portfolioId}`);
    return response.data;
  } catch (error) {
    console.log("Get Portfolio Detail Api Error", error);
    throw error;
  }
};

export const createPortfolio = async (portfolioData) => {
  try {
    const response = await instance.post("/portfolios", portfolioData);
    return response.data;
  } catch (error) {
    console.log("Create Portfolio Api Error", error);
    throw error;
  }
};

export const updatePortfolio = async (portfolioData) => {
  try {
    const response = await instance.put("/portfolios", portfolioData);
    return response.data;
  } catch (error) {
    console.log("Update Portfolio Api Error", error);
    throw error;
  }
};

export const deletePortfolio = async () => {
  try {
    const response = await instance.delete("/portfolios");
    return response.data;
  } catch (error) {
    console.log("Delete Portfolio Api Error", error);
    throw error;
  }
};
