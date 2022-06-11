import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import s from "./styles.module.css";

const Header = () => {
  const location = useLocation();
  console.log(location);

  return (
    <header className={s.header}>
      <h5 className={s.siteTitle}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ||
            location.pathname.includes("/add-cafe") ||
            location.pathname.includes("/edit-cafe")
              ? s.active
              : ""
          }
        >
          CAFÉ
        </NavLink>
        -
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            isActive ||
            location.pathname.includes("/add-employee") ||
            location.pathname.includes("/edit-employee")
              ? s.active
              : ""
          }
        >
          EMPLOYEE
        </NavLink>
      </h5>
    </header>
  );
};

export default Header;
