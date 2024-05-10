import { createContext, useState } from "react";

export const MyCreatedCoursesContext = createContext();

const MyCreatedCoursesProvider = ({ children }) => {
  const [createdCourses, setCreatedCourses] = useState({
    courses: [],
    currentPage: 1,
    totalPages: 1,
  });

  return (
    <MyCreatedCoursesContext.Provider
      value={{ createdCourses, setCreatedCourses }}
    >
      {children}
    </MyCreatedCoursesContext.Provider>
  );
};

export default MyCreatedCoursesProvider;
