const MyCourseCard = ({ course }) => {
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
              <a href="#" className="btn btn-primary me-md-2">
                Chi tiết
              </a>
              <a href="#" className="btn btn-primary">
                Đánh giá
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyCourseCard;