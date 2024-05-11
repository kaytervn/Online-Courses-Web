const CourseCard = ({ course, instructorName, children }) => {
  return (
    <div
      className={`card h-100 ${
        course.visibility ? "" : "text-white bg-warning opacity-50"
      }`}
    >
      <img src={course.picture} className="card-img-top" />
      <div className="card-header">
        <h5>{course.title}</h5>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">{instructorName}</div>
          <i>{new Date(course.createdAt).toLocaleDateString()}</i>
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div
            className={`lead ${
              course.visibility ? "text-success" : "text-white"
            }`}
          >
            <i className="bi bi-wallet2"></i> {course.price}
          </div>
          <div className="flex-grow-1">
            <p className="text-primary text-end">{course.topic}</p>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex align-items-center">{children}</div>
      </div>
    </div>
  );
};

export default CourseCard;
