import React, { Fragment, useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import DeleteUser from "./DeleteUser";
import ProfileTab from "./ProfileTab";

import { connect } from "react-redux";
import { readUser, follow, unfollow } from "../../../actions/userActions";

function Profile(props) {
  let { userId } = useParams();

  useEffect(() => {
    props.readUser({ userId: userId });
  }, [userId]);

  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState({
    error: null,
  });

  const photoUrl = userId
    ? `/api/users/photo/${userId}?${new Date().getTime()}`
    : null;

  return (
    <>
      <div className="grid grid-cols-4 px-60 min-h-[90vh] mt-8">
        <div className="col-start-1 space-x-2 rounded-lg bg-gray-50 divide-y">
          <p className="p-8 text-xl text-gray-800">Menu</p>
          <div className="flex flex-col gap-x-8 gap-y-4 text-gray-900 text-md p-2">
            <a href="/" className="py-2">
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span> Home</span>
            </a>
            <a href={`/user/${props.user.userId}`} className="py-2">
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span> Profile</span>
            </a>
            <a href="#" className="py-2">
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
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <span> Messages</span>
            </a>
            <a href="#" className="py-2">
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
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <span> Find People</span>
            </a>
            <a href="#" className="py-2">
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
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span> Settings</span>
            </a>
          </div>
          <div className="w-64 h-64 bg-violet-500 m-16 p-8"> Hello</div>
        </div>
        {props.profile && (
          <div className="col-start-2 col-span-3  bg-indigo-50 bg-opacity-50 rounded-lg">
            <div className="relative">
              <img
                src="https://media.licdn.com/dms/image/D4D16AQGhskxoLG3CQQ/profile-displaybackgroundimage-shrink_350_1400/0/1683843535676?e=1694044800&v=beta&t=ELhBkwNTFWXoGjb0DtplluX04zMstD6QP7bbfbv0Vk0"
                className="w-full h-48"
                alt="Image"
              />
              <div className="top-28 left-6 absolute">
                <img
                  className="w-36 h-36 rounded-full border-4 border-violet-100"
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                  alt="Image"
                />
                <div className="text-gray-600">
                  <p className="font-bold text-2xl text-gray-800">
                    {props.profile.name}
                  </p>
                  <p className="text-md">{props.profile._id}</p>
                  <p className="text-sm">Kanpur, Uttar Pradesh</p>
                </div>
              </div>
              <div className="mt-48">
                <ProfileTab userId={userId} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    redirectToSignin: state.user.redirectToSignin,
    isLoading: state.user.isLoading,
    profile: state.user.profile,
    following: state.user.following,
    msg: state.user.msg,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (id) => dispatch(follow(id)),
    unfollow: (id) => dispatch(unfollow(id)),
    readUser: (params) => dispatch(readUser(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
