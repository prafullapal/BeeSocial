import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import SignUp from "./user/Signup";
import Users from "./user/Users";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/:userId" element={<Profile />} />
        {/* <PrivateRoute path="/user/edit/:userId" component={EditProfile} /> */}
      </Routes>
    </>
  );
};

export default MainRouter;
