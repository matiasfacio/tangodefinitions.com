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
  const [ isLoggedin, setAdminLogin] = useState(false)

  useEffect(() => {
   
    fetch("/searchall")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "INIT", payload: data }))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, [definitions]);

  const loadFromSever = () => {
    fetch("/searchall")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "INIT", payload: data }))
      .catch((err) => console.log(err));
  
  };

  const addDefinitionDB = (newDefinition) => {
    const parseDef = JSON.stringify(newDefinition);
    fetch("/adminarea/add-definition", {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: parseDef,
    })
      .then(() => loadFromSever())
      .catch((err) => console.log(err));
  };

  const tryToLogin = (accessData) => {
    const parsedAccessData = JSON.stringify(accessData)
    fetch('/adminarea/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: parsedAccessData
    })
    .then(response => setAdminLogin(response.status === 200 ? true : false))
    .catch(err => console.log(err))
  }

  const adminLogout = () => {
    setAdminLogin(false)
    return;
  }


  return (
    <AdminContext.Provider value={{ definitions, addDefinitionDB, tryToLogin, isLoggedin, adminLogout }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
