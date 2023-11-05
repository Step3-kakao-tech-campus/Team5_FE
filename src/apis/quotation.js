import { instance } from "./index";

export const getQuotationList = async (chatId) => {
  const response = await instance.get(`/quotations?chatId=${chatId}`);
  return response.data;
};

export const createQuotation = async (chatId, data) => {
  const { title, company, description, price } = data;
  const response = await instance.post(`/quotations?chatId=${chatId}`, {
    title,
    company,
    description,
    price,
  });
  return response.data;
};

export const updateQuotation = async (quotationId, chatId, data) => {
  const { title, company, description, price } = data;
  const response = await instance.put(
    `/quotations/${quotationId}?chatId=${chatId}`,
    {
      title,
      company,
      description,
      price,
    },
  );
  return response.data;
};

export const deleteQuotation = async (quotationId) => {
  const response = await instance.delete(`/quotations/${quotationId}`);
  return response.data;
};

export const confirmQuotationAll = async (chatId) => {
  const response = await instance.post(`/match/confirmAll?chatId=${chatId}`);
  return response.data;
};

export const confirmQuotationDetail = async (quotationId, chatId) => {
  const response = await instance.post(
    `/quotations/confirm/${quotationId}?chatId=${chatId}`,
  );
  return response.data;
};

export const getQuotationCollectList = async (page) => {
  const response = await instance.get(`/quotations/collect?page=${page}`);
  return response.data.response;
};
