import React, { useEffect } from "react";
import { connect } from "react-redux";

import PostList from "./PostList";
import { listNewsFeed } from "../../../actions/postActions";

function Newsfeed(props) {
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    props.listNewsFeed({
      userId: props.user.userId,
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <div
        id="postCards"
        className="grid grid-flow-row auto-rows-max m-2 bg-white"
      >
        <p className="text-xl text-gray-800 px-2 py-4">News Feed</p>
        <PostList posts={props.feed} />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    feed: state.posts.feed,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    listNewsFeed: (params) => dispatch(listNewsFeed(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
