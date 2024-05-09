import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../services/usersService";
import userImage from "../../images/user.png";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Role from "../../../server/models/RoleEnum";

const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Confirm logout?")) {
      setUser({ email: null, name: null, picture: null, role: null });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  return (
    <>
      {user.role == Role.ADMIN ? (
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand href="/">HomeAdmin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {user.token ? (
                  <>
                    <Image
                      src={userImage || user.image}
                      style={{ width: "40px", height: "40px" }}
                      className="me-2"
                    ></Image>
                    <Navbar.Text>{user.name}</Navbar.Text>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : user.role == Role.INSTRUCTOR ? (
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {user.token ? (
                  <>
                    <Image
                      src={userImage || user.image}
                      style={{ width: "40px", height: "40px" }}
                      className="me-2"
                    ></Image>
                    <Navbar.Text>{user.name}</Navbar.Text>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {user.token ? (
                  <>
                    <Image
                      src={userImage || user.image}
                      style={{ width: "40px", height: "40px" }}
                      className="me-2"
                    ></Image>
                    <Navbar.Text>{user.name}</Navbar.Text>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <Outlet />
    </>
  );
};

export default Layout;
// import { Link, Outlet } from "react-router-dom"
// import Button from 'react-bootstrap/Button';
// // import "bootstrap/dist/css/bootstrap.min.css";

// const Layout = () => {
//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-6">
//             <div className="m-5">
//               <Link to="/login">
//                 <Button variant="success">Login</Button>
//               </Link>

//             </div>

//           </div>
//           <div className="col-6">
//             <div className="m-5">
//               <Link to="/register">
//                 <Button variant="info">Register</Button>
//               </Link>

//             </div>
//           </div>
//         </div>
//       </div>

//       <main>
//         <Outlet />
//       </main>
//     </>
//   )

// }

// export default Layout