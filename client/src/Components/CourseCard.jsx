const CourseCard = ({ course, instructorName, children }) => {
  return (
    <div className="card h-100" id="course1">
      <img src={course.picture} className="card-img-top" />
      <div className="card-header bg-white">
        <h5>{course.title}</h5>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">{instructorName}</div>
          <i className="text-primary">
            {new Date(course.createdAt).toLocaleDateString()}
          </i>
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="lead text-success">
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
