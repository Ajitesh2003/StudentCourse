import React, { useState } from "react";
import { auth, db } from "../firebase"; // Import your Firebase config
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info
      const user = result.user;
      console.log("User Signed In with Google:", user);

      // User entry Updates...
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          displayName: user.displayName,
          enrolledCourses: [], // Initialize with an empty array
        },
        { merge: true }
      );

      // Optional: create a user document in Firestore if needed
      // createUserInFirestore(user);
    } catch (error) {
      console.error("Google Authentication Error:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {isRegistering ? "Register or Login with Google" : "Login with Google"}
      </h2>
      <button
        onClick={handleGoogleAuth}
        style={{ padding: "10px 20px", margin: "10px 0" }}
      >
        Sign {isRegistering ? "Up" : "In"} with Google
      </button>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ marginTop: "10px" }}
      >
        Switch to {isRegistering ? "Login" : "Register"}
      </button>
    </div>
  );
};

export default Login;
