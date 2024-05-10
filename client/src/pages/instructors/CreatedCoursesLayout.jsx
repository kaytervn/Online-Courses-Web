import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { searchUserCourses } from "../../services/coursesService";
import AnimatedProgressBar from "../../Components/AnimatedProgressBar";
import CourseCard from "../../Components/CourseCard";
import "../../styles/cardHover.css";
import Topic from "../../../../server/models/TopicEnum.js";

const CreatedCourses = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const topics = [
    "ALL",
    Topic.WEB,
    Topic.AI,
    Topic.DATA,
    Topic.MOBILE,
    Topic.GAME,
    Topic.SOFTWARE,
  ];
  const [selectedVisibility, setSelectedVisibility] = useState("ALL");
  const visibilities = ["ALL", true, false];

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  const handleVisibilityChange = (visibility) => {
    setSelectedVisibility(visibility);
  };

  useEffect(() => {
    setTimeout(async () => {
      const courses = await searchUserCourses(search);
      setUser({ ...user, createdCourses: courses });
      setLoading(false);
    }, 0);
  }, []);

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
        {loading ? (
          <AnimatedProgressBar />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-2">
                <div className="input-group pb-4">
                  <span className="input-group-text bg-warning text-light">
                    <i className="fa fa-sort" aria-hidden="true"></i>
                  </span>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue="lastUpdated"
                  >
                    <option value="lastUpdated">Last Updated</option>
                    <option value="title">Title</option>
                  </select>
                </div>
                <ul className="list-group pb-4">
                  <li className="list-group-item bg-warning text-light text-center">
                    <b>Visibility</b>
                  </li>
                  {visibilities.map((visibility) => (
                    <li className="list-group-item" key={visibility}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value={visibility}
                          checked={selectedVisibility === visibility}
                          onChange={() => handleVisibilityChange(visibility)}
                        />
                        <label className="form-check-label">
                          {visibility === false
                            ? "PRIVATE"
                            : visibility === true
                            ? "PUBLIC"
                            : visibility}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="list-group">
                  <li className="list-group-item bg-warning text-light text-center">
                    <b>Topic</b>
                  </li>
                  {topics.map((topic) => (
                    <li className="list-group-item" key={topic}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value={topic}
                          checked={selectedTopic === topic}
                          id={topic}
                          onChange={() => handleTopicChange(topic)}
                        />
                        <label className="form-check-label" htmlFor={topic}>
                          {topic.toUpperCase()}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <div
                  className="row row-cols-1 row-cols-md-3 g-4 pb-4"
                  id="listCourse"
                >
                  {user.createdCourses.map((course) => (
                    <div key={course._id}>
                      <CourseCard course={course} instructorName={user.name}>
                        <div className="pe-2 flex-grow-1">
                          <a href="#" className="btn btn-outline-dark w-100">
                            <i className="bi bi-pencil-square"></i> Edit
                          </a>
                        </div>
                        <a href="#" className="btn btn-outline-danger">
                          <i className="bi bi-eye-slash"></i>
                        </a>
                      </CourseCard>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link">Previous</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active" aria-current="page">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CreatedCourses;
