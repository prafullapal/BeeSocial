import React from "react";
import PropTypes from "prop-types";

import Post from "./Post";

export default function PostList(props) {
  return (
    <>
      {props.posts.map((item, i) => {
        return (
          <Post
            user={props.user}
            isAuth={props.isAuth}
            post={item}
            key={i}
            onRemove={props.removeUpdate}
          />
        );
      })}
    </>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired,
};
