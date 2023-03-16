import React from "react";

import Post from "./Post";

function PostList(props) {
  return (
    <>
      {props.posts.map((item, i) => {
        return <Post post={item} key={i} />;
      })}
      {props.posts && props.posts.length == 0 && (
        <div className="bg-violet-100 rounded-md p-4 m-2">
          <p className="text-sm text-gray-500">No Posts?</p>
          <p className="text-md font-bold text-gray-600">Create Posts.</p>
        </div>
      )}
    </>
  );
}

export default PostList;
