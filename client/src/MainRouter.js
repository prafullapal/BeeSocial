import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/core/Home";
import Menu from "./components/core/Menu";
import VerifyEmail from "./components/auth/VerifyEmail";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import Settings from "./components/user/Settings";

const MainRouter = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  function PrivateRoute({ children }) {
    return props.isAuthenticated && props.user ? children : null;
  }

  return (
    <>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <Home isOpen={isOpen} setIsOpen={(bool) => setIsOpen(bool)} />
          }
        />
        {/* <Route path="/users" element={<Users />} /> */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/user/:userId"
          element={
            <Profile isOpen={isOpen} setIsOpen={(bool) => setIsOpen(bool)} />
          }
        />
        <Route
          path="/user/settings/:userId"
          element={
            <PrivateRoute>
              <Settings isOpen={isOpen} setIsOpen={(bool) => setIsOpen(bool)} />
            </PrivateRoute>
          }
        />
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
