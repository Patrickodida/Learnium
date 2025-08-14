import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPaymentById } from "../services/paymentService";
import { enrollUser } from "../services/enrollmentService";
import { AuthContext } from "../context/AuthContext";
import { CourseContext } from "../context/CourseContext";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { loadMyEnrollments } = useContext(CourseContext);

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");

  const [message, setMessage] = useState("Verifying your payment...");
  const triedEnroll = useRef(false);

  useEffect(() => {
    if (!paymentId) { setMessage("Invalid payment reference."); return; }

    let interval = setInterval(async () => {
      try {
        const payment = await getPaymentById(paymentId);
        if (payment.status === "SUCCESS") {
          if (!triedEnroll.current) {
            triedEnroll.current = true;
            // auto-enroll
            await enrollUser(payment.userId, payment.courseId);
            await loadMyEnrollments();
            setMessage("Payment verified and enrollment completed! Redirecting...");
            clearInterval(interval);
            setTimeout(() => navigate(`/courses/${payment.courseId}`), 1200);
          }
        } else if (payment.status === "FAILED") {
          setMessage("Payment failed. Please try again.");
          clearInterval(interval);
        } else {
          setMessage("Payment pending... still verifying.");
        }
      } catch (e) {
        setMessage("Unable to verify payment yet...");
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [paymentId, loadMyEnrollments, navigate]);

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
      <p className="text-gray-700">{message}</p>
      {!user && <p className="text-sm text-gray-500 mt-3">Tip: login to access your course faster.</p>}
    </div>
  );
}