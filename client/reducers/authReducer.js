import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST,LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../actions/actionTypes";
const initialState = {
    user: JSON.parse(localStorage.getItem("user"))||null,
    error: null,
    isLoading: false,
    isAuthenticated: JSON.parse(localStorage.getItem("user"))? true: false,
  };

  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case LOGOUT_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        };
      default:
        return state;
    }
  }
  