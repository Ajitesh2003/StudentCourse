import React from "react";
import { useNavigate } from "react-router-dom";
// import "./CourseCard.css";
// Import the styles

const CourseCard = ({ course, onLike }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="course-card"
    >
      <img src={course.thumbnail} alt={course.name} />
      <h3>{course.name}</h3>
      <p>{course.instructor}</p>
      <p>{course.duration}</p>
      <p>{course.enrollmentStatus}</p>
      <p>Likes: {course.likes}</p>
      <button className="like-button" onClick={onLike}>
        Like
      </button>
    </div>
  );
};

export default CourseCard;
