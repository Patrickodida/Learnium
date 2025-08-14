import { useEffect, useState, useContext, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getLesson } from "../services/lessonService";
import { CourseContext } from "../context/CourseContext";
import { AuthContext } from "../context/AuthContext";
import { getCourseById } from "../services/courseService";

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { isEnrolled } = useContext(CourseContext);

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    (async () => {
      const ls = await getLesson(id);
      setLesson(ls);
      const c = await getCourseById(ls.courseId);
      setCourse(c);
    })();
  }, [id]);

  const canAccess = useMemo(() => {
    if (!course) return false;
    if (course.price === 0) return true;
    return user && isEnrolled(course.id);
  }, [course, user, isEnrolled]);

  if (!lesson || !course) return <div className="max-w-4xl mx-auto px-4 py-10">Loading...</div>;

  if (!canAccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="border rounded p-6 bg-yellow-50">
          <h1 className="text-xl font-semibold">This lesson is locked</h1>
          <p className="text-sm text-gray-700 mt-2">Please enroll or purchase the course to access this content.</p>
          <div className="mt-4">
            <button onClick={() => navigate(`/courses/${course.id}`)} className="px-4 py-2 bg-blue-600 text-white rounded">
              Go to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to={`/courses/${course.id}`} className="text-blue-600">&larr; Back to course</Link>
      <h1 className="text-2xl font-bold mt-4">{lesson.title}</h1>
      <div className="aspect-video mt-4">
        <iframe
          src={lesson.videoUrl}
          title={lesson.title}
          className="w-full h-full rounded"
          allowFullScreen
        />
      </div>
    </div>
  );
}
