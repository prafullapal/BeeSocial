import React, { useState } from "react";

import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions.js";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";

// import "./../assets/css/Signin.css";

function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    props.loginUser(user);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Sign In</Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />
        {props.error ? (
          <Typography component="p" color="error">
            <Icon color="error">
              <ErrorIcon />
            </Icon>
            {props.error.message}
          </Typography>
        ) : null}
      </CardContent>
      {props.isAuthenticated ? <Navigate to="/" replace={true} /> : null}
      <CardActions>
        {!props.isLoading ? (
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        ) : (
          "Loading..."
        )}
      </CardActions>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);