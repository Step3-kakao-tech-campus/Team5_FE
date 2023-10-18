import { instance } from "./index";

export const savePayment = async (paymentData) => {
  try {
    const response = await instance.post("/payments/save", paymentData);
    return response.data;
  } catch (error) {
    console.log("Save Payment Api Error", error);
    throw error;
  }
};

export const paymentApprovalAndUserUpgrade = async (paymentData) => {
  const res = await instance.post("/payments/approve", paymentData);
  return res;
};
