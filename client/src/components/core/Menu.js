import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

import { logoutUser } from "../../../actions/authActions";

function Menus(props) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`bg-gray-200 sm:px-10 lg:px-40  ${
        props.isAuthenticated ? "" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="p-4">
          {/* logo */}
          <p className="text-2xl font-bold text-indigo-500">BeeSocial.</p>
        </div>
        <div className="p-4 flex space-x-2 items-center">
          {/* search */}
          <button onClick={() => setOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-violet-500 hover:scale-150 transition duration-500 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <Transition appear show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Search
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* Search Bar and Search Results Heres */}
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full items-center justify-center rounded-full bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <img
                  className="w-8 rounded-full border-2 border-violet-100"
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                  alt="Image"
                />

                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          navigate(`/user/${props.user.userId}`);
                        }}
                      >
                        {active ? (
                          <UserCircleIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <UserCircleIcon
                            className="mr-2 h-5 w-5 text-violet-500"
                            aria-hidden="true"
                          />
                        )}
                        My Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <PencilIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <PencilIcon
                            className="mr-2 h-5 w-5 text-violet-500"
                            aria-hidden="true"
                          />
                        )}
                        Edit Profile
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  {/* <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <LifebuoyIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <LifebuoyIcon
                            className="mr-2 h-5 w-5 text-violet-500"
                            aria-hidden="true"
                          />
                        )}
                        Help
                      </button>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          navigate(`/user/settings/${props.user.userId}`);
                        }}
                      >
                        {active ? (
                          <Cog6ToothIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <Cog6ToothIcon
                            className="mr-2 h-5 w-5 text-violet-500"
                            aria-hidden="true"
                          />
                        )}
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => {
                          props.logoutUser();
                          navigate("/");
                        }}
                      >
                        {active ? (
                          <PowerIcon
                            className="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <PowerIcon
                            className="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                          />
                        )}
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
