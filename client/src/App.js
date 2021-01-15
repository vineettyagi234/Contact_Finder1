import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Alerts from "./component/layout/Alerts";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import PrivateRoute from "./component/routing/PrivateRoute";

import "./App.css";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import ContectState from "./context/contact/ContactState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContectState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContectState>
    </AuthState>
  );
};

export default App;
