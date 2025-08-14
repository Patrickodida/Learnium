import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { getLessonsByCourse } from "../services/lessonService";
import PaymentButton from "../components/PaymentButton";
import LessonCard from "../components/LessonCard";
import { CourseContext } from "../context/CourseContext";
import { AuthContext } from "../context/AuthContext";
import { enrollUser } from "../services/enrollmentService";

export default function CourseDetails() {
  const { id } = useParams();
  const { isEnrolled, loadMyEnrollments } = useContext(CourseContext);
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const enrolled = useMemo(() => isEnrolled(id), [id, isEnrolled]);

  useEffect(() => {
    (async () => {
      const c = await getCourseById(id);
      setCourse(c);
      const l = await getLessonsByCourse(id);
      // sort by position asc
      setLessons([...l].sort((a,b)=>a.position - b.position));
    })();
  }, [id]);

  if (!course) return <div className="max-w-6xl mx-auto px-4 py-10">Loading...</div>;

  const isFree = course.price === 0;

  const enrollFree = async () => {
    if (!user) return alert("Please login first.");
    try {
      await enrollUser(user.id, course.id);
      await loadMyEnrollments();
    } catch (e) {
      alert(e?.response?.data?.error || "Failed to enroll");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded" />
          <h1 className="text-3xl font-bold mt-6">{course.title}</h1>
          <p className="text-gray-700 mt-3">{course.description}</p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Lessons</h2>
          <div className="space-y-2">
            {lessons.length === 0 && <div className="text-sm text-gray-500">No lessons yet.</div>}
            {lessons.map((lesson) => {
              const canView = isFree || enrolled;
              return canView
                ? <LessonCard key={lesson.id} lesson={lesson} />
                : <div key={lesson.id} className="border rounded p-3 opacity-60">
                    <div className="font-medium">{lesson.title}</div>
                    <div className="text-xs text-gray-500">Locked (paid)</div>
                  </div>
            })}
          </div>
        </div>

        <aside className="md:col-span-1">
          <div className="border rounded-lg p-4 sticky top-6">
            <div className="text-lg font-semibold">
              {isFree ? "Free" : `${course.price.toLocaleString()} UGX`}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Instructor: {course?.instructor?.name ?? "—"}
            </div>
            <div className="mt-4">
              {isFree ? (
                <button onClick={enrollFree} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Enroll for Free
                </button>
              ) : enrolled ? (
                <div className="text-green-700 bg-green-100 border border-green-200 rounded p-2 text-center">
                  You are enrolled.
                </div>
              ) : (
                <PaymentButton amount={course.price} currency="UGX" courseId={course.id} />
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
