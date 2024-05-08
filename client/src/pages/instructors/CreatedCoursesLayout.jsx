import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const CreatedCourses = () => {
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div>
      <h1
        className="d-flex text-danger justify-content-center text-align-center"
        style={{ marginTop: "20%" }}
      >
        Created Courses Here
      </h1>
    </div>
  );
};

export default CreatedCourses;
