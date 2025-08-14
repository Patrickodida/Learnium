import api from "./api";

export async function getAllCourses() {
  const { data } = await api.get("/api/courses");
  return data;
}

export async function getCourseById(id) {
  const { data } = await api.get(`/api/courses/${id}`);
  return data;
}
