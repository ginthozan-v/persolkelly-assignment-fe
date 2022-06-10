import React from "react";
import { NavLink } from "react-router-dom";

import s from "./styles.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      <h5 className={s.siteTitle}>
        <NavLink to='/' className={({ isActive }) =>
          isActive ? s.active : ''
        }>CAFÉ
        </NavLink>
        -
        <NavLink to='/employee' className={({ isActive }) =>
          isActive ? s.active : ''
        }>EMPLOYEE
        </NavLink>
      </h5>
    </header>
  );
};

export default Header;
