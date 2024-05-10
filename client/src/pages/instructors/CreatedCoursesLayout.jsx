import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchUserCourses } from "../../services/coursesService";
import AnimatedProgressBar from "../../Components/AnimatedProgressBar";
import CourseCard from "../../Components/CourseCard";
import "../../styles/cardHover.css";
import Topic from "../../../../server/models/TopicEnum.js";
import { MyCreatedCoursesContext } from "../../contexts/MyCreatedCoursesContext.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import Pagination from "../../Components/Pagination.jsx";

const CreatedCourses = () => {
  const { createdCourses, setCreatedCourses } = useContext(
    MyCreatedCoursesContext
  );
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [selectedVisibility, setSelectedVisibility] = useState("ALL");
  const [selectedSort, setSelectedSort] = useState("lastUpdated");

  const topics = [
    "ALL",
    Topic.WEB,
    Topic.AI,
    Topic.DATA,
    Topic.MOBILE,
    Topic.GAME,
    Topic.SOFTWARE,
  ];
  const visibilities = ["ALL", true, false];

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setCreatedCourses({
      ...createdCourses,
      currentPage: 1,
    });
  };

  const handleVisibilityChange = (visibility) => {
    setSelectedVisibility(visibility);
    setCreatedCourses({
      ...createdCourses,
      currentPage: 1,
    });
  };

  const handleSortChange = async (e) => {
    setSelectedSort(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
    setCreatedCourses({
      ...createdCourses,
      currentPage: 1,
    });
  };

  const onPageChange = async (page) => {
    setCreatedCourses({
      ...createdCourses,
      currentPage: page,
    });
    setLoading(true);
    await updateDisplay();
  };

  const updateDisplay = async () => {
    const data = await searchUserCourses({
      keyword: searchValue,
      visibility: selectedVisibility,
      topic: selectedTopic,
      page: createdCourses.currentPage,
      sort: selectedSort,
    });
    setCreatedCourses({
      ...createdCourses,
      courses: data.courses,
      totalPages: data.totalPages,
    });
    setLoading(false);
    console.log({
      keyword: searchValue,
      visibility: selectedVisibility,
      topic: selectedTopic,
      page: createdCourses.currentPage,
      sort: selectedSort,
    });
  };

  useEffect(() => {
    setTimeout(async () => {
      setLoading(true);
      await updateDisplay();
    }, 100);
  }, [searchValue, selectedVisibility, selectedTopic, selectedSort]);

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
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchInputChange}
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
        ) : createdCourses.length === 0 ? (
          <p className="fs-2 text-center text-danger">Not Found.</p>
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
                    value={selectedSort}
                    onChange={handleSortChange}
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
                          onChange={(e) => handleVisibilityChange(visibility)}
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
                          onChange={(e) => handleTopicChange(topic)}
                          id={topic}
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
                <div className="row row-cols-1 row-cols-md-3 g-4 pb-4">
                  {createdCourses.courses.map((course) => (
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
              </div>
            </div>
          </div>
        )}
        <Pagination
          currentPage={createdCourses.currentPage}
          totalPages={createdCourses.totalPages}
          onPageChange={onPageChange}
        />
      </section>
    </>
  );
};

export default CreatedCourses;
