import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import {
  changeUserStatus,
  getUserListByRole,
} from "../../services/usersService";
import Role from "../../../../server/models/RoleEnum";
import Container from "react-bootstrap/Container";
import Alert from "../../Components/Alert";

import DataTable, {
  Alignment,
  createTheme,
  defaultThemes,
} from "react-data-table-component";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import AdminNavBar from "../../Components/AdminNavBar";
import { Table } from "react-bootstrap";
import { customStyles } from "../../Components/customStyles/datatableCustom";
import { CoursesContext } from "../../contexts/CoursesContext";
import { getAllCourse } from "../../services/coursesService";

const CourseManager = () => {
  const { courses, setCourses } = useContext(CoursesContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const listCourses = await getAllCourse();
      setCourses({ listCourses });
    }, 0);
  }, []);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Picture",
      selector: (row) => row.picture,
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
        <FormCheckInput
          type="checkbox"
          checked={row.visibility}
          //   onChange={(e) => handleVisibilityChange(e, row._id)}
        />
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <FormCheckInput
          type="checkbox"
          checked={row.status}
          //   onChange={(e) => handleStatusChange(e, row._id)}
        />
      ),
    },
  ];

  //   const handleStatusChange = async (e, id) => {
  //     e.preventDefault();
  //     try {
  //       const message = await id;
  //       setSuccess(message.success);
  //       const listCourses = await getAllCourse();
  //       setCourses({ listCourses });
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   const handleVisibilityChange = async (e, id) => {
  //     e.preventDefault();
  //     try {
  //       const message = await changeCourseVisibility(id);
  //       setSuccess(message.success);
  //       const listCourses = await getAllCourse();
  //       setCourses({ listCourses });
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   async function handleSearch(e) {
  //     const newInstructors = (await getUserListByRole(Role.INSTRUCTOR)).filter(
  //       (student) =>
  //         student.name.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //     setCourses({ listCourses: newInstructors });
  //   }

  return (
    <div>
      <Row>
        <Col md={3}>
          <AdminNavBar />
        </Col>
        <Col md={8}>
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
                // onChange={handleSearch}
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
    </div>
  );
};

export default CourseManager;
