import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import LessonView from "./pages/LessonView";
import Dashboard from "./pages/Dashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/lessons/:id" element={<LessonView />} />

      {/* Student dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Instructor dashboard */}
      <Route
        path="/instructor-dashboard"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/payment-success" element={<PaymentSuccess />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
