import React, { useContext, memo, useState } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import "../../../styles/main.css";
import Editdefinition from "../EditDefinition/Editdefinition";
import styled from "styled-components";

const Definitions = memo(() => {
  const { definitions, delDefinitionDB } = useContext(AdminContext);
  const [editDefinition, setEditDefinition] = useState({
    edit: false,
    id: null,
  });

  return (
    <div>
      <h2>All the definitions stored</h2>
      {definitions.length &&
        definitions.map((def) => {
          return (
            <OneDefinition key={def._id}>
              <div>
              <div>TITLE: {def.title}</div>
              <div>SNIPPET: {def.snippet}</div>
              <div className="one_definition">DEFINITION: {def.definition}</div>
              <div>LANGUAGE: {def.language}</div>
              <div>VIDEO_LINK: {def.video_link}</div>
              </div>
              <Botonera>
                <button onClick={() => delDefinitionDB(def._id)}>Del</button>
                <button
                  onClick={() => setEditDefinition({ edit: true, id: def._id })}
                >
                  Edit
                </button>

                {editDefinition.edit && editDefinition.id === def._id && (
                  <Editdefinition id={def._id} />
                )}
                {editDefinition.edit && editDefinition.id === def._id && (
                  <button
                    onClick={() => setEditDefinition({ edit: false, id: null })}
                  >
                    Finish Editing
                  </button>
                )}
              </Botonera>
            </OneDefinition>
          );
        })}
    </div>
  );
});

export default Definitions;

const Botonera = styled.div`
  display: flex;
  flex-direction: column;
  button {
    width: 100px;
    font-size: 1rem;
  }
`;

const OneDefinition =  styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  min-height: 200px;
  padding: 20px;
  border-bottom: 1px white solid;
`