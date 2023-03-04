import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "./api-auth.js";

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

export default function Signin(props) {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: null,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    login(user).then((data) => {
      if (data.user) {
        setValues({ ...values, error: null });
        localStorage.setItem("user", JSON.stringify(data.user));
        props.onLogIn();
        navigate("/");
      } else {
        setValues({ ...values, error: data.response.data.message });
      }
    });
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
        <br />{" "}
        {values.error ? (
          <Typography component="p" color="error">
            <Icon color="error">
              <ErrorIcon />
            </Icon>
            {values.error}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
