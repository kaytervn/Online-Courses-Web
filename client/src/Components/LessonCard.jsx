const LessonCard = ({ lesson, children }) => {
  return (
    <>
      <div className="mb-5">
        <div className={`card h-100`}>
          <div className="card-header">{lesson.title}</div>
          <div className="card-body">{lesson.description}</div>
          <div className="card-footer">{lesson.createdAt}</div>
        </div>
      </div>
    </>
  );
};

export default LessonCard;
