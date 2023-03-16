import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import PostList from "../post/PostList";

import { connect } from "react-redux";

import { unfollow } from "../../../actions/userActions";
import { listByUser } from "../../../actions/postActions";
import PeopleCard from "./PeopleCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProfileTab(props) {
  useEffect(() => {
    props.listByUser({ userId: props.userId });
  }, [props.userId]);

  const clickUnfollow = async (user) => {
    await props.unfollow(user._id);
  };

  return (
    <Tab.Group as="div" className="divide-y">
      <Tab.List className="grid grid-cols-3 gap-2 w-full">
        {["Posts", "Followers", "Following"].map((tab, idx) => {
          return (
            <Tab
              key={idx}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-500"
                )
              }
            >
              {tab}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels className="my-2">
        <Tab.Panel className="m-4">
          {/* Users Posts List */}
          <PostList posts={props.posts} />
        </Tab.Panel>
        <Tab.Panel>
          {/* Users Followers List */}
          {props.profile &&
            props.profile.followers.map((people, idx) => {
              return (
                <PeopleCard
                  key={idx}
                  people={people}
                  callback={
                    props.userId == props.user.userId ? clickUnfollow : null
                  }
                  btn="unfollow"
                />
              );
            })}
          {props.profile && props.profile.followers.length === 0 && (
            <div className="bg-violet-100 rounded-md m-4 p-4">
              <p className="text-sm text-gray-500">No Followers?</p>
              <p className="text-md font-bold text-gray-600">
                Create Posts, to attract Followers
              </p>
            </div>
          )}
        </Tab.Panel>
        <Tab.Panel>
          {/* Users Following List */}
          {props.profile &&
            props.profile.following.map((people, idx) => {
              return (
                <PeopleCard
                  key={idx}
                  people={people}
                  callback={
                    props.userId == props.user.userId ? clickUnfollow : null
                  }
                  btn="unfollow"
                />
              );
            })}
          {props.profile && props.profile.following.length === 0 && (
            <div className="bg-violet-100 rounded-md m-4 p-4">
              <p className="text-sm text-gray-500">No Followings?</p>
              <p className="text-md font-bold text-gray-600">
                You have not followed anyone. Follow people to see their posts.
              </p>
            </div>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
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
    posts: state.posts.posts,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (id) => dispatch(follow(id)),
    unfollow: (id) => dispatch(unfollow(id)),
    readUser: (params) => dispatch(readUser(params)),
    listByUser: (params) => dispatch(listByUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
