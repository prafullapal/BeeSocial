import { combineReducers } from "redux";
import authReducer from "./authReducer";
import signupReducer from "./signupReducer";
import userReducer from "./userReducer";

export default combineReducers({
    auth: authReducer,
    signup: signupReducer,
    user: userReducer,
})