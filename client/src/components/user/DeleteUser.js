import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { remove } from "./api-user.js";
import { logout } from "../auth/api-auth.js";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";

function DeleteUser(props) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirct] = useState(false);
  const [error, setError] = useState(null);

  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    remove({
      userId: props.user.userId,
    }).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        logout().then(() => console.log("Deleted Successfully!"));
        // props.onLogOut();
        setRedirct(true);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return navigate("/");
  }
  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
//propType to be updated because now we get user instead of userId and user has user.userId
DeleteUser.propTypes = {
  user: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(DeleteUser);