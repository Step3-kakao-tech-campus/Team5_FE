import { instance } from "./index";

export const getQuotationList = async (chatId) => {
  const response = await instance.get(`/api/quotation?chatId=${chatId}`);
  return response.data;
};

export const createQuotation = async (chatId, data) => {
  const { title, company, description, price } = data;
  const response = await instance.post(`/api/quotation?chatId=${chatId}`, {
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
    `/api/quotation/${quotationId}?chatId=${chatId}`,
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
  const response = await instance.delete(`/api/quotation/${quotationId}`);
  return response.data;
};

export const confirmQuotationAll = async (chatId) => {
  const response = await instance.post(`/api/match/confirm?chatId=${chatId}`);
  return response.data;
};

export const confirmQuotationDetail = async ({ quotationId, chatId }) => {
  const response = await instance.post(
    `/api/quotation/confirm/${quotationId}?chatId=${chatId}`,
  );
  return response.data;
};

export const getQuotationCollectList = async (page) => {
  const response = await instance.get(`/api/quotation/all?page=${page}`);
  return response.data.response;
};
