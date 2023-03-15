import axios from "axios";

import {
  NEWSFEED_REQUEST,
  NEWSFEED_SUCCESS,
  NEWSFEED_FAILURE,
  MYPOSTS_REQUEST,
  MYPOSTS_SUCCESS,
  MYPOSTS_FAILURE,
  NEWPOST_REQUEST,
  NEWPOST_SUCCESS,
  NEWPOST_FAILURE,
  GETPOST_REQUEST,
  GETPOST_SUCCESS,
  GETPOST_FAILURE,
  DELPOST_REQUEST,
  DELPOST_SUCCESS,
  DELPOST_FAILURE,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAILURE,
  UNLIKE_REQUEST,
  UNLIKE_SUCCESS,
  UNLIKE_FAILURE,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  UNCOMMENT_REQUEST,
  UNCOMMENT_SUCCESS,
  UNCOMMENT_FAILURE,
} from "./actionTypes";

export function listNewsFeed(params) {
  return async (dispatch) => {
    dispatch({
      type: NEWSFEED_REQUEST,
    });
    try {
      let response = await axios.get("/api/posts/feed/" + params.userId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: NEWSFEED_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: NEWSFEED_FAILURE,
        payload: error,
      });
    }
  };
}

export function listByUser(params) {
  return async (dispatch) => {
    dispatch({
      type: MYPOSTS_REQUEST,
    });
    try {
      let response = await axios.get("/api/posts/by/" + params.userId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: MYPOSTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: MYPOSTS_FAILURE,
        payload: error,
      });
    }
  };
}

export function create(params, payload) {
  return async (dispatch) => {
    dispatch({
      type: NEWPOST_REQUEST,
    });
    try {
      let response = await axios.post(
        "/api/posts/new/" + params.userId,
        payload,
        {
          headers: {
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: NEWPOST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: NEWPOST_FAILURE,
        payload: error,
      });
    }
  };
}

export function postById(params) {
  return async (dispatch) => {
    dispatch({
      type: GETPOST_REQUEST,
    });
    try {
      let response = await axios.get("/api/posts/" + params.postId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: GETPOST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GETPOST_FAILURE,
        payload: error,
      });
    }
  };
}

export function remove(params) {
  return async (dispatch) => {
    dispatch({
      type: DELPOST_REQUEST,
    });
    try {
      let response = await axios.delete("/api/posts/" + params.postId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: DELPOST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DELPOST_FAILURE,
        payload: error,
      });
    }
  };
}

export function like(params) {
  return async (dispatch) => {
    dispatch({
      type: LIKE_REQUEST,
    });
    try {
      let response = await axios.get("/api/posts/like/" + params.postId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: LIKE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LIKE_FAILURE,
        payload: error,
      });
    }
  };
}

export function unlike(params) {
  return async (dispatch) => {
    dispatch({
      type: UNLIKE_REQUEST,
    });
    try {
      let response = await axios.get("/api/posts/unlike/" + params.postId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: UNLIKE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UNLIKE_FAILURE,
        payload: error,
      });
    }
  };
}

export function comment(params, payload) {
  return async (dispatch) => {
    dispatch({
      type: COMMENT_REQUEST,
    });
    try {
      let response = await axios.put(
        "/api/posts/comment/" + params.postId,
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: COMMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: COMMENT_FAILURE,
        payload: error,
      });
    }
  };
}

export function uncomment(params, payload) {
  return async (dispatch) => {
    dispatch({
      type: UNCOMMENT_REQUEST,
    });
    try {
      let response = await axios.put(
        "/api/posts/uncomment/" + params.postId,
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: UNCOMMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UNCOMMENT_FAILURE,
        payload: error,
      });
    }
  };
}
