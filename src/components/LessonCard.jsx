import React from "react";
import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="block border rounded p-3 hover:bg-gray-50"
    >
      <div className="font-medium">{lesson.title}</div>
      <div className="text-xs text-gray-500">Position: {lesson.position}</div>
    </Link>
  );
};
export default LessonCard;
