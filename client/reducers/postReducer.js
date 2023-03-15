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
} from "../actions/actionTypes";

const initialState = {
  error: null,
  isLoading: false,
  msg: null,
  feed: [],
  posts: [],
  post: null,
};

function checkId(arr, item) {
  const index = arr.findIndex((obj) => obj._id === item._id);
  console.log(index);
  if (index > -1) {
    arr.splice(index, 1, item);
  }
  return arr;
}

export default function postReducer(state = initialState, action) {
  let updatedPosts = [];
  switch (action.type) {
    case NEWSFEED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case NEWSFEED_SUCCESS:
      return {
        ...state,
        feed: action.payload || [],
        isLoading: false,
      };
    case NEWSFEED_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case MYPOSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MYPOSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case MYPOSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case NEWPOST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case NEWPOST_SUCCESS:
      if (state.feed.length > 0) {
        updatedPosts = [...state.feed];
        updatedPosts.unshift(action.payload);
      } else {
        updatedPosts.push(action.payload);
      }
      return {
        ...state,
        feed: updatedPosts,
        isLoading: false,
      };
    case NEWPOST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case GETPOST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GETPOST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };
    case GETPOST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case DELPOST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELPOST_SUCCESS:
      updatedPosts = [...state.feed];
      var index = updatedPosts.indexOf(action.payload);
      updatedPosts.splice(index, 1);
      return {
        ...state,
        feed: updatedPosts,
        isLoading: false,
      };
    case DELPOST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case LIKE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LIKE_SUCCESS:
      updatedPosts = [...state.feed];
      updatedPosts = checkId(updatedPosts, action.payload);
      return {
        ...state,
        isLoading: false,
        feed: updatedPosts,
      };
    case LIKE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case UNLIKE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UNLIKE_SUCCESS:
      updatedPosts = [...state.feed];
      updatedPosts = checkId(updatedPosts, action.payload);
      return {
        ...state,
        isLoading: false,
        feed: updatedPosts,
      };
    case UNLIKE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COMMENT_SUCCESS:
      updatedPosts = [...state.feed];
      updatedPosts = checkId(updatedPosts, action.payload);
      return {
        ...state,
        isLoading: false,
        feed: updatedPosts,
      };
    case COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case UNCOMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UNCOMMENT_SUCCESS:
      updatedPosts = [...state.feed];
      updatedPosts = checkId(updatedPosts, action.payload);
      return {
        ...state,
        isLoading: false,
        feed: updatedPosts,
      };
    case UNCOMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
