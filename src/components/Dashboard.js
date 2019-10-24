import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {updateTickets} from "../actions/";
import TicketCard from "./TicketCard";
import TicketHelperCard from "./TicketHelperCard";

const Dashboard = props => {
    const [state, setState] = useState({
       showClosedTickets: true, showAssignedTickets: true, showUnassignedTickets: false
    });

    const updateTickets = props.updateTickets;

    useEffect(() => {
        updateTickets();
    }, [updateTickets])
    
    const handleCheck = e => {
        setState({...state, [e.target.name]: e.target.checked})
    }

    return (
        <div className="dashboard">
            <h3>{props.userInfo.name}'s dashboard</h3>
            {
                 props.userInfo.role === "helper" &&
                 <div class="display-options">
                    <label>
                        Show assigned Tickets
                        <input type="checkbox" name="showAssignedTickets" checked={state.showAssignedTickets} 
                            onChange={e => handleCheck(e)}/>
                    </label>
                    <label>
                        Show unassigned Tickets
                        <input type="checkbox" name="showUnassignedTickets" checked={state.showUnassignedTickets} 
                        onChange={e => handleCheck(e)}/>
                    </label>
                    <label>
                        Show answered tickets
                        <input type="checkbox" name="showClosedTickets" checked={state.showClosedTickets}
                        onChange={e => handleCheck(e)}/>
                    </label>
                 </div>
            }

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
                    {
                        state.showAssignedTickets &&
                        <div>
                            <p>Assigned tickets:</p>
                            {
                                props.assignedTickets.map((ticketInfo,idx) => 
                                    (state.showClosedTickets || !ticketInfo.solution)
                                    ? <TicketHelperCard key={`assigned${idx}`} object={ticketInfo}/>
                                    : null
                                )
                            }
                
                        </div>
                    }
                    {
                        state.showUnassignedTickets &&
                            <div>
                                <p>Unassigned tickets:</p>
                                {
                                    props.unassignedTickets.map((ticketInfo,idx) => 
                                    (state.showClosedTickets || !ticketInfo.solution)
                                    ? <TicketHelperCard key={`unassigned${idx}`} object={ticketInfo}/>
                                    : null)
                                }                
                            </div>
                    }
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