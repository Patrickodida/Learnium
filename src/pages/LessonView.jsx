import { useEffect, useState, useContext, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getLesson } from "../services/lessonService";
import { getCourseById } from "../services/courseService";
import { markLessonCompleted, getCompletedLessons } from "../services/enrollmentService";
import { CourseContext } from "../context/CourseContext";
import { AuthContext } from "../context/AuthContext";

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { isEnrolled } = useContext(CourseContext);

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);

  // Persistent completed lessons state
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const ls = await getLesson(id);
        setLesson(ls);
        const c = await getCourseById(ls.courseId);
        setCourse(c);

        // Fetch completed lessons for this user & course
        if (user) {
          try {
            const completed = await getCompletedLessons(user.id, ls.courseId);
            // Ensure we always set an array even if backend returns undefined
            setCompletedLessons(completed?.completedLessonIds || []);
          } catch (err) {
            console.error("Failed to fetch completed lessons:", err);
            setCompletedLessons([]); // fallback on error
          }
        }
      } catch (err) {
        console.error("Failed to load lesson or course:", err);
        // redirect or show error message if lesson/course fails
        navigate("/courses");
      }
    })();
  }, [id, user, navigate]); // Added navigate as dependency

  // Guard access to course content
  const canAccess = useMemo(() => {
    if (!course) return false;
    if (course.price === 0) return true;
    return user && isEnrolled(course.id);
  }, [course, user, isEnrolled]);

  if (!lesson || !course)
    return <div className="max-w-4xl mx-auto px-4 py-10">Loading...</div>;

  if (!canAccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="border rounded p-6 bg-yellow-50">
          <h1 className="text-xl font-semibold">This lesson is locked</h1>
          <p className="text-sm text-gray-700 mt-2">
            Please enroll or purchase the course to access this content.
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigate(`/courses/${course.id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Go to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle marking lesson as complete safely
  const handleMarkComplete = async () => {
    if (!user) return;
    try {
      await markLessonCompleted(user.id, course.id, lesson.id);
      // Update local state safely
      setCompletedLessons((prev) => [...(prev || []), lesson.id]);
    } catch (err) {
      console.error(err);
      alert("Could not mark lesson as complete.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to={`/courses/${course.id}`} className="text-blue-600">
        &larr; Back to course
      </Link>
      <h1 className="text-2xl font-bold mt-4">{lesson.title}</h1>
      <div className="aspect-video mt-4">
        <iframe
          src={lesson.videoUrl}
          title={lesson.title}
          className="w-full h-full rounded"
          allowFullScreen
        />
      </div>
      <div
        className={`mt-4 p-4 border rounded ${
          // Safe includes check to prevent crash
          (completedLessons || []).includes(lesson.id)
            ? "bg-green-100 border-green-500"
            : "bg-white"
        }`}
      >
        <button
          onClick={handleMarkComplete}
          disabled={(completedLessons || []).includes(lesson.id)} // Safe check
          className={`px-4 py-2 rounded ${
            completedLessons.includes(lesson.id)
              ? "bg-gray-400 text-white"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {(completedLessons || []).includes(lesson.id) ? "Completed" : "Mark Complete"} {/* Safe check */}
        </button>
      </div>
    </div>
  );
}
