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
  const theme = {
    dark: {
      sidebar: {
        backgroundColor: "#0b2948",
        color: "#8ba1b7",
      },
      menu: {
        menuContent: "#082440",
        icon: "#ffffff",
        hover: {
          backgroundColor: "#00458b",
          color: "#b6c8d9",
        },
        disabled: {
          color: "#3e5e7e",
        },
      },
    },
  };
  //   // hex to rgba converter
  //   const hexToRgba = (hex, alpha) => {
  //     const r = parseInt(hex.slice(1, 3), 16);
  //     const g = parseInt(hex.slice(3, 5), 16);
  //     const b = parseInt(hex.slice(5, 7), 16);

  //     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  //   };
  //   const menuItemStyles = {
  //     root: {
  //       fontSize: "13px",
  //       fontWeight: 400,
  //     },
  //     icon: {
  //       color: "#ffffff",
  //       [`&.${menuClasses.disabled}`]: {
  //         color: "#3e5e7e",
  //       },
  //     },
  //     SubMenuExpandIcon: {
  //       color: "#b6b7b9",
  //     },
  //     subMenuContent: ({ level }) => ({
  //       backgroundColor:
  //         level === 0
  //           ? hexToRgba(
  //               theme.menu.menuContent
  //               //  hasImage && !collapsed ? 0.4 : 1
  //             )
  //           : "transparent",
  //     }),
  //     button: {
  //       [`&.${menuClasses.disabled}`]: {
  //         color: "#3e5e7e",
  //       },
  //       "&:hover": {
  //         backgroundColor: hexToRgba(
  //           "#00458b"
  //           //   hasImage ? 0.8 : 1
  //         ),
  //         color: "#b6c8d9",
  //       },
  //     },
  //     label: ({ open }) => ({
  //       fontWeight: open ? 600 : undefined,
  //     }),
  //   };

  return (
    <div>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <Sidebar backgroundColor="#212529" width="300px">
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
              <MenuItem suffix="🔥" active icon={<Calendar />}>
                Calendar (active)
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
