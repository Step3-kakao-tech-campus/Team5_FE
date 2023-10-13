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

export const confirmPayment = async (paymentData) => {
  try {
    const response = await instance.post("/payments/confirm", paymentData);
    return response.data;
  } catch (error) {
    console.log("Confirm Payment Api Error", error);
    throw error;
  }
};

export const upgradePayment = async (paymentData) => {
  try {
    const response = await instance.post("/payments/upgrade", paymentData);
    return response.data;
  } catch (error) {
    console.log("Upgrade Payment Api Error", error);
    throw error;
  }
};
