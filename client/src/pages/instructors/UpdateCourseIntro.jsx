import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimatedProgressBar from "../../Components/AnimatedProgressBar";
import { getCourse } from "../../services/coursesService";
import ReviewCard from "../../Components/ReviewCard";
const UpdateCourseIntro = () => {
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
    averageStars: 0,
    reviews: [],
  });

  useEffect(() => {
    setTimeout(async () => {
      const { reviews, averageStars } = await getCourse(formData._id);
      setFormData({
        ...formData,
        averageStars,
        reviews,
      });
      setLoading(false);
    }, 0);
  }, []);

  return (
    <>
      {loading ? (
        <div className="container pt-5">
          <AnimatedProgressBar />
        </div>
      ) : (
        <>
          <section className="bg-dark text-light">
            <div className="container">
              <div className="row">
                <div className="col-5">
                  <img
                    src={formData.picture}
                    className="object-fit-contain rounded mb-5"
                    style={{ width: "500px" }}
                  />
                </div>
                <div className="col">
                  <div className="d-flex justify-content-between">
                    <p className="lead fs-3">{formData.title}</p>
                    <div>
                      <button className="btn btn-success me-2">
                        <i className="bi bi-pencil-square"></i> Edit Intro
                      </button>
                      <button className="btn btn-primary">
                        <i className="bi bi-pencil-square"></i> Edit Details
                      </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="text-warning">
                      <p className="lead">
                        {[...Array(5)].map((_, index) => {
                          if (index < Math.floor(formData.averageStars)) {
                            return (
                              <i key={index} className="bi bi-star-fill">
                                {" "}
                              </i>
                            );
                          } else if (
                            index === Math.floor(formData.averageStars) &&
                            formData.averageStars % 1 !== 0
                          ) {
                            return (
                              <i key={index} className="bi bi-star-half">
                                {" "}
                              </i>
                            );
                          } else {
                            return (
                              <i key={index} className="bi bi-star">
                                {" "}
                              </i>
                            );
                          }
                        })}
                        {` ${formData.averageStars}`}
                      </p>
                    </div>
                    <p className="fs-1 text-info">💲{formData.price}</p>
                  </div>

                  <div
                    className="badge text-bg-primary text-wrap mb-5"
                    style={{ height: "30px" }}
                  >
                    <p className="lead">🎓​{formData.instructorName}</p>
                  </div>
                  <p className="fs-5">{formData.description}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="p-5">
            <div className="container d-flex justify-content-center flex-wrap">
              {formData.reviews.length === 0 ? (
                <p className="fs-2 text-center text-danger">
                  There is no review.
                </p>
              ) : (
                <>
                  {formData.reviews.map((review) => (
                    <div key={review._id}>
                      <ReviewCard review={review}></ReviewCard>
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

export default UpdateCourseIntro;
