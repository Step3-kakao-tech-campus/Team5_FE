import { instance } from "./index";

export const savePayment = async (paymentData) => {
  const response = await instance.post("/api/payment/save", paymentData);
  return response.data;
};

export const paymentApprovalAndUserUpgrade = async (paymentData) => {
  const response = await instance.post("/api/payment/approve", paymentData);
  return response;
};
