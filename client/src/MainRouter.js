import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/core/Home";
import Menu from "./components/core/Menu";

import SignUp from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import VerifyEmail from "./components/auth/VerifyEmail";

import Users from "./components/user/Users";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";

const MainRouter = (props) => {
  function PrivateRoute({ children }) {
    return props.isAuthenticated && props.user ? children : null;
  }

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/users" element={<Users />} /> */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(MainRouter);
