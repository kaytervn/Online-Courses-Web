import React from "react";

const CourseCart2 = () => {
  return (
    <div className="card" style={{ maxWidth: "200px" }}>
      <img
        src="https://res.cloudinary.com/dinyrr5ad/image/upload/v1715090818/fojiamekxsts6rsvowmp.png"
        className="card-img-top"
        alt="..."
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "1rem" }}>
          Khoa a
        </h5>
        <p className="card-text" style={{ fontSize: "0.8rem" }}>
          hoc Laptrinh
        </p>
        <a href="#" className="btn btn-primary" style={{ fontSize: "0.8rem" }}>
          Add to cart
        </a>
      </div>
    </div>
  );
};

export default CourseCart2;
