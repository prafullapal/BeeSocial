import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { removeUser } from "../../../actions/userActions.js";

function DeleteUser(props) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    props.removeUser({
      userId: props.user.userId,
    });
    navigate("/");
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.user.isLoading,
    error: state.user.error,
    msg: state.user.msg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser()),
    removeUser: (params) => dispatch(removeUser(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
