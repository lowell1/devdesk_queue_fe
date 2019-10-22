import {
    SET_LOGIN_STATUS
} from "../actions";

const initialState = {
    loginStatus: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGIN_STATUS:
            return {...state, loginStatus: action.payload};
        default:
            return state;
    }
}

export default rootReducer;