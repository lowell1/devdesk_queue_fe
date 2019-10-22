import {
    SET_LOGIN_STATUS,
    SET_USER_INFO
} from "../actions";

const initialState = {
    loginStatus: false,
    userInfo: {}
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGIN_STATUS:
            return {...state, loginStatus: action.payload};
        case SET_USER_INFO:
            return {...state, userInfo: action.payload};
        default:
            return state;
    }
}

export default rootReducer;