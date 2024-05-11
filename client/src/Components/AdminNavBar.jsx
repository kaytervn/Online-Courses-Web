// import React from "react";
// import { Navbar, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { Service } from "../../images/icons/Service";
import { menuClasses } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { BarChart } from "../../images/icons/BarChart";
import styled from "styled-components";
import { IoLogOut } from "react-icons/io5";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Image, Navbar } from "react-bootstrap";
import logo from "../../images/cookiedu_logo.png";
const AdminNavBar = () => {
  const { setUser } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const navigate = useNavigate();
  const SidebarContainer = styled.div`
    height: 100vh;
    width: 100%;
  `;
  const handleLogout = () => {
    if (confirm("Confirm logout?")) {
      setUser({ email: null, name: null, picture: null, role: null });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/");
    }
  };
  return (
    <SidebarContainer>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <Sidebar backgroundColor="#212529">
            <Navbar.Brand
              href="/"
              className="d-flex justify-content-center align-items-center mb-7s mb-3"
            >
              <Image width={"40px"} height={"40px"} src={logo} />
              <span
                className="text-warning text-center text-lg-start"
                style={{ fontSize: "30px" }}
              >
                COOKI
              </span>
              <span
                className="text-light text-center text-lg-start"
                style={{ fontSize: "30px" }}
              >
                {" "}
                EDU{" "}
              </span>
            </Navbar.Brand>
            <Menu
              closeOnClick
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0)
                    return {
                      color: disabled ? "#000000" : "#ffffff",
                      backgroundColor: active ? "#000000" : undefined,
                      "&:hover": {
                        backgroundColor: "#b2b5b8",
                        color: "#000000",
                      },
                    };
                  if (level === 1)
                    return {
                      color: disabled ? "#000000" : "#ffffff",
                      backgroundColor: "#000000",
                      "&:hover": {
                        backgroundColor: "#b2b5b8",
                        color: "#000000",
                      },
                    };
                },
              }}
              rootStyles={{
                [`.${menuClasses.icon}`]: {
                  color: "#ffffff",
                },
              }}
            >
              <SubMenu
                defaultOpen
                label="User Manager"
                icon={<FaUsersBetweenLines />}
              >
                <MenuItem icon={<PiStudentBold />} component={<Link to="/" />}>
                  Student Manager
                </MenuItem>
                <MenuItem
                  icon={<GiTeacher />}
                  component={<Link to="/instructor" />}
                >
                  {" "}
                  Instructor Manager
                </MenuItem>
              </SubMenu>
              <MenuItem component={<Link to="/course" />} icon={<FaBook />}>
                Course Manager
              </MenuItem>

              <MenuItem icon={<BarChart />}> Revenue statistics</MenuItem>

              <MenuItem icon={<IoLogOut />} onClick={handleLogout}>
                {" "}
                Logout{" "}
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default AdminNavBar;