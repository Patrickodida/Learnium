import api from "./api";

// Initiate payment (protected): { amount, currency, courseId }
export async function initiatePayment(amount, currency, courseId) {
  const { data } = await api.post("/api/payments", { amount, currency, courseId });
  // returns { paymentLink, paymentId }
  return data;
}

export async function getPaymentById(id) {
  const { data } = await api.get(`/api/payments/${id}`);
  return data;
}
