import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CourseListing from "./pages/CourseListing";
import CourseDetails from "./pages/CourseDetails";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import { auth } from "./firebase"; // Import your Firebase auth config
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Stop loading once we have the auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading indicator while checking authentication
  }

  return (
    <Router>
      <Routes>
        {/* Default Route: Show AuthComponent or CourseListing based on user auth state */}
        <Route path="/" element={user ? <CourseListing /> : <Login />} />

        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Protect the Student Dashboard Route */}
        <Route
          path="/dashboard"
          element={user ? <StudentDashboard /> : <Navigate to="/" />}
        />

        {/* Separate route for authentication in case user tries to access it directly */}
        <Route path="/auth" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
