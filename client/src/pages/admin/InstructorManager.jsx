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
import { Image, Table } from "react-bootstrap";
import { customStyles } from "../../Components/customStyles/datatableCustom";

const InstructorManager = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const instructors = await getUserListByRole(Role.INSTRUCTOR);
      setUsers({ instructors });

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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      // width: "200px",
      textAlign: "center",
    },
    {
      name: "Email",
      selector: (row) => row.email,
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
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "",
      selector: (row) => (
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary ms-3">Detail</button>
        </div>
      ),
    },
  ];

  const handleStatusChange = async (e, id) => {
    e.preventDefault();
    if (confirm("Confirm change status for this instructor?")) {
      try {
        const message = await changeUserStatus(id);
        setSuccess(message.success);
        const students = await getUserListByRole(Role.STUDENT);
        setUsers({ students });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  async function handleSearch(e) {
    const newInstructors = (await getUserListByRole(Role.INSTRUCTOR)).filter(
      (instructor) =>
        instructor.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        instructor.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers({ instructors: newInstructors });
  }

  return (
    <Row className="ms-(-6) me-0">
      <Col md={3}>
        <AdminNavBar />
      </Col>
      <Col md={8}>
        <h1 className=""> Instructors Manager</h1>
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
          data={users.instructors}
          fixedHeader
          pagination
          customStyles={customStyles}
        ></DataTable>
      </Col>
    </Row>
  );
};

export default InstructorManager;
