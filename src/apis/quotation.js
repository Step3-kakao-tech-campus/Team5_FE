import { instance } from "./index";

export const getQuotationList = async (matchId) => {
  try {
    const response = await instance.get(`/quotations?matchID=${matchId}`);
    return response.data;
  } catch (error) {
    console.log("Get Quotation List Api Error", error);
    throw error;
  }
};

export const createQuotation = async (matchId) => {
  try {
    const response = await instance.post(`/quotations?matchID=${matchId}`);
    return response.data;
  } catch (error) {
    console.log("Create Quotation Api Error", error);
    throw error;
  }
};

export const updateQuotation = async (quotationId, matchId) => {
  try {
    const response = await instance.put(
      `/quotations/${quotationId}?matchID=${matchId}`
    );
    return response.data;
  } catch (error) {
    console.log("Update Quotation Api Error", error);
    throw error;
  }
};

export const confirmQuotationAll = async (matchId) => {
  try {
    const response = await instance.post(
      `/quotations/confirmAll?matchID=${matchId}`
    );
    return response.data;
  } catch (error) {
    console.log("ConfirmAll Quotation Api Error", error);
    throw error;
  }
};

export const confirmQuotationDetail = async (quotationId, matchId) => {
  try {
    const response = await instance.post(
      `/quotations/confirm/${quotationId}/?matchID=${matchId}`
    );
    return response.data;
  } catch (error) {
    console.log("Confirm Quotation Detail Api Error", error);
    throw error;
  }
};
