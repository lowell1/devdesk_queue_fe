import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {updateTickets} from "../actions/";

const Dashboard = props => {
    const [state, setState] = useState({showOpenTickets: true, showClosedTickets: false})
    const updateTickets = props.updateTickets;

    useEffect(() => {
        updateTickets();
    }, [updateTickets])
    
    const handleCheck = e => {
        setState({...state, [e.target.name]: e.target.checked})
    }
    console.log(props.tickets);

    return (
        <div className="dashboard">
            <h3>Hello {props.userInfo.name}</h3>
            <label>
               <input type="checkbox" name="showOpenTickets" onChange={e => handleCheck(e)}/>Show open tickets
            </label><br></br>
            <label>
                <input type="checkbox" name="showClosedTickets" onChange={e => handleCheck(e)}/>Show closed tickets
            </label>
        </div>
    )
}

const mapStateToProps = state => {
    return {userInfo: state.userInfo, tickets: state.tickets};
}

export default connect(mapStateToProps, {updateTickets})(Dashboard);