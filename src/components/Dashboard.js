import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {updateTickets} from "../actions/";
import TicketCard from "./TicketCard";
import TicketHelperCard from "./TicketHelperCard";

const Dashboard = props => {
    // const [state, setState] = useState({
    //     showOpenTickets: true, showClosedTickets: false, showAssignedTickets: true, showUnassignedTickets: false
    // });

    const updateTickets = props.updateTickets;

    useEffect(() => {
        updateTickets();
    }, [updateTickets])
    
    // const handleCheck = e => {
    //     setState({...state, [e.target.name]: e.target.checked})
    // }

    return (
        <div className="dashboard">
            <h3>{props.userInfo.name}'s dashboard</h3>
            {/* <label>
               <input type="checkbox" name="showOpenTickets" checked={state.showOpenTickets} onChange={e => handleCheck(e)}/>Show open tickets
            </label><br/><br/>
            <label>
                <input type="checkbox" name="showClosedTickets" checked={state.showClosedTickets} onChange={e => handleCheck(e)}/>Show closed tickets
            </label><br/><br/> */}
            {/* {
                props.userInfo.role === "helper" &&
                <>
                    <label>
                        <input type="checkbox" name="showAssignedTickets" checked={state.showAssignedTickets} onChange={e => handleCheck(e)}/>Show assigned Tickets
                    </label><br/><br/>
                </>
            }
            {
                props.userInfo.role === "helper" &&
                <>
                    <label>
                        <input type="checkbox" name="showUnassignedTickets" checked={state.showUnassignedTickets} onChange={e => handleCheck(e)}/>Show unassigned Tickets
                    </label><br/><br/>
                </>
            }
            {
                state.showOpenTickets &&
                props.userInfo.role === "student" &&
                <div className="ticket-list">
                    <p>Open tickets:</p>    
                    {props.openTickets.map((ticketInfo,idx) => <TicketCard key={idx} object={ticketInfo}/>)}
                </div>
            }
            {
                state.showClosedTickets &&
                props.userInfo.role === "student" &&
                <div className="ticket-list">
                    <p>Closed tickets:</p>    
                    {props.closedTickets.map((ticketInfo,idx) => <TicketCard key={idx} object={ticketInfo}/>)}
                </div>
            }
            {
                state.showC
            } */}

            {
                props.userInfo.role === "student" &&
                <div className="ticket-list">
                    <div>
                        <p>Open tickets:</p>    
                        {props.openTickets.map((ticketInfo,idx) => <TicketCard key={`open${idx}`} object={ticketInfo}/>)}
                    </div>
                    <div>
                        <p>Closed tickets:</p>    
                        {props.closedTickets.map((ticketInfo,idx) => <TicketCard key={`closed${idx}`} object={ticketInfo}/>)}
                    </div>
                </div>
            }
            {
                props.userInfo.role === "helper" &&
                <div className="ticket-list">
                    <div>
                        <p>Assigned tickets:</p>
                        {/* change to TicketHelperCard */}
                        {props.assignedTickets.map((ticketInfo,idx) => <TicketHelperCard key={`assigned${idx}`} object={ticketInfo}/>)}
                    </div>
                    <div>
                        <p>Unassigned tickets:</p>
                        {props.unassignedTickets.map((ticketInfo,idx) => <TicketHelperCard key={`unassigned${idx}`} object={ticketInfo}/>)}
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        openTickets: state.openTickets, 
        closedTickets: state.closedTickets,
        assignedTickets: state.assignedTickets,
        unassignedTickets: state.unassignedTickets
    };
}

export default connect(mapStateToProps, {updateTickets})(Dashboard);