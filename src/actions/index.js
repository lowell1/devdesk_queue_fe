import axiosWithAuth from "../axiosWithAuth";

export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const SET_USER_INFO = "SET_USER_INFO";

// export const SET_TICKETS = "SET_TICKETS";
export const FETCH_TICKETS_START = "FETCH_USER_TICKETS_START";
export const FETCH_TICKETS_SUCCESS = "FETCH_USER_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_USER_TICKETS_FAILURE";

// export const DELETE_TICKET_START = "DELETE_TICKET_START";
// export const DELETE_TICKET_SUCCESS = "DELETE_TICKET_SUCCESS";
// export const DELETE_TICKET_FAILURE = "DELETE_TICKET_FAILURE";

// export const RESOLVE_TICKET_START = "RESOLVE_TICKET_START";
// export const RESOLVE_TICKET_SUCCESS = "RESOLVE_TICKET_SUCCESS";
// export const RESOLVE_TICKET_FAILURE = "RESOLVE_TICKET_FAILURE";

// export const ASSIGN_TICKET_START = "ASSIGN_TICKET_START";
// export const ASSIGN_TICKET_FAILURE = "ASSIGN_TICKET_FAILURE";
// export const ASSIGN_TICKET_SUCCESS = "ASSIGN_TICKET_SUCCESS";

// export const REASSIGN_TICKET_START = "REASSIGN_TICKET_START";
// export const REASSIGN_TICKET_FAILURE = "REASSIGN_TICKET_FAILURE";
// export const REASSIGN_TICKET_SUCCESS = "REASSIGN_TICKET_SUCCESS";

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
            ticket.resolved ? closedTickets.push(ticket) : openTickets.push(ticket);
            
            if(role === "helper") {
                ticket.assigned ? assignedTickets.push(ticket) : unassignedTickets.push(ticket);
            }
        });

        console.log(
            openTickets,
            closedTickets,
            assignedTickets,
            unassignedTickets           
        )

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

// export const deleteTicket = (ticketId, isTicketOpen) => dispatch => {
//     dispatch({type: DELETE_TICKET_START});

//     axiosWithAuth().delete(`/users/tickets/${ticketId}`)
//     .then(() => {
//         dispatch({type: DELETE_TICKET_SUCCESS, payload: {ticketId, isTicketOpen}});
//     })
//     .catch(err => {
//         console.log(err.response.data.message);
//         dispatch({type: DELETE_TICKET_FAILURE, payload: err.response.data.message});
//     })
// }