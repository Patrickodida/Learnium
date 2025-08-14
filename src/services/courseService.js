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

export const toggleCoursePublish = async (courseId, data) => {
  const res = await axios.patch(`/api/courses/${courseId}/publish`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
};