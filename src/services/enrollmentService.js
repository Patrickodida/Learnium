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

// fetch completed lessons for a user in a specific course
export const getCompletedLessons = async (userId, courseId) => {
  // GET /api/enroll/:userId/:courseId/completed
  const res = await api.get(`/api/enroll/${userId}/${courseId}/completed`);
  // Return array of completed lesson IDs
  return res.data.completedLessonIds;
};