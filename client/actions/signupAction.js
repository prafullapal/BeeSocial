import axios from "axios";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
} from "./actionTypes";

export function signupUser(payload) {
  return async (dispatch) => {
    dispatch({
      type: SIGNUP_REQUEST,
    });
    try {
      let response = await axios.post("/api/auth/register", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data.msg,
      });
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error,
      });
    }
  };
}

export function verifyEmail(payload) {
  return async (dispatch) => {
    dispatch({
      type: VERIFY_REQUEST,
    });
    try {
      let response = await axios.post("/api/auth/verify-email", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: VERIFY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: VERIFY_FAILURE,
        payload: error,
      });
    }
  };
}
