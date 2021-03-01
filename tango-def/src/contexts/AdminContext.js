import React, { createContext, useReducer, useEffect, useState } from "react";

export const AdminContext = createContext();

const definitionReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    default:
      return state;
  }
};

const initialState = [];

const AdminContextProvider = (props) => {
  const [definitions, dispatch] = useReducer(definitionReducer, initialState);
  const [isLoggedin, setAdminLogin] = useState(false);

  useEffect(() => {
    fetch("/search/searchall")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "INIT", payload: data }))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, [definitions]);


  const loadFromSever = async () => {
    try {
      const result = await fetch("search/searchall");

      if (!result.ok) {
        throw new Error("error fetching data");
      }
      const data = await result.json();
      dispatch({ type: "INIT", payload: data });
    } catch (error) {
      alert(error);
    }
  };


  const addDefinitionDB = async (newDefinition) => {
    try {
      const parseDef = JSON.stringify(newDefinition);
      const result = await fetch("/adminarea/add-definition", {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: parseDef,
      });
      if (result.status !== 200) {
        throw new Error("sorry, error fetching data");
      }
      loadFromSever();
    } catch (error) {
      alert(error);
    }
  };

  const delDefinitionDB = async (id) => {
    try {
      const result = await fetch(`/adminarea/delete/${id}`, {
        method: "DELETE",
      });
      console.log(result.status);
      if (result.status !== 200) {
        throw new Error(result.status);
      } else {
        loadFromSever();
      }
    } catch (err) {
      alert(err);
    }
  };

  const editDefinitionDB = async (modifiedDefinition) => {
    const modifiedDefinitionJson = JSON.stringify(modifiedDefinition)
    try {
      const result = await fetch('/adminarea/edit', {
        method: 'PUT',
        headers: { 
          'Content-type': 'application/json'
        },
        body: modifiedDefinitionJson
      })
      if (result.status !== 200) {
        throw new Error(result.status)
      } else {
        loadFromSever();
      }
    } catch (err) {
        alert(err)  
    }
  }


  const tryToLogin = async (accessData) => {
    try {
      const parsedAccessData = JSON.stringify(accessData);
      const result = await fetch("/adminarea/login", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: parsedAccessData,
      });
      if (result.status === 200) {
        setAdminLogin(true);
      } else {
        setAdminLogin(false);
        throw new Error("check your credentials");
      }
    } catch (error) {
      alert(error);
    }
  };

  const adminLogout = () => {
    setAdminLogin(false);
    return;
  };

  return (
    <AdminContext.Provider
      value={{
        definitions,
        addDefinitionDB,
        delDefinitionDB,
        editDefinitionDB,
        tryToLogin,
        isLoggedin,
        adminLogout,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
