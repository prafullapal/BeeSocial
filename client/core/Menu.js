import React, { useState, useEffect } from "react";

import HomeIcon from "@mui/icons-material/Home";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";

import { logout } from "./../auth/api-auth";
import { Link, useNavigate } from "react-router-dom";

function Menu(props) {
  let navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button color="inherit">Users</Button>
        </Link>
        {!props.is_auth && (
          <span>
            <Link to="/signup">
              <Button color="inherit">Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button color="inherit">Sign In</Button>
            </Link>
          </span>
        )}
        {props.is_auth && props.user && (
          <span>
            <Link to={`/user/${props.user.userId}`}>
              <Button color="inherit">My Profile</Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                logout();
                props.onLogOut();
                navigate("/");
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
