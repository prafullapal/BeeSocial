import React, {useEffect } from "react";
import { Link } from "react-router-dom";

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
import { findPeople, follow } from "../../../actions/userActions";
import { connect } from "react-redux";

function FindPeople(props) {
  useEffect(() => {

    props.findPeople(
      {
        userId: props.user.userId,
      }
    );
  }, []);

  const clickFollow = async (user, index) => {
    await props.follow(user._id);
    await props.findPeople({userId: props.user.userId})
  };

  return (
    <>
      <Paper elevation={4} sx={{ padding: "10px" }}>
        <Typography type="title" variant="h6">
          Who to Follow
        </Typography>
        <Divider />
        <List>
          {props.followPeople ? props.followPeople.map((item, i) => {
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
          }): null}
        </List>
      </Paper>

      {/* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span>{values.followMessage}</span>}
      /> */}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    followPeople: state.user.findPeople,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findPeople: (params) => dispatch(findPeople(params)),
    follow: (id) => dispatch(follow(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPeople);