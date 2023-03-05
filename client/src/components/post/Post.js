import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { like, remove, unlike } from "./api-post";

import Comments from "./Comment";

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

export default function Post(props) {
  const checkLike = (likes) => {
    let match = likes.indexOf(props.user.userId) !== -1;
    return match;
  };

  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    likes: props.post.likes.length,
    comments: props.post.comments,
  });

  const clickLike = () => {
    let handler = values.like ? unlike : like;
    handler({
      postId: props.post._id,
    }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length });
      }
    });
  };

  const deletePost = () => {
    remove({ postId: props.post._id }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        props.onRemove(props.post);
      }
    });
  };

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  return (
    <Card sx={{ marginTop: 3 }}>
      <CardHeader
        avatar={<Avatar src={"/api/users/photo/" + props.post.postedBy._id} />}
        action={
          props.post.postedBy._id === props.user.userId && (
            <IconButton onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={
          <Link to={"/user/" + props.post.postedBy._id}>
            {props.post.postedBy.name}
          </Link>
        }
        subheader={new Date(props.post.createdAt).toDateString()}
      />
      <Divider />
      {props.post.photo && (
        <CardMedia
          component="img"
          image={"/api/posts/photo/" + props.post._id}
          height="200"
          style={{
            objectFit: "contain",
          }}
        />
      )}
      <Divider />
      <CardContent>
        <Typography component="p">{props.post.text}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        {values.like ? (
          <IconButton onClick={clickLike} aria-label="Like" color="secondary">
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton onClick={clickLike} aria-label="Unlike" color="secondary">
            <FavoriteBorderIcon />
          </IconButton>
        )}
        <span>{values.likes}</span>
        <IconButton aria-label="Comment" color="secondary">
          <CommentIcon />
        </IconButton>{" "}
        <span>{values.comments.length}</span>
      </CardActions>
      <Divider />
      <Comments
        user={props.user}
        isAuth={props.isAuth}
        postId={props.post._id}
        comments={values.comments}
        updateComments={updateComments}
      />
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
