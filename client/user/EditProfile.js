import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
} from "@mui/material";

import "./../assets/css/EditProfile.css";

import { read, update } from "./api-user.js";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    userId: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: JSON.parse(localStorage.getItem("user")).userId,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.user.name,
          email: data.user.email,
          userId: data.user._id,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    update(
      {
        userId: values.userId,
      },
      user
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.redirectToProfile) {
    return navigate(`/user/${values.userId}`);
  }

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="title">
          Edit Profile
        </Typography>
        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          className="textField"
          disabled
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          className="textField"
          disabled
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
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className="error">
              error
            </Icon>
            {values.error}
          </Typography>
        )}
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
