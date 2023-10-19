import { instance } from "./index";

export const getQuotationList = async (chatId) => {
  const response = await instance.get(`/quotations?chatId=${chatId}`);
  return response.data;
};

export const createQuotation = async (chatId) => {
  const response = await instance.post(`/quotations?chatId=${chatId}`);
  return response.data;
};

export const updateQuotation = async (quotationId, chatId) => {
  const response = await instance.put(
    `/quotations/${quotationId}?chatId=${chatId}`,
  );
  return response.data;
};

export const confirmQuotationAll = async (chatId) => {
  const response = await instance.post(
    `/quotations/confirmAll?chatId=${chatId}`,
  );
  return response.data;
};

export const confirmQuotationDetail = async (quotationId, chatId) => {
  const response = await instance.post(
    `/quotations/confirm/${quotationId}/?chatId=${chatId}`,
  );
  return response.data;
};
