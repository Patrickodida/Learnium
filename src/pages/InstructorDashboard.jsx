import React, { useEffect, useState, useContext } from "react";
import { getCoursesByInstructor, toggleCoursePublish } from "../services/courseService";
import { AuthContext } from "../context/AuthContext";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCourses();
  }, [user]);

  async function fetchCourses() {
    try {
      setLoading(true);
      // ✅ Fetch courses using the logged-in user's ID
      const data = await getCoursesByInstructor(user.id);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching instructor courses:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleTogglePublish(courseId) {
    try {
      setUpdating(courseId);
      const updatedCourse = await toggleCoursePublish(courseId); // ✅ call service

      // Update state instantly without re-fetching all data
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, published: updatedCourse.published } : course
        )
      );
    } catch (error) {
      console.error("Error toggling publish status:", error);
    } finally {
      setUpdating(null);
    }
  }

  if (loading) return <p className="text-center mt-5">Loading courses...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

      {courses.length === 0 ? (
        <p>No courses found. Start creating your first course!</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  {course.published ? (
                    <span className="text-green-600">Published</span>
                  ) : (
                    <span className="text-red-600">Unpublished</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleTogglePublish(course.id)}
                disabled={updating === course.id}
                className={`px-4 py-2 rounded ${
                  course.published
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {updating === course.id
                  ? "Updating..."
                  : course.published
                  ? "Unpublish"
                  : "Publish"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
