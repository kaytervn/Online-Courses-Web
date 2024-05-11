const ReviewCard = ({ review, children }) => {
  return (
    <>
      <div className={`card h-100`} style={{ width: "1000px" }}>
        <img
          src={review.userPicture}
          className="card-img-top object-fit-contain"
          style={{ height: "200px" }}
        />
        <div className="card-header">{review.userName}</div>
        <div className="card-body">
          <div className="d-flex align-items-center">{review.content}</div>
        </div>
        <div className="card-footer">
          <div className="d-flex align-items-center">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
