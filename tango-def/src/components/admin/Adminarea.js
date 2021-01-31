import React, { useContext } from "react";
import "../../styles/main.css";
import AddDef from "./AddDefinition";
import Definitions from "./Definitions";
import { AdminContext } from "../../contexts/AdminContext";

const Adminarea = () => {
  const { adminLogout } = useContext(AdminContext);
  return (
    <div className="SectionContainer">
      <div className="title">
        <h2>Admin area</h2>
      </div>

      <button className="btn-logout" onClick={() => adminLogout()}>
        Logout
      </button>
      <AddDef />
      <Definitions />
    </div>
  );
};

export default Adminarea;
