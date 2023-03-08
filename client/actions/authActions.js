import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST,LOGOUT_REQUEST, LOGOUT_SUCCESS,LOGOUT_FAILURE } from "./actionTypes";
export function loginRequest() {
    return {
      type: LOGIN_REQUEST,
    };
  }
  
  export function loginSuccess(user) {
    return {
      type: LOGIN_SUCCESS,
      payload: user,
    };
  }
  
  export function loginFailure(error) {
    return {
      type: LOGIN_FAILURE,
      payload: error,
    };
  }
  
  export function logoutRequest() {
    return {
      type: LOGOUT_REQUEST,
    };
  }
  
  export function logoutSuccess() {
    return {
      type: LOGOUT_SUCCESS,
    };
  }

  export function logoutFailure(error) {
    return {
      type: LOGOUT_FAILURE,
      payload: error,
    };
  }

  export function loginUser(user) { 
    return async (dispatch) => {
      dispatch(loginRequest());
      try {
        let response = await axios.post("/api/auth/login", user, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        dispatch(loginSuccess(response.data.user));
      } catch (err) {
        dispatch(loginFailure(err));
      }
    }
  }

  export function logoutUser(user) {
    return async (dispatch) => {
      dispatch(logoutRequest());
      try {
        let response = await axios.get("/api/auth/logout");
        console.log(response.data);
        dispatch(logoutSuccess());
      } catch (err) {
        dispatch(logoutFailure(err));
      }
    }
  }
  