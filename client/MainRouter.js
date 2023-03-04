import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { logout, isAuthenticated } from "./auth/api-auth";

import Home from "./core/Home";
import Menu from "./core/Menu";

import SignUp from "./auth/Signup";
import Signin from "./auth/Signin";
import VerifyEmail from "./auth/VerifyEmail";

import Users from "./user/Users";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";

const MainRouter = () => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    handleLogIn();
  }, []);
  const handleLogIn = () => {
    isAuthenticated().then((data) => {
      if (data.isLoggedIn === false) setAuth(false);
      else {
        setAuth(true);
        setUser(data.user);
      }
    });
  };
  const handleLogOut = () => {
    setAuth(false);
    setUser(null);
    logout();
    localStorage.removeItem("user");
  };

  function PrivateRoute({ children }) {
    return isAuth && user ? children : null;
  }

  return (
    <>
      <Menu isAuth={isAuth} user={user} onLogOut={handleLogOut} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signin" element={<Signin onLogIn={handleLogIn} />} />
        <Route
          path="/user/:userId"
          element={<Profile user={user} isAuth={isAuth} />}
        />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile user={user} isAuth={isAuth} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default MainRouter;
