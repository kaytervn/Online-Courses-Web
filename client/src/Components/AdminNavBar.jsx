// import React from "react";
// import { Navbar, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";
import { Service } from "../../images/icons/Service";
import { menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { BarChart } from "../../images/icons/BarChart";
import styled from "styled-components";
const AdminNavBar = () => {
  const SidebarContainer = styled.div`
    height: 100vh;
  `;
  return (
    <SidebarContainer>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <Sidebar backgroundColor="#212529">
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
                <MenuItem icon={<PiStudent />} component={<Link to="/" />}>
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
            </Menu>
          </Sidebar>
        </div>
      </div>
    </SidebarContainer>
  );
};

export default AdminNavBar;
