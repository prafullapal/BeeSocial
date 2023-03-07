import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { read } from "./api-user";
import { listByUser } from "../post/api-post";

import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTab from "./ProfileTab";

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
  Grid,
  Divider,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

// import "./../assets/css/Profile.css";
import { connect } from "react-redux";
function Profile(props) {
  let { userId } = useParams();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
    error: null,
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
          setValues({ ...values, error: data.error, redirectToSignin: true });
        } else {
          setValues({ ...values, user: data.user, following: data.following });
          if (userId === data.user._id) loadPosts();
        }
      });
    } catch (err) {
      setValues({ ...values, redirectToSignin: true });
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  const clickFollowButton = (handler) => {
    handler(values.user._id).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };

  const loadPosts = () => {
    listByUser({ userId: userId }).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setPosts(data);
      }
    });
  };

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          margin: "auto",
          padding: "10px",
          marginTop: "20px",
          maxWidth: "70%",
        }}
      >
        <Typography variant="h6">Profile</Typography>
        <Divider />
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
              {props.isAuthenticated && props.user.userId == values.user._id ? (
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
        <ProfileTab {...props} profile={values.user} posts={posts} />
      </Paper>
    </>
  );
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Profile);