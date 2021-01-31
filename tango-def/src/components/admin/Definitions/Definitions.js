import React, { useContext, memo } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import '../../../styles/main.css'

const Definitions = memo(() => {
  const { definitions } = useContext(AdminContext);

  return (
    <div>
      <h2>All the definitions stored</h2>
      {definitions.length &&
        definitions.map((def, idx) => {
          return (
            <div key={def._id} className = "display_all_defintions">
              <div>{def._id}</div>
              <div>{def.title}</div>
              <div>{def.snippet}</div>
              <div>{def.definition}</div>
              <div>{def.vide_link}</div>
            </div>
          );
        })}
    </div>
  );
});

export default Definitions;
