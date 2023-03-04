import React, { useState, useEffect } from "react";

import { listNewsFeed } from "./api-post";

import PostList from "./PostList";
import NewPost from "./NewPost";

import { Typography, Paper } from "@mui/material";

export default function Newsfeed(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed(
      {
        userId: props.user.userId,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <Paper elevation={3} sx={{ padding: "10px" }}>
      <Typography type="title" variant="h6">
        NewsFeed
      </Typography>
      <NewPost {...props} addUpdate={addPost} />
      <PostList {...props} removeUpdate={removePost} posts={posts} />
    </Paper>
  );
}
