import React, { useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const { courses, isEnrolled } = useContext(CourseContext);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">All Courses</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} isEnrolled={isEnrolled(c.id)} />
        ))}
      </div>
    </div>
  );
};
export default Courses;
