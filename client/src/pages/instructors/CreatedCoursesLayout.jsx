import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const CreatedCourses = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <section className="bg-primary text-light p-5">
        <div className="container">
          <div className="row">
            <div className="d-md-flex justify-content-between align-items-center">
              <div className="col-3">
                <h2 className="mb-3 mb-md-0">
                  My <span className="text-warning">Created</span> Courses
                </h2>
              </div>
              <div className="col">
                <div className="input-group news-input">
                  <span className="input-group-text">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="input-group pb-4">
                <span className="input-group-text bg-warning text-light">
                  <i className="fa fa-sort" aria-hidden="true"></i>
                </span>
                <select
                  onchange="executeFilter()"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="lastUpdated" selected>
                    Last Updated
                  </option>
                  <option value="title">Title</option>
                </select>
              </div>
              <ul className="list-group pb-4">
                <li className="list-group-item bg-warning text-light text-center">
                  <b>Visibility</b>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Private
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Public
                    </label>
                  </div>
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item bg-warning text-light text-center">
                  <b>Topic</b>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Web Development
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Artificial Intelligence
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Data Science
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Mobile Development
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Game Development
                    </label>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Software Engineering
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col">
              <div
                className="row row-cols-1 row-cols-md-3 g-4 pb-4"
                id="listCourse"
              ></div>
              <div className="d-flex justify-content-center">
                <ul className="pagination"></ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatedCourses;
