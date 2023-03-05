import React, { useState } from "react";
import { Link } from "react-router-dom";

import { comment, uncomment } from "./api-post";

import { Avatar, CardHeader, TextField, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function Comments(props) {
  const [text, setText] = useState("");

  const addComment = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      comment(
        {
          postId: props.postId,
        },
        { text: text }
      ).then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setText("");
          props.updateComments(data.comments);
        }
      });
    }
  };

  const deleteComment = (comment) => {
    uncomment({ postId: props.postId }, comment).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        props.updateComments(data.comments);
      }
    });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const commentBody = (item) => {
    return (
      <p>
        <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link>
        <br />
        {item.text}
        <span>
          {new Date(item.createdAt).toDateString() |
            (props.user.userId === item.postedBy._id) && (
            <IconButton
              aria-label="Delete"
              onClick={() => deleteComment(item)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={<Avatar src={"/api/users/photo/" + props.user.userId} />}
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder="Write Something..."
            margin="normal"
          />
        }
      />

      {props.comments.map((item, i) => {
        return (
          <CardHeader
            avatar={<Avatar src={"/api/users/photo/" + item.postedBy._id} />}
            title={commentBody(item)}
            key={i}
          />
        );
      })}
    </div>
  );
}
