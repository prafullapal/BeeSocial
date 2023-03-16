import React, { useState } from "react";
import { connect } from "react-redux";
import { create } from "../../../actions/postActions";

function NewPost(props) {
  const [values, setValues] = useState({
    text: "",
    photo: null,
    error: "",
    user: {},
  });
  const clickPost = () => {
    let postData = new FormData();
    values.text && postData.append("text", values.text);
    values.photo && postData.append("photo", values.photo);
    console.log(postData);
    props.create({ userId: props.user.userId }, postData);
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoUrl = props.user.userId
    ? `/api/users/photo/${props.user.userId}`
    : null;
  console.log(values.photo);
  return (
    <>
      <p className="p-4 text-xl text-gray-800">Create New Post</p>
      <div id="newPost" className="mb-4 p-4">
        <div className="bg-white p-2 rounded-md divide-y divide-gray-300">
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
                    <a href={`/user/${props.user.userId}`}>{props.user.name}</a>
                  </p>
                  <p className="text-sm px-2 text-gray-500">
                    {/* User Id */}| {props.user.userId}
                  </p>
                </div>
                {/* Status */}
                <p className="text-sm text-gray-600">Status</p>
              </div>
            </div>
            <div className="px-2">
              <label htmlFor="icon-button-file">
                <input
                  accept="image/*"
                  onChange={handleChange("photo")}
                  id="icon-button-file"
                  type="file"
                  className="-z-1 hidden"
                />
                {/* Image Upload Button */}
                <div className="bg-violet-50 w-8 h-8 cursor-pointer rounded-full py-2 px-2 text-violet-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
              </label>
            </div>
          </div>
          <div className="my-3 pt-2">
            <textarea
              rows="6"
              placeholder="Share your thoughts..."
              value={values.text}
              onChange={handleChange("text")}
              className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
            />
            {values.photo && (
              <div className="h-16 mt-1 rounded-md flex flex-nowrap">
                {/* Show Images Here when added of size w-16 h-16 and wrap the div in a conditional rendering whenever image is added*/}
                <img
                  className="w-16 h-16 rounded-md border-2 border-violet-100"
                  src={URL.createObjectURL(values.photo)}
                  alt="Image"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end p-2">
            <button
              className="text-md bg-violet-500 rounded-md py-1 px-2 text-gray-50"
              onClick={clickPost}
            >
              Post
            </button>
          </div>
        </div>
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
    create: (params, payload) => dispatch(create(params, payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
