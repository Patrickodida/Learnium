import { createContext, useContext, useEffect, useState } from "react";
import * as coursesApi from "../services/courseService"; // fixed import
import * as enrollmentApi from "../services/enrollmentService"; // fixed import
import { AuthContext } from "./AuthContext";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const { user } = useContext(AuthContext);

  const loadCourses = async () => {
    const data = await coursesApi.getAllCourses();
    setCourses(data);
  };

  const loadMyEnrollments = async () => {
    if (!user) { setEnrollments([]); return; }
    const data = await enrollmentApi.getUserEnrollments(user.id);
    setEnrollments(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    loadMyEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const isEnrolled = (courseId) =>
    enrollments.some((e) => e.courseId === courseId);

  return (
    <CourseContext.Provider value={{ courses, enrollments, loadCourses, loadMyEnrollments, isEnrolled }}>
      {children}
    </CourseContext.Provider>
  );
};
