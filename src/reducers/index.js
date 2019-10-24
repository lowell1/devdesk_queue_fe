import {
    SET_LOGIN_STATUS,
    SET_USER_INFO,
    FETCH_TICKETS_START,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE,
    // DELETE_TICKET_START,
    // DELETE_TICKET_FAILURE,
    // DELETE_TICKET_SUCCESS
} from "../actions";

const initialState = {
    loginStatus: false,
    userInfo: {},
    //tickets to show to users
    closedTickets: [],
    openTickets: [],
    //tickets to show to helpers
    assignedTickets: [],
    unassignedTickets: [],
    isFetchingTickets: false,
    ticketsFetchError: "",
    isDeletingTicket: false,
    deleteTicketError: ""
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
            return {
                ...state, 
                isFetchingTickets: false, 
                openTickets: action.payload.openTickets, 
                closedTickets: action.payload.closedTickets,
                assignedTickets: action.payload.assignedTickets,
                unassignedTickets: action.payload.unassignedTickets
            };
        // case DELETE_TICKET_START:
        //     return {...state, isDeletingTicket: true, deleteTicketError: ""}
        // case DELETE_TICKET_SUCCESS:
        //     const stateCopy = {...state}
        //     const ticketIdx = action.payload.isTicketOpen ? 
        //                         state.openTickets.findIndex(ticket => action.payload.ticketId) :
        //                         state.closedTickets.findIndex(ticket => action.payload.ticketId);

        //     action.paylod.isTicketOpen ?
        //     stateCopy.openTickets.splice(ticketIdx, 1):
        //     stateCopy.closedTickets.splice(ticketIdx, 1);
        //     return stateCopy;
        // case DELETE_TICKET_FAILURE:
        //     return {...state, isDeletingTicket: false, deleteTicketError: action.payload};
        default:
            return state;
    }
}

export default rootReducer;