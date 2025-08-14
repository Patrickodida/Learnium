import api from "./api";
import axios from "axios";

export async function getAllCourses() {
  const { data } = await api.get("/api/courses");
  return data;
}

export async function getCourseById(id) {
  const { data } = await api.get(`/api/courses/${id}`);
  return data;
}

// Fetch courses for a specific instructor
export async function getCoursesByInstructor() {
  const { data } = await api.get("/api/courses/instructor", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return data;
}

// Toggle publish status without requiring extra data argument
export const toggleCoursePublish = async (courseId) => {
  const res = await api.patch(`/api/courses/${courseId}/publish`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
};