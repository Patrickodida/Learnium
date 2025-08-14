import React, { useState } from 'react';
import { toggleCoursePublish } from "../services/courseService";

function InstructorCourse({ course }) {
    const [published, setPublished] = useState(course.published);
  const handlePublish = async () => {
    try {
      const updated = await toggleCoursePublish(course.id, { published: !published }); // ✅ use local state
      setPublished(updated.published); // update local state after API call
      alert(updated.published ? "Course Published!" : "Course Unpublished!");
    } catch (err) {
      alert("Failed to update publish status.");
    }
  };

  return (
    <div className="border p-3 rounded">
      <h3 className="text-lg font-bold">{course.title}</h3>
      <button
        onClick={handlePublish}
        className={`px-3 py-1 rounded ${course.published ? "bg-green-600" : "bg-gray-600"} text-white`}
      >
        {published ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
}

export default InstructorCourse;
