const createReview = async (courseId, reviewData) => {
  const response = await fetch(`/api/reviews/create_review/${courseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(reviewData),
  });
  const data = await response.json();
  return data;
};

const getReviewCourse = async (courseId) => {
  const res = await fetch(`/api/reviews/get-review-course/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export { createReview };
