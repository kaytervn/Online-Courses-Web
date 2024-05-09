import { createContext, useState } from "react";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState({
    students: [],
  });

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
