import api from "./api";

export async function getLessonsByCourse(courseId) {
  const { data } = await api.get(`/api/lessons/course/${courseId}`);
  return data;
}

export async function getLesson(id) {
  const { data } = await api.get(`/api/lessons/${id}`);
  return data;
}
