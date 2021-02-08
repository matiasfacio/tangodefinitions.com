import React, { useRef, useState, useContext } from "react";
import "../../../styles/main.css";
import styled from "styled-components";
import { AdminContext } from "../../../contexts/AdminContext";

const AddDef = () => {
  const { addDefinitionDB } = useContext(AdminContext);
  const [newdef, setNewDef] = useState({
    title: "",
    snippet: "",
    definition: "",
    video_link: "",
    language: ""
  });
  const firstInputRef = useRef();

  return (
    <div className="SectionContainer">
      <div className = "title">
        <h3>Add Definition</h3>
      </div>
      <AddDefinitionContainer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addDefinitionDB(newdef)
            setNewDef({
              title: "",
              snippet: "",
              definition: "",
              video_link: "",
              language: ""
            });
            firstInputRef.current.focus();
          }}
        >
          <div className="form_left">
            <label>Definition Title</label>
            <input
              ref={firstInputRef}
              type="text"
              value={newdef.title}
              onChange={(e) => setNewDef({ ...newdef, title: e.target.value })}
            />
            <label>Snippet</label>
            <input
              id="snippet"
              type="text"
              value={newdef.snippet}
              onChange={(e) =>
                setNewDef({ ...newdef, snippet: e.target.value })
              }
            />
            <label>Language</label>
            <input 
              id = "language"
              type="text"
              value = {newdef.language}
              onChange = {(e => {
                setNewDef({...newdef, language: e.target.value})
              })}
              />
            <label>Video Link</label>
            <input
              id="video"
              type="text"
              value={newdef.video_link}
              placeholder="https://www.youtube.com/xxxxxxx"
              onChange={(e) =>
                setNewDef({ ...newdef, video_link: e.target.value })
              }
            />
            <button type="submit">Submit</button>
          </div>
          <div className="form_right">
            <label>Definition</label>
            <textarea
              type="text"
              value={newdef.definition}
              onChange={(e) =>
                setNewDef({ ...newdef, definition: e.target.value })
              }
            />
          </div>
        </form>
      </AddDefinitionContainer>
    </div>
  );
};

export default AddDef;

const AddDefinitionContainer = styled.div`
  margin: 0 auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    max-width: 800px;
    display: flex;
    flex-direction: row;
    label {
      font-size: 0.8rem;
    }
    input {
      min-width: 300px;
    }
  }
`;
