import React, { useContext, memo } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import '../../../styles/main.css'

const Definitions = memo(() => {
  const { definitions, delDefinitionDB } = useContext(AdminContext);

  return (
    <div>
      <h2>All the definitions stored</h2>
      {definitions.length &&
        definitions.map(def => {
          return (
            <div key={def._id} className = "display_all_defintions">
              <div>{def._id}</div>
              <div>{def.title}</div>
              <div>{def.snippet}</div>
              <div className = "one_definition">{def.definition}</div>
              <div>{def.vide_link}</div>
              <button onClick = { ()=> delDefinitionDB(def._id)}>Del</button>
            </div>
          );
        })}
    </div>
  );
});

export default Definitions;
