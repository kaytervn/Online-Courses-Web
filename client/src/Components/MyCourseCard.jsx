import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { createReview } from "../services/reviewsService";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  integrity="sha512-xxV5OQw0W3Ls2J6nM8dLQyH3S+XvVjJ1NmeE6cJF0M8TqRlF7WQX5f0ypJ/mzrCQh1wBqRzUfI40Wzd1Tqg+8A=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MyCourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [ratingStar, setRatingStar] = useState(5);
  const [content, setContent] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        ratingStar,
        content,
      };

      const data = await createReview(course._id, reviewData);

      if (data.message) {
        setShowModal(false);
        setRatingStar(5);
        setContent("");
        if (data.message === "You have already reviewed this course."){
          toast.error("Error: " + data.message);

        } else {
        toast.success(data.message);

        }
      } else if (data.error) {
        if (data.error === "You have already reviewed this course.")
          toast.error("Error: " + data.error);
      }
    } catch (error) {
      toast.error("Failed to submit review: " + error.message);
    }
  };

  const renderRatingStars = () => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const starClassName = i <= ratingStar ? "fas" : "far"; // Sử dụng "fas" cho sao đã chọn và "far" cho sao chưa chọn
    const starStyle = {
      fontSize: "24px", // Kích thước hình sao
      transform: "rotateZ(0deg)",
      transition: "transform 0.3s ease-in-out",
    };

    if (!navigator.onLine) {
      starStyle.transform = "rotateZ(360deg)"; // Hiệu ứng lật khi không có internet
    }

    stars.push(
      <i
        key={i}
        className={`${starClassName} fa-star`}
        style={starStyle}
        onClick={() => setRatingStar(i)}
      ></i>
    );
  }

  return stars;
};

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={course.picture}
            className="img-fluid rounded-start"
            alt={course.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <p className="card-text">{course.description}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Đánh giá
              </Button>
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Đánh giá Khóa Học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="ratingStar">
                      <Form.Label>Số sao</Form.Label>
                      <div className="rating-stars-contai">{renderRatingStars()}</div>
                    </Form.Group>
                    <Form.Group controlId="content">
                      <Form.Label>Nội dung</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </Button>
                  <Button variant="primary" onClick={handleReviewSubmit}>
                    Gửi đánh giá
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
