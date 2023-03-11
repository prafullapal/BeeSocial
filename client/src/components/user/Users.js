import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";

import { connect } from "react-redux";

import { listUser } from "../../../actions/userActions.js";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    props.listUser();

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">All Users</Typography>
        <List dense>
          {props.usersList ? props.usersList.map((item, i) => {
            return (
              <Link to={"/user/" + item._id} key={i}>
                <ListItem>
                  <ListItemAvatar>
                    {item.photo && item.photo.data ? (
                      <Avatar
                        src={`/api/users/photo/${
                          item._id
                        }?${new Date().getTime()}`}
                      />
                    ) : (
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForwardIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          }): null}
        </List>
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    usersList: state.user.list
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    listUser: ()=> dispatch(listUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);