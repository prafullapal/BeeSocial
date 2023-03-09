import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, VERIFY_REQUEST, VERIFY_SUCCESS, VERIFY_FAILURE  } from "../actions/actionTypes";

const initialState = {
    msg: null,
    error: null,
    isLoading: false,
};

export default function signupReducer(state = initialState, action) {
    switch(action.type){
        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                msg: action.payload,
                error: null,
                isLoading: false,
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                error: action.payload.response.data.message || action.payload.message,
                msg: null,
                isLoading: false,
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                msg: action.payload.msg,
                isLoading: false,
            };
        case VERIFY_FAILURE:
            return {
                ...state,
                error: action.payload.response.data.message || action.payload.message,
                isLoading: false,
            }
        default:
            return state;
    }
}