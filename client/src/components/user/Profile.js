import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import DeleteUser from "./DeleteUser";
import ProfileTab from "./ProfileTab";

import { readUser, follow, unfollow } from "../../../actions/userActions";
import SideBar from "../core/SideBar";

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
      <div className="grid grid-cols-8 md:grid-cols-4 sm:px-10 lg:px-40 max-h-full mt-8">
        <SideBar
          isOpen={props.isOpen}
          setIsOpen={(bool) => props.setIsOpen(bool)}
        />
        {props.profile && (
          <div className="col-start-2 col-span-7 md:col-span-3 rounded-lg m-2">
            <div className="relative bg-white">
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
                    <a href={`/user/${props.profile._id}`}>
                      {props.profile.name}
                    </a>
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
