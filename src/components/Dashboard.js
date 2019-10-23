import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {updateTickets} from "../actions/";
import TicketCard from "./TicketCard";

const Dashboard = props => {
    const [state, setState] = useState({showOpenTickets: true, showClosedTickets: false})
    const updateTickets = props.updateTickets;

    useEffect(() => {
        updateTickets();
    }, [updateTickets])
    
    const handleCheck = e => {
        setState({...state, [e.target.name]: e.target.checked})
    }

    return (
        <div className="dashboard">
            <h3>Hello {props.userInfo.name}</h3>
            <label>
               <input type="checkbox" name="showOpenTickets" checked={state.showOpenTickets} onChange={e => handleCheck(e)}/>Show open tickets
            </label><br></br>
            <label>
                <input type="checkbox" name="showClosedTickets" checked={state.showClosedTickets} onChange={e => handleCheck(e)}/>Show closed tickets
            </label>
            {
                state.showOpenTickets &&
                <div className="ticket-list">
                    <p>Open tickets:</p>    
                    {props.openTickets.map(ticketInfo => <TicketCard object={ticketInfo}/>)}
                </div>
            }
            {
                state.showClosedTickets &&
                <div className="ticket-list">
                    <p>Closed tickets:</p>    
                    {props.closedTickets.map(ticketInfo => <TicketCard object={ticketInfo}/>)}
                </div>
            }
            {state.showClosedTickets && <p>Closed tickets:</p>}
        </div>
    )
}

const mapStateToProps = state => {
    return {userInfo: state.userInfo, openTickets: state.openTickets, closedTickets: state.closedTickets};
}

export default connect(mapStateToProps, {updateTickets})(Dashboard);