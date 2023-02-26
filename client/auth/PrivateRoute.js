import React, { Component } from "react";
import { Route, redirect } from "react-router-dom";
import auth from "./auth-helper";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        redirect({
          pathname: "/signin",
          state: { from: props.location },
        })
      )
    }
  />
);
export default PrivateRoute;
