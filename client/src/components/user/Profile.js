import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { listByUser } from "../post/api-post";

import DeleteUser from "./DeleteUser";
import ProfileTab from "./ProfileTab";
import {
  Avatar,
  Paper,
  Button,
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

// import "./../assets/css/Profile.css";
import { connect } from "react-redux";
import { readUser, follow, unfollow } from "../../../actions/userActions";

function Profile(props) {
  let { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState({
    error: null,
  });

  const photoUrl = userId
    ? `/api/users/photo/${userId}?${new Date().getTime()}`
    : null;

  useEffect(() => {
    props.readUser({ userId: userId });
    loadPosts();
  }, [userId]);

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
      {props.isLoading ? (
        "Loading..."
      ) : props.isAuthenticated && props.profile ? (
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
                primary={props.profile.name}
                secondary={props.profile.email}
              />
              <ListItemSecondaryAction>
                {props.isAuthenticated &&
                props.user.userId == props.profile._id ? (
                  <ListItemSecondaryAction>
                    <Link to={"/user/edit/" + props.profile._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <DeleteUser {...props} />
                  </ListItemSecondaryAction>
                ) : props.following ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                      await props.unfollow(props.profile._id);
                      await props.readUser({ userId: userId });
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                      await props.follow(props.profile._id);
                      await props.readUser({ userId: userId });
                    }}
                  >
                    Follow
                  </Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={props.profile.about} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  "Verified: " + new Date(props.profile.verified).toDateString()
                }
              />
            </ListItem>
            <Divider />
          </List>
          <ProfileTab {...props} profile={props.profile} posts={posts} />
        </Paper>
      ) : null}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    redirectToSignin: state.user.redirectToSignin,
    isLoading: state.user.isLoading,
    profile: state.user.profile,
    following: state.user.following,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (id) => dispatch(follow(id)),
    unfollow: (id) => dispatch(unfollow(id)),
    readUser: (params) => dispatch(readUser(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
