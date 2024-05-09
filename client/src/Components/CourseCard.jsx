const CourseCard = () => {
  return (
    <>
      <div class="card h-100" id="course1">
        <img src="${filterArray[i].image}" class="card-img-top" />
        <div class="card-header bg-white">
          <h5>${filterArray[i].courseName}</h5>
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">${filterArray[i].teacherName}</div>
            <i>${filterArray[i].date}</i>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="">
              <div class="lead pe-2 text-success">
                <i class="bi bi-cash-coin"></i> ${filterArray[i].price}
              </div>
            </div>
            <div class="">
              <span class="badge text-bg-success">
                <i class="fa fa-user" aria-hidden="true"></i> $
                {filterArray[i].joined}
              </span>
            </div>
            <div class="flex-grow-1">
              <p class="text-primary text-end">${filterArray[i].level}</p>
            </div>
          </div>
          <div class="d-grid pt-2">
            <a href="#" class="btn btn-dark">
              Details{" "}
              <span class="badge text-bg-secondary">
                <i class="bi bi-chat-square-text-fill"></i> $
                {filterArray[i].reviews}
              </span>
            </a>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-flex align-items-center">
            <div class="pe-2 flex-grow-1">
              <a href="#" class="btn btn-outline-danger w-100">
                <i class="fa fa-heart" aria-hidden="true"></i> $
                {filterArray[i].wishlisted}
              </a>
            </div>
            <a href="#" class="btn btn-outline-primary">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
