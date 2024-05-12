import { createContext, useState } from "react";

export const CoursesByUserContext = createContext();

const CoursesByUserProvider = ({ children }) => {
  const [courses, setCourses] = useState({
    listCoursesByStudent: [],
    listCoursesByInstructor: [],
  });

  return (
    <CoursesByUserContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesByUserContext.Provider>
  );
};

export default CoursesByUserProvider;
