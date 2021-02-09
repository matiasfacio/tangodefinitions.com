import React, { useContext } from "react";
import styled from "styled-components";
import "./styles/main.css";
import Search from "./components/Search";
import Adminarea from './components/admin'
import NavBar from "./components/nav";
import { Route, Switch } from "react-router-dom";
import LoginAdmin from "./components/login/LoginAdmin";
import { AdminContext } from "./contexts/AdminContext";

function App() {
  const { isLoggedin } = useContext(AdminContext);
  return (
    <Main>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/admin" component={!isLoggedin ?  LoginAdmin : Adminarea} />
        
      </Switch>
    </Main>
  );
}

export default App;

const Main = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
