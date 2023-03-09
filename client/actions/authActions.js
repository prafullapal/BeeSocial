import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./actionTypes";

export function loginUser(user) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      let response = await axios.post("/api/auth/login", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
      });
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    try {
      let response = await axios.get("/api/auth/logout");
      console.log(response.data);
      localStorage.removeItem("user");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: error,
      });
    }
  };
}
