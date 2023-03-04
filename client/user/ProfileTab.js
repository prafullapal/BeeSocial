import React, { useState } from "react";

import FollowGrid from "./FollowGrid";
import PostList from "../post/PostList";

import { Box, Tabs, Tab } from "@mui/material";

export default function ProfileTab(props) {
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Posts" />
        <Tab label="Following" />
        <Tab label="Followers" />
      </Tabs>
      {value === 0 &&
        (props.posts.length ? (
          <PostList
            removeUpdate={removePost}
            posts={props.posts}
            user={props.user}
            isAuth={props.isAuth}
          />
        ) : (
          "No Posts"
        ))}
      {value === 1 &&
        (props.profile.following.length ? (
          <FollowGrid people={props.profile.following} />
        ) : (
          "No Followings"
        ))}
      {value === 2 &&
        (props.profile.followers.length ? (
          <FollowGrid people={props.profile.followers} />
        ) : (
          "No Followers"
        ))}
    </Box>
  );
}
