import React, { useContext, useState } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import styled from "styled-components";

const Editdefinition = (props) => {
  const { definitions, editDefinitionDB } = useContext(AdminContext);

  const DefinitionToModify = definitions.filter(
    (item) => item._id === props.id
  )[0];

  const [editedDef, setEditedDef] = useState({
    _id: DefinitionToModify._id,
    title: DefinitionToModify.title,
    snippet: DefinitionToModify.snippet,
    definition: DefinitionToModify.definition,
    video_link: DefinitionToModify.video_link,
    language: DefinitionToModify.language,
  });

  return (
    <div>
      <div>
        <h2>Edit Definition:</h2>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          editDefinitionDB(editedDef)
        }}
      >
        <label>Title:</label>
        <input
          type="text"
          value={editedDef.title}
          onChange={(e) =>
            setEditedDef({ ...editedDef, title: e.target.value })
          }
        />
        <label>Snippet:</label>
        <input
          type="text"
          value={editedDef.snippet}
          onChange={(e) =>
            setEditedDef({ ...editedDef, snippet: e.target.value })
          }
        />
        <label>Video Link:</label>
        <input
          type="text"
          value={editedDef.video_link}
          onChange={(e) =>
            setEditedDef({ ...editedDef, video_link: e.target.value })
          }
        />
        <label>language:</label>
        <input
          type="text"
          value={editedDef.language}
          onChange={(e) =>
            setEditedDef({ ...editedDef, language: e.target.value })
          }
        />
        <label>Definition:</label>
        <textarea
          type="text"
          value={editedDef.definition}
          onChange={(e) =>
            setEditedDef({ ...editedDef, definition: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default Editdefinition;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    font-size: 1rem;
  }
  button {
    max-width: 200px;
  }
`;
