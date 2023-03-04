import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { list } from "./api-user.js";

import {
  Paper,
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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <Paper elevation={4}>
      <Typography variant="h6">All Users</Typography>
      <List dense>
        {users.map((item, i) => {
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
        })}
      </List>
    </Paper>
  );
}
