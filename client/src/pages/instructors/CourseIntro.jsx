import imgSample from "../../../images/blank.png";

const CourseIntro = () => {
  return (
    <>
      <section className="bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <img src={imgSample} thumbnail style={{ height: "500px" }} />
            </div>
            <div className="col">
              <p className="fs-3">Course Name</p>
              <p className="">Instructor Name</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseIntro;
