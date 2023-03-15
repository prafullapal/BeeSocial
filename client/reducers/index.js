import { combineReducers } from "redux";
import authReducer from "./authReducer";
import signupReducer from "./signupReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  signup: signupReducer,
  user: userReducer,
  posts: postReducer,
});
