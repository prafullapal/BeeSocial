import React, { useState, useEffect } from "react";
import {
  Avatar,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";

import DeleteUser from "./DeleteUser";

import { Link, useNavigate } from "react-router-dom";
import { read } from "./api-user";

import "./../assets/css/Profile.css";

export default function Profile(props) {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const photoUrl = user._id
    ? `/api/users/photo/${user._id}?${new Date().getTime()}`
    : null;

  if (redirectToSignin) {
    return navigate("/signin");
  }
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      read(
        {
          userId: JSON.parse(localStorage.getItem("user")).userId,
        },
        signal
      ).then((data) => {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data.user);
        }
      });
    } catch (err) {
      setRedirectToSignin(true);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <Paper className="root" elevation={4}>
      <Typography variant="h6" className="title">
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            {photoUrl ? (
              <Avatar src={photoUrl} />
            ) : (
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          <ListItemSecondaryAction>
            {props.isAuth && props.user.userId == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <DeleteUser {...props} />
              </ListItemSecondaryAction>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={user.about} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Verified: " + new Date(user.verified).toDateString()}
          />
        </ListItem>
        <Divider />
      </List>
    </Paper>
  );
}
