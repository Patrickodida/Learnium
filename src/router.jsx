import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import LessonView from "./pages/LessonView";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/lessons/:id" element={<LessonView />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/payment-success" element={<PaymentSuccess />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
