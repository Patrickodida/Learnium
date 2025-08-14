import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course, isEnrolled = false }) => {
  const isFree = course.price === 0;
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{course.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {course.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span
            className={`text-sm ${
              isFree ? "text-green-600" : "text-blue-600"
            } font-semibold`}
          >
            {isFree ? "Free" : `${course.price.toLocaleString()} UGX`}
          </span>
          {isEnrolled && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Enrolled
            </span>
          )}
        </div>
        <Link
          to={`/courses/${course.id}`}
          className="mt-4 inline-block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
export default CourseCard;
