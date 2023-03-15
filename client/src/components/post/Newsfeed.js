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
      <p className="p-4 text-xl text-gray-800">News Feed</p>
      <div
        id="postCards"
        className="grid grid-flow-row gap-4 auto-rows-max p-4"
      >
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
