import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { updateUser, readUser } from "../../../actions/userActions.js";

// import "./../assets/css/EditProfile.css";
import { connect } from "react-redux";
function EditProfile(props) {
  const [values, setValues] = useState({
    name: "",
    about: "",
    password: "",
    email: "",
    photo: null,
  });

  const photoUrl = props.user.userId
    ? `/api/users/photo/${props.user.userId}?${new Date().getTime()}`
    : null;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    props.readUser({ userId: props.user.userId });
    setValues({
      ...values,
      name: props.profile.name,
      about: props.profile.about,
      email: props.profile.email,
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);

    props.updateUser(
      {
        userId: props.user.userId,
      },
      userData
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Edit Profile</Typography>
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
        {/* <span>{values.photo ? values.photo.name : ""}</span> */}
        <br />
        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
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
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
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
        />
        <br />
        {props.error && (
          <Typography component="p" color="error">
            <Icon color="error">e</Icon>
            {props.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
      {props.redirectToProfile || !props.profile ? (
        <Navigate to={`/user/${props.user.userId}`} replace={true} />
      ) : null}
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    redirectToProfile: state.user.redirectToProfile,
    profile: state.user.profile,
    error: state.user.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (params, data) => dispatch(updateUser(params, data)),
    readUser: (params) => dispatch(readUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
