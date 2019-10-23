import axiosWithAuth from "../axiosWithAuth";

export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const SET_USER_INFO = "SET_USER_INFO";

export const SET_TICKETS = "SET_OPEN_TICKETS";
export const FETCH_TICKETS_START = "FETCH_TICKETS_START";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";

export const setLoginStatus = loginStatus => {
    return {type: SET_LOGIN_STATUS, payload: loginStatus};    
}

export const setUserInfo = userInfo => {
    return {
        type: SET_USER_INFO,
        payload: userInfo
    }
}

export const updateTickets = () => dispatch => {
    dispatch({type: FETCH_TICKETS_START});
    
    axiosWithAuth().get("/tickets")
    .then((resp) => {
        const openTickets = [];
        const closedTickets = [];

        resp.data.forEach(ticket => ticket.resolved ? closedTickets.push(ticket) : openTickets.push(ticket));

        dispatch({type: FETCH_TICKETS_SUCCESS, payload: {openTickets: openTickets, closedTickets: closedTickets}});
    })
    .catch((err) => {
        console.log(err.response.data.message);
        dispatch({type: FETCH_TICKETS_FAILURE}, err.response.data.message);
    })
}