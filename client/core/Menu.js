import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";

import auth from "./../auth/auth-helper";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
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
          <Button>Users</Button>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button>Sign In</Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button>My Profile</Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                auth.clearJWT(() => navigate("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
