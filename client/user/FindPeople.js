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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findPeople, follow } from "./api-user";

export default function FindPeople() {
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeople(
      {
        userId: JSON.parse(localStorage.getItem("user")).userId,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
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
      if (data.error) {
        console.log(data.error);
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
      <Paper className="root" elevation={4}>
        <Typography type="title" className="title">
          Who to Follow
        </Typography>
        <List>
          {values.users.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar className="avatar">
                    <Avatar src={"/api/users/photo/" + item._id} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction className="follow">
                    <Link to={"/user/" + item._id}>
                      <IconButton
                        variant="contained"
                        color="secondary"
                        className="viewButton"
                      >
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
        message={<span className="snack">{values.followMessage}</span>}
      />
    </>
  );
}
