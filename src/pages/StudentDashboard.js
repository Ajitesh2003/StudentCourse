import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnrolledCourses,
  removeCourse,
} from "../redux/reducers/coursesSlice";
import { auth } from "../firebase"; // Import your Firebase config

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.courses.enrolledCourses);
  const user = auth.currentUser; // Get the current user from Firebase auth

  useEffect(() => {
    if (user) {
      console.log("Fetching courses for user ID:", user.uid); // Debug log
      dispatch(fetchEnrolledCourses(user.uid));
    } else {
      console.error("No user is currently authenticated");
    }
  }, [dispatch, user]);

  const handleMarkAsCompleted = (course) => {
    dispatch(removeCourse(course));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Georgia', serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Courses</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {enrolledCourses.length === 0 ? (
          <p>No courses enrolled.</p>
        ) : (
          enrolledCourses.map((course) => (
            <li
              key={course.id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  style={{
                    width: "100px",
                    height: "auto",
                    marginRight: "20px",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <h3 style={{ margin: "0 0 10px 0" }}>{course.name}</h3>
                  <p style={{ margin: "0 0 5px 0" }}>
                    Instructor: {course.instructor}
                  </p>
                  <p style={{ margin: "0 0 5px 0" }}>
                    Due Date: {course.dueDate}
                  </p>
                  <progress
                    value={course.progress}
                    max="100"
                    style={{ width: "100%", marginBottom: "10px" }}
                  ></progress>
                  <button
                    onClick={() => handleMarkAsCompleted(course)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudentDashboard;
