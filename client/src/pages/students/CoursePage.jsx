import React, { useState, useEffect } from "react";
import CourseCart2 from "../../Components/CourseCart2";
import "bootstrap/dist/css/bootstrap.min.css";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const res = await fetch("/api/courses/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCourses(data.courses);
      } catch (error) {
        setError(error.message);
      }
    };

    getAllCourses();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h2>Course Listing Page</h2>
        </div>
      </div>
      <div className="container">
        <div className="center">
          <div className="row">
            {courses.map((course) => (
              <div key={course._id} className="col-md-3">
                <CourseCart2 course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
