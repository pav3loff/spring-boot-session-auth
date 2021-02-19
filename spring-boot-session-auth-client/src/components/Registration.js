import { useState } from "react";
import { Redirect } from "react-router-dom";

import { register } from "../api/apiCalls";

import "./Registration.css";

function Registration() {
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  function handleChange(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    register(formData).then((success) => {
      if (success) {
        setRegistrationSuccessful(true);
      }
    });
  }

  return isRegistrationSuccessful ? (
    <Redirect to="/login" />
  ) : (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="registration-form-main-container"
    >
      <input
        className="registration-form-input"
        type="text"
        placeholder="Username"
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        className="registration-form-input"
        type="password"
        placeholder="Password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        className="registration-form-input"
        type="text"
        placeholder="First name"
        id="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        className="registration-form-input"
        type="text"
        placeholder="Last name"
        id="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <button className="registration-form-button" type="submit">
        Register
      </button>
    </form>
  );
}

export default Registration;
