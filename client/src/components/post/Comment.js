import React, { useState } from "react";
import { connect } from "react-redux";

import { comment, uncomment } from "../../../actions/postActions";

function Comments(props) {
  const [text, setText] = useState("");

  const addComment = (event) => {
    event.preventDefault();
    props.comment(
      {
        postId: props.postId,
      },
      { text: text }
    );
    setText("");
  };

  const deleteComment = (comment) => {
    props.uncomment({ postId: props.postId }, comment);
  };

  const handleChange = (name) => (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="flex items-center py-2 gap-2">
        <img
          className="w-8 h-8 rounded-full border-2 border-violet-100"
          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
          alt="Image"
        />
        <textarea
          rows="1"
          placeholder="Add a comment..."
          value={text}
          onChange={handleChange("text")}
          className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded-lg text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
        />
        <button
          className="bg-violet-500 rounded-full py-1 px-2 text-gray-50"
          onClick={addComment}
        >
          Post
        </button>
      </div>
      <div>
        {props.comments.map((item, i) => {
          return (
            <div key={i} className="flex py-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-violet-100"
                src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                alt="Image"
              />
              <div className="bg-gray-200 rounded-md w-full px-2 py-1">
                <div className="flex gap-2">
                  <p className="font-bold text-sm">
                    <a href={`/user/${item.postedBy._id}`}>
                      {item.postedBy.name}
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">
                    {" "}
                    | {item.postedBy.name}
                  </p>
                </div>
                <p className="text-gray-900 text-md">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    comment: (params, payload) => dispatch(comment(params, payload)),
    uncomment: (params, payload) => dispatch(uncomment(params, payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
