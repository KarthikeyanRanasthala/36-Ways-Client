import React from "react";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
// import Test from "./Test";

const App = props => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      {props.auth.isAuthenticated ? (
        <Redirect to={{ pathname: "/dashboard" }} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
      {/* <Test /> */}
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(App);
