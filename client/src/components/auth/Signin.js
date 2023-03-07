import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {connect } from "react-redux";
import { loginRequest, loginUser } from "../../../actions/authActions.js"; 

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
  let navigate = useNavigate();
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
    console.log(props.user);
    navigate("/");
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
            {values.error}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        {!props.isLoading ? <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>: "Loading..."}
      </CardActions>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
    loginRequest: () => dispatch(loginRequest()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);