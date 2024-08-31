import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./reducers/coursesSlice";

export const store = configureStore({
  reducer: {
    courses: coursesSlice,
  },
});
