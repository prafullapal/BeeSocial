import React, { useState } from "react";
import { connect } from "react-redux";

import Comments from "./Comment";
import { like, remove, unlike } from "../../../actions/postActions";

function Post(props) {
  const checkLike = (likes) => {
    let match =
      likes.findIndex(function (likes) {
        return likes._id === props.user.userId;
      }) !== -1;
    return match;
  };

  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    comments: props.post.comments,
  });

  const clickLike = () => {
    let handler = values.like ? props.unlike : props.like;
    handler({
      postId: props.post._id,
    });
    setValues({ ...values, like: !values.like });
  };

  const deletePost = () => {
    props.remove({ postId: props.post._id });
  };

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };
  const imageSRC = (data) => {
    var arrayBufferView = new Uint8Array(data);
    var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
  };
  const photoUrl = props.user.userId
    ? `/api/users/photo/${props.post.postedBy._id}`
    : null;

  return (
    <div className="p-2 rounded-md divide-y divide-gray-300">
      {/* Header of the PostCard */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full border-2 border-violet-100"
            src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
            alt="Image"
          />
          <div className="px-2">
            <div className="flex">
              {/* Name of the Post Creator */}
              <p className="text-sm text-gray-800">
                <a href={`/user/${props.post.postedBy._id}`}>
                  {props.post.postedBy.name}
                </a>
              </p>
              <p className="text-sm px-2 text-gray-500">
                {/* Following or Not Following Tag */}
                {props.post.postedBy._id == props.user.userId
                  ? ""
                  : "| Following"}
              </p>
            </div>
            {/* Status or User Id */}
            <p className="text-sm text-gray-500">{props.post.postedBy._id}</p>
          </div>
        </div>
        {/* <div className="px-2">
          // Follow/Unfollow Button
          <button className="bg-violet-500 rounded-md py-1 px-2 text-gray-50">
            Follow
          </button>
        </div> */}
      </div>
      {/* Content of the Card */}
      <div className="text-sm pt-1">
        {/* Contents */}
        {props.post.text}
        {props.post.photo && <img src={imageSRC(props.post.photo.data.data)} />}
        <div className="flex justify-between my-1">
          <div className="text-sm text-gray-400">
            {props.post.likes.length} Likes
          </div>
          <div className="text-sm text-gray-400">
            {props.post.comments.length} Comments
          </div>
        </div>
      </div>
      {/* Footer of the Card */}
      <div className="flex justify-between my-1">
        <button
          className="text-md items-center hover:bg-gray-300 hover:rounded-sm p-2 mt-1"
          onClick={clickLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-flex"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
          <span className=""> {values.like ? "Unlike" : "Like"}</span>
        </button>
        <button className="text-md items-center hover:bg-gray-300 hover:rounded-sm p-2 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline-flex"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <span className=""> Comments</span>
        </button>
        <button className="text-md items-center hover:bg-gray-300 hover:rounded-sm p-2 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-flex"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          <span className=""> Share</span>
        </button>
      </div>
      <Comments postId={props.post._id} comments={props.post.comments} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (params) => dispatch(remove(params)),
    like: (params) => dispatch(like(params)),
    unlike: (params) => dispatch(unlike(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
