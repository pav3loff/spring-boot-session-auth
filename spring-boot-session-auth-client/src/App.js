import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";

import "./App.css";
import { useState } from "react";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} isLoggedIn={isLoggedIn} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
                isLoggedIn={isLoggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
          />
          <Route exact path="/registration" component={Registration} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
