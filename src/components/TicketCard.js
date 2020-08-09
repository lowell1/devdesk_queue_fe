import React from "react";
import {connect} from "react-redux";
// import {deleteTicket} from "../actions";
import {updateTickets} from "../actions";
import axiosWithAuth from "../axiosWithAuth";

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button,CardHeader,
    CardFooter
  } from 'reactstrap';

const TicketCard = (props)=>{
    const deleteTicket = () => {
        axiosWithAuth().delete(`/users/tickets/${props.object.ticket_id}`)
        .then(resp => {
            console.log(resp);
            props.updateTickets();
        })
        .catch(err => {
            console.log(err.response.data.message);
        })

    }


    const postSolution = ()=>{
        if(props.object.solution){
            return(
                <CardBody>
                    <CardSubtitle>Solution:</CardSubtitle> 
                    <CardText>{props.object.solution}</CardText>
                </CardBody>
            )
        } else{
            return(
                <CardText>There is no solution currently.</CardText>
            )
        }
    }

    return(
        <div className="ticket">
            <Card>
                <CardHeader>
                    <CardTitle>{props.object.title}</CardTitle>
                    <CardSubtitle>Category: {props.object.category}</CardSubtitle>
                </CardHeader>
                <CardBody>
                    {/* <Button onClick={() => props.deleteTicket(props.object.id, props.object.resolved)}>Delete</Button> */}
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
                <CardFooter>
                    <Button color="danger" onClick={() => deleteTicket()}>Delete</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

// export default connect(null, {deleteTicket})(TicketCard);
export default connect(null, {updateTickets})(TicketCard);