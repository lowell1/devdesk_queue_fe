import axiosWithAuth from "../axiosWithAuth";

export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const SET_USER_INFO = "SET_USER_INFO";

export const FETCH_TICKETS_START = "FETCH_USER_TICKETS_START";
export const FETCH_TICKETS_SUCCESS = "FETCH_USER_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_USER_TICKETS_FAILURE";

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
    
    const role = JSON.parse(localStorage.getItem("userInfo")).role

    axiosWithAuth().get(role === "student" ? "/users/tickets" : "/tickets")
    .then((resp) => {
        const openTickets = [];
        const closedTickets = [];
        const assignedTickets = [];
        const unassignedTickets = [];

        resp.data.forEach(ticket => {
            ticket.solution ? closedTickets.push(ticket) : openTickets.push(ticket);
            
            if(role === "helper") {
                ticket.assigned ? assignedTickets.push(ticket) : unassignedTickets.push(ticket);
            }
        });

        dispatch({
            type: FETCH_TICKETS_SUCCESS, 
            payload: {
                openTickets: openTickets, 
                closedTickets: closedTickets,
                assignedTickets: assignedTickets,
                unassignedTickets: unassignedTickets
            }
        });
    })
    .catch((err) => {
        console.log(err.response.data.message);
        dispatch({type: FETCH_TICKETS_FAILURE, payload: err.response.data.message});
    })
}