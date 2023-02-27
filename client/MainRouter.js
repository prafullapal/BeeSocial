import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./core/Home";
import Menu from "./core/Menu";

import SignUp from "./auth/Signup";
import Signin from "./auth/Signin";
import VerifyEmail from "./auth/VerifyEmail";

import Users from "./user/Users";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";

import { isAuthenticated } from "./auth/api-auth";

const MainRouter = () => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    handleLogIn();
  }, []);
  const handleLogIn = () => {
    isAuthenticated().then((data) => {
      if (data === false) setAuth(false);
      else {
        setAuth(true);
        setUser(data);
      }
    });
  };
  const handleLogOut = () => {
    setAuth(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  function PrivateRoute({ children }) {
    return isAuth && user ? children : <Navigate to="/login" />;
  }

  return (
    <>
      <Menu is_auth={isAuth} user={user} onLogOut={handleLogOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signin" element={<Signin onLogIn={handleLogIn} />} />
        <Route
          path="/user/:userId"
          element={
            <Profile user={user} isAuth={isAuth} onLogOut={handleLogOut} />
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

export default MainRouter;
