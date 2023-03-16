import React, { useState } from "react";
import { connect } from "react-redux";

import Newsfeed from "../post/Newsfeed";
import FindPeople from "../user/FindPeople";
import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import NewPost from "../post/NewPost";
import SideBar from "./SideBar";

function Home(props) {
  const [signUp, setSignUp] = useState(false);
  return (
    <>
      {!props.isAuthenticated ? (
        <div className="flex flex-col sm:flex-row p-4 h-screen items-center">
          <div className="basis-1/2 mx-14 pt-32 sm:mt-4">
            <p className="font-sans font-bold text-4xl md:text-6xl lg:text-8xl text-indigo-600">
              BeeSocial.
            </p>
            <p className="font-sans text-xl md:text-2xl text-gray-900">
              Your online hive for meaningful connections.
            </p>
          </div>
          <div className="basis-1/2 justify-self-center">
            <div className="flex flex-1 flex-col px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  {signUp ? "Sign up" : "Sign in"} to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {signUp ? <Signup /> : <Signin />}

                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?
                  <a
                    href="#"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    onClick={() => setSignUp(!signUp)}
                  >
                    {signUp ? " Sign In" : " Sign Up"}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-8 md:grid-cols-4 sm:px-10 lg:px-40 max-h-full mt-8">
          <SideBar
            isOpen={props.isOpen}
            setIsOpen={(bool) => props.setIsOpen(bool)}
          />
          <div className="col-start-2 col-span-7 md:col-span-3 rounded-lg">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              <div className="col-start-1 col-span-3 sm:col-span-2 h-[90vh] overflow-auto">
                {/* Add New Post */}
                <NewPost />
                {/* Add NewsFees i.e. List of Post Cards */}
                <Newsfeed />
              </div>
              <div className="hidden sm:block sm:col-start-3">
                <div className="grid grid-rows-4 grid-flow-col gap-4 m-2">
                  <div className="row-start-1 row-span-2 bg-white">
                    <div className="flex flex-col justify-between ">
                      <p className="p-4 text-xl text-gray-800">
                        Suggestions For You
                      </p>
                      <p
                        className="text-sm text-violet-500 cursor-pointer text-right px-4"
                        onClick={() => props.setIsOpen(true)}
                      >
                        See All
                      </p>
                    </div>
                    <FindPeople small="true" />
                  </div>
                  <div className="row-start-3 row-span-2 bg-white">
                    <p className="p-4 text-xl text-gray-800">
                      Latest Post Activity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Home);
