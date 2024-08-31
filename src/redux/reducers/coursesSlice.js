import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    selectedCourse: null,
    enrolledCourses: [],
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    addCourse: (state, action) => {
      state.enrolledCourses.push(action.payload);
    },
    removeCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload.id
      );
    },
  },
});

export const {
  setCourses,
  setSelectedCourse,
  setEnrolledCourses,
  addCourse,
  removeCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;

// Thunks to fetch data
export const fetchCourses = () => async (dispatch) => {
  try {
    const coursesCollection = collection(db, "courses");
    const courseSnapshot = await getDocs(coursesCollection);
    const courses = courseSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setCourses(courses));
  } catch (error) {
    console.error("Error fetching courses: ", error);
  }
};

export const fetchEnrolledCourses = (userId) => async (dispatch) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const enrolledCourses = userDoc.data().enrolledCourses;
      dispatch(setEnrolledCourses(enrolledCourses || []));
    } else {
      console.error("User not found");
      dispatch(setEnrolledCourses([])); // Set to empty array if user not found
    }
  } catch (error) {
    console.error("Error fetching enrolled courses: ", error);
    dispatch(setEnrolledCourses([])); // Set to empty array on error
  }
};
