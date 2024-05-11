import React, { useContext, useEffect, useState } from "react";
import { getMyCourse } from "../../services/invoiceService"; // Đường dẫn này giả sử bạn đã xuất hàm getMyCourse từ một module service
import MyCourseCard from "../../Components/MyCourseCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MyCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getMyCourse();
        if (data.courses) {
          setCourses(data.courses);
        } else {
          setError("Không có khóa học nào.");
        }
      } catch (error) {
        setError("Lỗi khi tải khóa học: " + error.message);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Các Khóa Học Của Tôi</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-start">
          {courses.map((course) => (
            <MyCourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MyCoursePage;
