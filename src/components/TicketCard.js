import React from "react";
import {connect} from "react-redux";
// import {deleteTicket} from "../actions";
import {updateTickets} from "../actions";
import axiosWithAuth from "../axiosWithAuth";

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const TicketCard = (props)=>{
    const deleteTicket = () => {
        axiosWithAuth().delete(`/users/tickets/${props.object.id}`)
        .then(resp => {
            console.log(resp);
        })
        .catch(err => {
            console.log(err.response.data.message);
        })

        props.updateTickets();
    }


    const postSolution = ()=>{
        if(props.object.resolved === true){
            return(
                <div className="text-section">
                    <CardSubtitle>Solution:</CardSubtitle>
                    <CardText>{props.object.solution}</CardText>
                </div>
            )
        } else{
            return(
                <CardText>There is no solution currently.</CardText>
            )
        }
    }

    return(
        <div>
            <Card>
                <CardBody>
                    {/* <Button onClick={() => props.deleteTicket(props.object.id, props.object.resolved)}>Delete</Button> */}
                    <Button onClick={() => deleteTicket()}>Delete</Button>
                    <CardTitle>{props.object.title}</CardTitle>
                    <CardSubtitle>Category:{props.object.category}</CardSubtitle>
                    <div className="text-section">
                        <CardSubtitle>Description:</CardSubtitle>
                        <CardText>{props.object.description}</CardText>
                    </div>
                    <div className="text-section">
                        <CardSubtitle>What they tried:</CardSubtitle>
                        <CardText>{props.object.tried}</CardText>
                    </div>
                    {postSolution()}
                </CardBody>
            </Card>
        </div>
    )
}

// export default connect(null, {deleteTicket})(TicketCard);
export default connect(null, {updateTickets})(TicketCard);