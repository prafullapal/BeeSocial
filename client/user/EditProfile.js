import React, { useState, useEffect } from "react";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./../assets/css/EditProfile.css";

import { read, update } from "./api-user.js";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "@mui/icons-material";

export default function EditProfile() {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    about: "",
    password: "",
    email: "",
    photo: null,
    userId: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });

  const photoUrl = values.userId
    ? `/api/users/photo/${values.userId}?${new Date().getTime()}`
    : null;

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
          about: data.user.about,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const clickSubmit = () => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);

    update(
      {
        userId: values.userId,
      },
      userData
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          userId: data._id,
          about: data.about,
          photo: data.photo,
          redirectToProfile: true,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
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
        {photoUrl ? (
          <Avatar src={photoUrl} />
        ) : (
          <Avatar>
            <PersonIcon />
          </Avatar>
        )}
        <label htmlFor="icon-button-file">
          <Button variant="contained" component="span">
            Upload
            <FileUpload />
          </Button>
        </label>
        <br />
        <input
          accept="image/"
          type="file"
          onChange={handleChange("photo")}
          style={{ display: "none" }}
          id="icon-button-file"
        />
        <span className="filename">
          {values.photo ? values.photo.name : ""}
        </span>
        <br />
        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          className="textField"
        />
        <br />
        <TextField
          id="about"
          label="About"
          value={values.about}
          multiline
          rows="2"
          onChange={handleChange("about")}
          margin="normal"
          className="textField"
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
