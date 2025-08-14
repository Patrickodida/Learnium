import React, { useState } from "react";
import { initiatePayment } from "../services/paymentService";

const PaymentButton = ({ amount, currency = "UGX", courseId }) => {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    try {
      setLoading(true);
      const { paymentLink } = await initiatePayment(amount, currency, courseId);
      window.location.href = paymentLink; // Redirect to Paystack checkout
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to start payment");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={startPayment}
      className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
    >
      {loading
        ? "Starting..."
        : `Buy Now . ${amount.toLocalString()} ${currency}`}
    </button>
  );
};
export default PaymentButton;