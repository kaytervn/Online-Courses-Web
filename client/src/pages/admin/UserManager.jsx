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

import Image from "react-bootstrap/esm/Image";

const UserManager = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const students = await getUserListByRole(Role.STUDENT);
      setUsers({ students });

      if (success || error) {
        const timer = setTimeout(() => {
          setSuccess("");
          setError("");
        }, 2000);

        // Xóa timeout khi component unmount
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
          <button className="btn btn-primary">Add</button>
          <button className="btn btn-primary ms-3">Edit</button>
        </div>
      ),
    },
  ];

  const handleStatusChange = async (e, id) => {
    e.preventDefault();
    if (confirm("Confirm change status for this student?")) {
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
    console.log(await getUserListByRole(Role.STUDENT));
    const newStudents = (await getUserListByRole(Role.STUDENT)).filter(
      (student) =>
        student.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        student.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers({ students: newStudents });
  }
  return (
    <Row className="ms-(-6) me-0">
      <Col md={3}>
        <AdminNavBar />
      </Col>
      <Col md={8}>
        <Container>
          <h1 className=""> Students Manager</h1>

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
            data={users.students}
            fixedHeader
            pagination
            customStyles={customStyles}
          ></DataTable>
        </Container>
      </Col>
    </Row>
  );
};

export default UserManager;
