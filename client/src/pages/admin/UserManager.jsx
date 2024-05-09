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
  createTheme,
  defaultThemes,
} from "react-data-table-component";
import FormCheckInput from "react-bootstrap/FormCheckInput";

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
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Picture",
      selector: (row) => row.picture,
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
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
        "&:last-of-type": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
        "&:first-of-type": {
          borderLeftStyle: "solid",
          borderLeftWidth: "1px",
          borderLeftColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
        "&:last-of-type": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
        "&:first-of-type": {
          borderLeftStyle: "solid",
          borderLeftWidth: "1px",
          borderLeftColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  return (
    <Container>
      {success && <Alert msg={success} type="success" />}
      {error && <Alert msg={error} type="error" />}
      <div className="text-end mb-3 ">
        <input type="text" onChange={handleSearch} className="w-50" />
      </div>
      <DataTable
        columns={columns}
        data={users.students}
        fixedHeader
        pagination
        customStyles={customStyles}
      ></DataTable>
    </Container>
  );
};

export default UserManager;
