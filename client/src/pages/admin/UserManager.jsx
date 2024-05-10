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
    }, 0);
  }, []);

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
          <Image roundedCircle width="40" src={row.picture} />
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <FormCheckInput
          type="checkbox"
          checked={row.status}
          onChange={(e) => handleStatusChange(e, row._id)}
        />
      ),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
  ];

  const handleStatusChange = async (e, id) => {
    e.preventDefault();
    try {
      const message = await changeUserStatus(id);
      setSuccess(message.success);
      const students = await getUserListByRole(Role.STUDENT);
      setUsers({ students });
    } catch (err) {
      setError(err.message);
    }
  };

  // const handleSearch = (e) => async () => {
  //   e.preventDefault();
  //   const newStudents = users.students.filter((student) =>
  //     student.name.toLowerCase().includes(e.target.value.toLowerCase())
  //   );
  //   setUsers({ students: newStudents });
  // };

  async function handleSearch(e) {
    const newStudents = (await getUserListByRole(Role.STUDENT)).filter(
      (student) =>
        student.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers({ students: newStudents });
  }
  return (
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
      </Col>
    </Row>
  );
};

export default UserManager;
