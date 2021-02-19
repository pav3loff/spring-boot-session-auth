import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { logout } from "../api/apiCalls";

import "./Navbar.css";
import "./NavbarButton.css";

function Navbar(props) {
  const [lastClicked, setLastClicked] = useState("");

  function handleLogout() {
    logout().then(() => props.setLoggedIn(false));
    localStorage.removeItem("loggedUserName");
    setLastClicked("login");
  }

  return (
    <div className="navbar-main-container">
      <div className="navbar-leftside-buttons-container">
        <button
          className="navbar-button"
          onClick={() => setLastClicked("home")}
        >
          HOME
        </button>
      </div>
      <div className="navbar-rightside-buttons-container">
        {props.isLoggedIn ? (
          <button className="navbar-button" onClick={handleLogout}>
            LOGOUT
          </button>
        ) : (
          <>
            <button
              className="navbar-button"
              onClick={() => setLastClicked("login")}
            >
              LOGIN
            </button>
            <button
              className="navbar-button"
              onClick={() => setLastClicked("registration")}
            >
              REGISTER
            </button>
          </>
        )}
      </div>
      {(lastClicked === "home" || lastClicked === "logout") && (
        <Redirect to="/" />
      )}
      {lastClicked === "login" && <Redirect to="/login" />}
      {lastClicked === "registration" && <Redirect to="/registration" />}
    </div>
  );
}

export default Navbar;
