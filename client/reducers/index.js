import { combineReducers } from "redux";
import authReducer from "./authReducer";
import signupReducer from "./signupReducer";

export default combineReducers({
    auth: authReducer,
    signup: signupReducer,
})