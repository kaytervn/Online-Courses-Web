// import React from "react";
// import { Navbar, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { SubMenu } from "react-pro-sidebar";

import { BarChart } from "../../images/icons/BarChart";
import { Calendar } from "../../images/icons/Calendar";
import { ShoppingCart } from "../../images/icons/ShoppingCart";
import { Service } from "../../images/icons/Service";
import { menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <div>
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
              <SubMenu defaultOpen label="User Manager" icon={<BarChart />}>
                <MenuItem component={<Link to="/" />}>Student Manager</MenuItem>
                <MenuItem component={<Link to="/instructor" />}>
                  {" "}
                  Instructor Manager
                </MenuItem>
              </SubMenu>
              <MenuItem
                component={<Link to="/course" />}
                icon={<Calendar />}
              >
                Course Manager
              </MenuItem>

              <MenuItem icon={<Service />}> Examples</MenuItem>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
