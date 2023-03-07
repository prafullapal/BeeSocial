import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findPeople, follow } from "./api-user";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  IconButton,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { connect } from "react-redux";

function FindPeople(props) {
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeople(
      {
        userId: props.user.userId,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, users: data });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const clickFollow = (user, index) => {
    follow(user._id).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        let toFollow = values.users;
        toFollow.splice(index, 1);
        setValues({
          ...values,
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}!`,
        });
      }
    });
  };

  const handleRequestClose = () => {
    setValues({ ...values, open: false, followMessage: "" });
  };

  return (
    <>
      <Paper elevation={4} sx={{ padding: "10px" }}>
        <Typography type="title" variant="h6">
          Who to Follow
        </Typography>
        <Divider />
        <List>
          {values.users.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={"/api/users/photo/" + item._id} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <Link to={"/user/" + item._id}>
                      <IconButton variant="contained" color="secondary">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        clickFollow(item, i);
                      }}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span>{values.followMessage}</span>}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(FindPeople);