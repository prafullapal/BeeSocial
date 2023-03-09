import axios from "axios";
import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, VERIFY_REQUEST, VERIFY_SUCCESS, VERIFY_FAILURE } from "./actionTypes";
export function signupRequest(){
    return {
      type: SIGNUP_REQUEST,
    };
  }

  export function signupSuccess(msg){
    return {
      type: SIGNUP_SUCCESS,
      payload: msg,
    };
  }

  export function signupFailure(error){
    return {
      type: SIGNUP_FAILURE,
      payload: error,
    };
  }
  
  export function verifyEmailRequest() {
    return {
      type: VERIFY_REQUEST,
    }
  }

  export function verifyEmailSuccess(payload) {
    return {
      type: VERIFY_SUCCESS,
      payload: payload
    }
  }

  export function verifyEmailFailure(error) {
    return {
      type: VERIFY_FAILURE,
      payload: error
    }
  }

  export function signupUser(payload) {
    return async (dispatch) => {
      dispatch(signupRequest());
      try {
        let response = await axios.post("/api/auth/register", payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        dispatch(signupSuccess(response.data.msg));
      } catch (err) {
        dispatch(signupFailure(err));
      }
    }
  }

  export function verifyEmail(payload) {
    return async (dispatch) => {
      dispatch(verifyEmailRequest());
      try {
        let response = await axios.post("/api/auth/verify-email", payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        dispatch(verifyEmailSuccess(response.data));
      } catch (err) {
        dispatch(verifyEmailFailure(err));
      }
    }
  }