import React from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import { useSelector } from "react-redux";

const CourseDetails = () => {
  const { id } = useParams(); // Use useParams to get route parameters
  const course = useSelector((state) =>
    state.courses.courses.find((course) => course.id === id)
  );

  if (!course) return <div>Course not found</div>;

  return (
    <div>
      <h1>{course.name}</h1>
      <p>Instructor: {course.instructor}</p>
      <p>Description: {course.description}</p>
      <p>Status: {course.enrollmentStatus}</p>
      <p>Duration: {course.duration}</p>
      <p>Schedule: {course.schedule}</p>
      <p>Location: {course.location}</p>
      <p>Prerequisites: {course.prerequisites.join(", ")}</p>
      <div>
        <h3>Syllabus</h3>
        {course.syllabus.map((week) => (
          <div key={week.week}>
            <h4>
              Week {week.week}: {week.topic}
            </h4>
            <p>{week.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
