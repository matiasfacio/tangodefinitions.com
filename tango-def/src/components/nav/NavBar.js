import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../contexts/AdminContext";

const NavBar = () => {
  const { isLoggedin } = useContext(AdminContext);

  return (
    <nav>
      <ul>
        <Link to="/">home</Link>
        <Link to="/admin">{isLoggedin ? "admin" : "login"}</Link>
      </ul>
    </nav>
  );
};

export default NavBar;
