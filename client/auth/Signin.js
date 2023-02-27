import React, { useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";

import "./../assets/css/Signin.css";

import { login } from "./api-auth.js";
import { useNavigate } from "react-router-dom";

import ErrorIcon from "@mui/icons-material/Error";

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
        navigate("/user/" + data.user.userId);
      } else {
        setValues({ ...values, error: data.response.data.message });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="title">
          Sign In
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          className="textField"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          className="textField"
        />
        <br />{" "}
        {values.error ? (
          <Typography component="p" color="error">
            <Icon color="error" className="error">
              <ErrorIcon />
            </Icon>
            {values.error}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          className="submit"
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
