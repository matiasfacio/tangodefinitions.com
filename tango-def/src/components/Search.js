import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import "../styles/main.css";
import useSearch from "../helpers/useSearch";

const Search = () => {
  const [entrySearch, setEntrySearch] = useState("");
  const inputRef = useRef();
  const [searchResult, startSearch] = useSearch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <section>
      <SearchContainer>
        <h1>
          Tango Definitions
          <span style={{ borderBottom: "5px chocolate solid" }}>.com</span>
        </h1>
        <h3>by Matias Facio</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            startSearch(entrySearch);
          }}
        >
          <label>Search</label>
          <input
            ref={inputRef}
            type="text"
            value={entrySearch}
            placeholder="..search (example: ochos)"
            onChange={(e) => {
              setEntrySearch(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </SearchContainer>

      {searchResult.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>result</th>
              <th>title</th>
              <th>snippet</th>
              <th>definition</th>
            </tr>
          </thead>

          <tbody>
            {searchResult.map((element, idx) => {
              return (
                <tr key={idx} className = "ResultsContainerTR">
                  <td>{idx + 1}</td>
                  <td>{element.title}</td>
                  <td>{element.snippet}</td>
                  <td className="ResultsContainerTD">{element.definition}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ): <div style = {{textAlign:"center"}}>no entry</div>}
    </section>
  );
};

export default Search;

const SearchContainer = styled.div`
  margin-top: 30vh;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  form {
    input {
      min-width: 50vw;
      max-width: 600px;
    }
  }
`;


