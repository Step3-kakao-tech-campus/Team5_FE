import { instance } from "./index";

export const savePayment = async (paymentData) => {
  const response = await instance.post("/payments/save", paymentData);
  return response.data;
};

export const paymentApprovalAndUserUpgrade = async (paymentData) => {
  const response = await instance.post("/payments/approve", paymentData);
  return response;
};
