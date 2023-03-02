import React, { useState, useEffect, useCallback } from "react";
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
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

import DeleteUser from "./DeleteUser";

import { Link, useNavigate, useParams } from "react-router-dom";
import { read } from "./api-user";

import "./../assets/css/Profile.css";
import FollowProfileButton from "./FollowProfileButton";
import FollowGrid from "./FollowGrid";
import FindPeople from "./FindPeople";

export default function Profile(props) {
  let { userId } = useParams();
  let navigate = useNavigate();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });

  const photoUrl = values.user._id
    ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : null;

  if (values.redirectToSignin) {
    return navigate("/signin");
  }
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      read(
        {
          userId: userId,
        },
        signal
      ).then((data) => {
        if (data && data.error) {
          setValues({ ...values, redirectToSignin: true });
        } else {
          let following = checkFollow(data.user);
          setValues({ ...values, user: data.user, following: following });
        }
      });
    } catch (err) {
      setValues({ ...values, redirectToSignin: true });
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == props.user.userId;
    });
    return match;
  };

  const clickFollowButton = (handler) => {
    handler(
      {
        userId: props.user.userId,
      },
      values.user._id
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };

  return (
    <>
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
                  <PersonIcon />
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={values.user.name}
              secondary={values.user.email}
            />
            <ListItemSecondaryAction>
              {props.isAuth && props.user.userId == values.user._id ? (
                <ListItemSecondaryAction>
                  <Link to={"/user/edit/" + values.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <DeleteUser {...props} />
                </ListItemSecondaryAction>
              ) : (
                <FollowProfileButton
                  following={values.following}
                  onButtonClick={clickFollowButton}
                />
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={values.user.about} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                "Verified: " + new Date(values.user.verified).toDateString()
              }
            />
          </ListItem>
          <Divider />
        </List>
      </Paper>

      <FollowGrid people={values.user.followers} />
      <FollowGrid people={values.user.following} />
      <FindPeople />
    </>
  );
}
