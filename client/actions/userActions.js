import axios from "axios";
import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_REMOVE_REQUEST,
  USER_REMOVE_SUCCESS,
  USER_REMOVE_FAILURE,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAILURE,
  USER_UNFOLLOW_REQUEST,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_FAILURE,
  USER_FINDPEOPLE_REQUEST,
  USER_FINDPEOPLE_SUCCESS,
  USER_FINDPEOPLE_FAILURE,
} from "./actionTypes";
import { logoutUser } from "./authActions";

export function readUser(params) {
  return async (dispatch) => {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    try {
      let response = await axios.get("/api/users/" + params.userId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAILURE,
        payload: error,
      });
    }
  };
}

export function listUser() {
  return async (dispatch) => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    try {
      let response = await axios.get("/api/users/list");
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAILURE,
        payload: error,
      });
    }
  };
}

export function updateUser(params, user) {
  return async (dispatch) => {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    try {
      let response = await axios.put("/api/users/" + params.userId, user, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAILURE,
        payload: error,
      });
    }
  };
}

export function removeUser(params) {
  return async (dispatch) => {
    dispatch({
      type: USER_REMOVE_REQUEST,
    });
    try {
      let response = await axios.delete("/api/users/" + params.userId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("Delete Response", response);
      dispatch({
        type: USER_REMOVE_SUCCESS,
        payload: response.data,
      });
      dispatch(logoutUser());
    } catch (error) {
      dispatch({
        type: USER_REMOVE_FAILURE,
        payload: error,
      });
    }
  };
}

export function findPeople(params) {
  return async (dispatch) => {
    dispatch({
      type: USER_FINDPEOPLE_REQUEST,
    });
    try {
      let response = await axios.get("/api/users/findPeople/" + params.userId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: USER_FINDPEOPLE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_FINDPEOPLE_FAILURE,
        payload: error,
      });
    }
  };
}

export function follow(followId) {
  return async (dispatch) => {
    dispatch({
      type: USER_FOLLOW_REQUEST,
    });
    try {
      let response = await axios.put(
        "/api/users/follow",
        { followId },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: USER_FOLLOW_SUCCESS,
        payload: response.status,
      });
    } catch (error) {
      dispatch({
        type: USER_FOLLOW_FAILURE,
        payload: error,
      });
    }
  };
}

export function unfollow(unfollowId) {
  return async (dispatch) => {
    dispatch({
      type: USER_UNFOLLOW_REQUEST,
    });
    try {
      let response = await axios.put(
        "/api/users/unfollow",
        { unfollowId },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: USER_UNFOLLOW_SUCCESS,
        payload: response.status,
      });
    } catch (error) {
      dispatch({
        type: USER_UNFOLLOW_FAILURE,
        payload: error,
      });
    }
  };
}
