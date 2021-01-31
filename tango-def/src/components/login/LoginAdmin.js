import React, { useState, useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import "../../styles/main.css";
import styled from "styled-components";

const LoginAdmin = () => {
  const [Login, setLogin] = useState({ email: "", password: "" });
  const { tryToLogin } = useContext(AdminContext);

  const styleForm = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <LoginContainer>
      <form
        style={styleForm}
        onSubmit={(e) => {
          e.preventDefault();
          tryToLogin(Login);
          setLogin({ email: "", password: "" });
        }}
      >
        <label>user ID</label>
        <input
          type="text"
          required
          value={Login.email}
          onChange={(e) => setLogin({ ...Login, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="text"
          required
          value={Login.password}
          onChange={(e) => setLogin({ ...Login, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </LoginContainer>
  );
};

export default LoginAdmin;

const LoginContainer = styled.div`
  padding-top: 20vh;
`
