import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import {
  changeUserStatus,
  getUserListByRole,
} from "../../services/usersService";
import Role from "../../../../server/models/RoleEnum";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import Alert from "../../Components/Alert";

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

  return (
    <Container>
      {success && <Alert msg={success} type="success" />}
      {error && <Alert msg={error} type="error" />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Status</th>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.students.map((user) => (
            <tr key={user._id}>
              <td>{user.picture}</td>
              <td>
                <FormCheckInput
                  type="checkbox"
                  checked={user.status}
                  onChange={(e) => handleStatusChange(e, user._id)}
                />
              </td>
              <td>{user.role}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManager;
