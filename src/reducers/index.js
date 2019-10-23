import {
    SET_LOGIN_STATUS,
    SET_USER_INFO,
    FETCH_TICKETS_START,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE,
} from "../actions";

const initialState = {
    loginStatus: false,
    userInfo: {},
    tickets: {},
    isFetchingTickets: false,
    ticketsFetchError: ""
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGIN_STATUS:
            return {...state, loginStatus: action.payload};
        case SET_USER_INFO:
            return {...state, userInfo: action.payload};
        case FETCH_TICKETS_START:
            return {...state, isFetchingTickets: true, ticketsFetchError: ""}
        case FETCH_TICKETS_FAILURE:
            return {...state, isFetchingTickets: false, ticketsFetchError: action.payload}
        case FETCH_TICKETS_SUCCESS:
            return {...state, isFetchingTickets: false, tickets: action.payload}
        default:
            return state;
    }
}

export default rootReducer;