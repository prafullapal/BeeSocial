import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import { signupUser } from "../../../actions/signupAction.js";

// import "./../assets/css/Signup.css";

function Signup(props) {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      name: values.name || undefined,
      password: values.password || undefined,
    };
    props.signupUser(user);
    props.msg ? setValues({...values, open:true}): null;
    console.log("SignUp message:: ",props.msg);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h6">Sign Up</Typography>
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
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
          {props.error && (
            <Typography component="p" color="error">
              <Icon color="error">error</Icon>
              {props.error}
            </Typography>
          )}
          {props.msg && (
            <Typography component="p" color="error">
              <Icon color="error">error</Icon>
              {props.msg}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={props.msg ? true : false} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    msg: state.signup.msg,
    isLoading: state.signup.isLoading,
    error: state.signup.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (user)=> dispatch(signupUser(user)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);