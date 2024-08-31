import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, addDoc } from "../firebase"; // Importing addDoc
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/reducers/coursesSlice";
import DrawerComp from "./DrawerComp";
import StudentDashboard from "./StudentDashboard";

const CourseListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  const addCourse = async () => {
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        name: "Introduction to React Native",
        instructor: "John Doe",
        description:
          "Learn the basics of React Native development and build your first mobile app.",
        enrollmentStatus: "Open",
        thumbnail: "https://example.com/thumbnail.jpg",
        duration: "8 weeks",
        schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
        location: "Online",
        prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
        syllabus: [
          {
            week: 1,
            topic: "Introduction to React Native",
            content:
              "Overview of React Native, setting up your development environment.",
          },
          {
            week: 2,
            topic: "Building Your First App",
            content:
              "Creating a simple mobile app using React Native components.",
          },
        ],
        students: [
          {
            id: 101,
            name: "Alice Johnson",
            email: "alice@example.com",
          },
          {
            id: 102,
            name: "Bob Smith",
            email: "bob@example.com",
          },
        ],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const courseSnapshot = await getDocs(coursesCollection);
        const coursesList = courseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setCourses(coursesList));
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    fetchCourses();
  }, [dispatch]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Course List</h1>
      {/*<button onClick={addCourse}>Add New Course</button>*/}
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DrawerComp>
        <StudentDashboard />
      </DrawerComp>
      <ul>
        {filteredCourses.map((course) => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`}>
              <h3>{course.name}</h3>
              <p>Instructor: {course.instructor}</p>
              <img src={course.thumbnail} alt={course.name} width="100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseListing;
