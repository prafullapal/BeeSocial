import React from "react";
import PropTypes from "prop-types";

import Post from "./Post";
import { connect } from "react-redux";

function PostList(props) {
  return (
    <>
      {props.posts.map((item, i) => {
        return (
          <Post
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

export default PostList;