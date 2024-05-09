import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import { getUserListByRole } from "../../services/usersService";
import Role from "../../../../server/models/RoleEnum";
import Table from "react-bootstrap/Table";

const UserManager = () => {
  const { users, setUsers } = useContext(UsersContext);

  useEffect(() => {
    setTimeout(async () => {
      const students = await getUserListByRole(Role.STUDENT);
      setUsers({ students });
    }, 0);
  }, []);

  return (
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
            <td>{user.status}</td>
            <td>{user.role}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserManager;
