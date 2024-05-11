import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCourseLessons } from "../../services/lessonsService";
import CourseIntroView from "../../Components/CourseIntroView";
import AnimatedProgressBar from "../../Components/AnimatedProgressBar";
import LessonCard from "../../Components/LessonCard";
import { deleteCourse } from "../../services/coursesService";

const UpdateCourseDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: state._id,
    userId: state.userId,
    picture: state.picture,
    title: state.title,
    price: state.price,
    description: state.description,
    topic: state.topic,
    instructorName: state.instructorName,
    averageStars: state.averageStars,
    lessons: [],
  });

  useEffect(() => {
    setTimeout(async () => {
      const lessons = await getCourseLessons(formData._id);
      setFormData({
        ...formData,
        lessons,
      });
      setLoading(false);
    }, 0);
  }, []);

  const handleDelete = async (_id) => {
    if (confirm("Confirm delete?")) {
      try {
        await deleteCourse(_id);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="container pt-5">
          <AnimatedProgressBar />
        </div>
      ) : (
        <>
          <CourseIntroView formData={formData}>
            <Link to="/create-lesson" state={formData}>
              <button className="btn btn-primary me-2">
                📁​ Create Lesson
              </button>
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(formData._id)}
            >
              <i className="bi bi-trash-fill"></i> Delete Course
            </button>
          </CourseIntroView>
          <section className="p-5">
            <div className="container d-flex justify-content-center flex-wrap">
              {formData.lessons.length === 0 ? (
                <p className="fs-2 text-center text-danger">
                  No lesson created.
                </p>
              ) : (
                <>
                  {formData.lessons.map((lesson) => (
                    <div key={lesson._id}>
                      <LessonCard lesson={lesson}></LessonCard>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default UpdateCourseDetails;
