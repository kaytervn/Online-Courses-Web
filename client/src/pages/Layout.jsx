import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import userImage from "../../images/user.png";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Role from "../../../server/models/RoleEnum.js";
import InstructorLayout from "../Components/InstructorLayout";
import AdminLayout from "../Components/AdminLayout.jsx";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import logo from "../../images/cookiedu_logo.png";

import AdminNavBar from "../Components/AdminNavBar.jsx";

import StudentLayout from "../Components/StudentLayout.jsx";

const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {}, 0);
  }, []);

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
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Container className="py-2">
          {user.role == Role.ADMIN ? (
            <Navbar.Brand href="/">
              <Image width="40" src={logo} />
              Users Management
            </Navbar.Brand>
            
          ) : user.role == Role.INSTRUCTOR ? (
            <Navbar.Brand href="/">
              <Image width="40" src={logo} />
              My Created Courses
            </Navbar.Brand>
          ) : (
            <Navbar.Brand href="/">
              <Image width="40" src={logo} />
              <span className="text-warning">COOKI</span>EDU
            </Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user.token ? (
                <>
                  {user.role == Role.ADMIN ? (
                    <AdminLayout />
                    
                  ) : user.role == Role.INSTRUCTOR ? (
                    <InstructorLayout />
                  ) : (
                    <StudentLayout />
                  )}
                  <div className="d-flex align-items-center">
                    <Image
                      src={
                        user.picture === null || user.picture === ""
                          ? userImage
                          : user.picture
                      }
                      width="30"
                      className="rounded-circle"
                    />
                  </div>
                  <NavDropdown title={user.name}>
                    <NavDropdown.Item href="/my-profile">
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link href="/list-courses">List Courses</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#action">Teach on COOKIEDU</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/login" className="text-warning me-2">
                      <i className="bi bi-door-open"></i> Sign in
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Button className="btn-primary" href="/register">
                      Register
                    </Button>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
