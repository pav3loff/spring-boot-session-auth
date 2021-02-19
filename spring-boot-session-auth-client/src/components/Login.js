import { useState } from "react";
import { Redirect } from "react-router-dom";

import { getUserData, login } from "../api/apiCalls";

import "./Login.css";

function Login(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    login(formData).then((success) => {
      if (success) {
        getUserData(formData.username).then((response) => {
          localStorage.setItem("loggedUserName", response.data.firstName);
          props.setLoggedIn(true);
        });
      }
    });
  }

  return props.isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <form
      className="login-form-main-container"
      onSubmit={(event) => handleSubmit(event)}
    >
      <input
        className="login-form-input"
        type="text"
        placeholder="Username"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        className="login-form-input"
        type="password"
        placeholder="Password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button className="login-form-button" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
