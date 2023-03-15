import React from "react";

import Post from "./Post";

function PostList(props) {
  return (
    <>
      {props.posts.map((item, i) => {
        return <Post post={item} key={i} />;
      })}
    </>
  );
}

export default PostList;
