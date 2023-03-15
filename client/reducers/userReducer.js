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
} from "../actions/actionTypes";

const initialState = {
  list: null,
  error: null,
  isLoading: false,
  msg: null,
  profile: null,
  following: false,
  findPeople: null,
  open: false,
  redirectToProfile: false,
  redirectToSignin: false,
};

export default function userReducer(state = initialState, action) {
  console.log(action.type, "::", action.payload);
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        redirectToProfile: false,
        isLoading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        profile: action.payload.user,
        following: action.payload.following,
        isLoading: false,
      };
    case USER_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message || action.payload.message,
        isLoading: false,
      };
    case USER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case USER_LIST_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message || action.payload.message,
        isLoading: false,
      };
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        error: null,
        profile: action.payload,
        redirectToProfile: true,
        isLoading: false,
      };
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message || action.payload.message,
        isLoading: false,
      };
    case USER_REMOVE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_REMOVE_SUCCESS:
      return {
        ...state,
        msg: "Deleted Successfully",
        profile: null,
        isLoading: false,
      };
    case USER_REMOVE_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message || action.payload.message,
        isLoading: false,
      };
    case USER_FINDPEOPLE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_FINDPEOPLE_SUCCESS:
      return {
        ...state,
        findPeople: action.payload,
        isLoading: false,
      };
    case USER_FINDPEOPLE_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message || action.payload.message,
        isLoading: false,
      };
    case USER_FOLLOW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_FOLLOW_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case USER_FOLLOW_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message || action.payload.message,
        isLoading: false,
      };
    case USER_UNFOLLOW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_UNFOLLOW_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case USER_UNFOLLOW_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message || action.payload.message,
        isLoading: false,
      };
    default:
      return state;
  }
}
