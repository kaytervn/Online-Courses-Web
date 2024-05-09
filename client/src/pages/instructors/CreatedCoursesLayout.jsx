import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const CreatedCourses = () => {
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <>
      <section class="bg-primary text-light p-5">
        <div class="container">
          <div class="d-md-flex justify-content-between align-items-center">
            <div class="input-group news-input">
              <span class="input-group-text">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                class="form-control"
                id="searchInput"
                placeholder="Search..."
                oninput="executeFilter()"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatedCourses;
