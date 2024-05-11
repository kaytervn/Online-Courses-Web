import { useContext, useEffect, useState } from "react";
import Alert from "../../Components/Alert";

import DataTable from "react-data-table-component";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminNavBar from "../../Components/AdminNavBar";
import { customStyles } from "../../Components/customStyles/datatableCustom";
import { CoursesContext } from "../../contexts/CoursesContext";
import {
  changeCourseStatus,
  changeCourseVisibility,
  getAllCourseAdmin,
} from "../../services/coursesService";
import { Image } from "react-bootstrap";
import styled from "styled-components";

const CourseManager = () => {
  const { courses, setCourses } = useContext(CoursesContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const listCourses = await getAllCourseAdmin();
      setCourses({ listCourses });

      if (success || error) {
        const timer = setTimeout(() => {
          setSuccess("");
          setError("");
        }, 2000);

        // Xóa timeout
        return () => clearTimeout(timer);
      }
    }, 0);
  }, [success, error]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Picture",
      selector: (row) => (
        <div className="text-center">
          {row.picture == "" || row.picture == "false" ? (
            <Image
              roundedCircle
              width={"40"}
              height={"40"}
              src={"../../../images/user.png"}
            />
          ) : (
            <Image roundedCircle width={"40"} height={"40"} src={row.picture} />
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Visibility",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          {row.visibility ? (
            <button
              className="btn  btn-success"
              onClick={(e) => handleVisibilityChange(e, row._id)}
            >
              Enable
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={(e) => handleVisibilityChange(e, row._id)}
            >
              Disable
            </button>
          )}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          {row.status ? (
            <button
              className="btn btn-success"
              onClick={(e) => handleStatusChange(e, row._id)}
            >
              Enable
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={(e) => handleStatusChange(e, row._id)}
            >
              Disable
            </button>
          )}
        </div>
      ),
    },
    {
      name: "",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary">Add</button>
          <button className="btn btn-primary ms-3">Edit</button>
        </div>
      ),
    },
  ];

  const handleStatusChange = async (e, id) => {
    e.preventDefault();
    if (confirm("Confirm change status for this course?")) {
      try {
        const message = await changeCourseStatus(id);
        setSuccess(message.success);
        const listCourses = await getAllCourseAdmin();
        setCourses({ listCourses });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleVisibilityChange = async (e, id) => {
    e.preventDefault();
    if (confirm("Confirm change visibility for this course?")) {
      try {
        const message = await changeCourseVisibility(id);
        setSuccess(message.success);
        const listCourses = await getAllCourseAdmin();
        setCourses({ listCourses });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  async function handleSearch(e) {
    e.preventDefault();
    console.log(await getAllCourseAdmin());
    const newCourses = (await getAllCourseAdmin()).filter(
      (course) =>
        course.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        course.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(newCourses);
    setCourses({ listCourses: newCourses });
  }

  return (
    <Row>
      <Col md={3}>
        <AdminNavBar />
      </Col>
      <Col md={8}>
        <h1 className=""> Courses Manager</h1>
        {success && <Alert msg={success} type="success" />}
        {error && <Alert msg={error} type="error" />}
        <div className="text-end mb-3 mt-3">
          <div className="input-group news-input">
            <span className="input-group-text">
              <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search..."
              onChange={handleSearch}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={courses.listCourses}
          fixedHeader
          pagination
          customStyles={customStyles}
        ></DataTable>
      </Col>
    </Row>
  );
};

export default CourseManager;
