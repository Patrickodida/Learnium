import api from "./api";

// body: { userId, courseId } (protected)
export async function enrollUser(userId, courseId) {
  const { data } = await api.post("/api/enroll", { userId, courseId });
  return data;
}

export async function getUserEnrollments(userId) {
  const { data } = await api.get(`/api/enroll/${userId}`);
  return data;
}

export async function getEnrollment(userId, courseId) {
  const { data } = await api.get(`/api/enroll/${userId}/${courseId}`);
  return data;
}

export async function markLessonCompleted(userId, courseId, lessonId) {
  const { data } = await api.put(`/api/enroll/${userId}/${courseId}/complete`, { lessonId });
  return data;
}

export const getCompletedLessons = async (userId, courseId) => {
  const res = await api.get(`/api/enroll/${userId}/${courseId}/completed`);
  return res.data.completedLessonIds; // array of lesson IDs
};

