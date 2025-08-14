import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

export default function Dashboard() {
  const { enrollments, courses } = useContext(CourseContext);

  const enrolledCourseIds = new Set(enrollments.map(e => e.courseId));
  const enrolledCourses = courses.filter(c => enrolledCourseIds.has(c.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Learning</h1>
      {enrolledCourses.length === 0 ? (
        <div className="text-sm text-gray-600">You have not enrolled in any course yet.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {enrolledCourses.map(c => <CourseCard key={c.id} course={c} isEnrolled />)}
        </div>
      )}
    </div>
  );
}