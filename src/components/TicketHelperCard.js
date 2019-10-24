import React, {useState} from "react";
import {connect} from "react-redux";
import {updateTickets} from "../actions";
import {ResolveFormik} from "./Forms";
import axiosWithAuth from "../axiosWithAuth";

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, 
    ModalHeader, ModalBody, ModalFooter,CardHeader,
    CardFooter 
  } from 'reactstrap';

  
  const TicketHelperCard = (props)=>{
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);
    
    const assignTicket = () => {
        axiosWithAuth().post(`/users/tickets/${props.object.id}/assign`)
        .then(resp => {
            console.log(resp);
            props.updateTickets();
        })
        .catch(err => {
            console.log(err.response.data.message);
        })
    }
    
    const reassignTicket = () => {
        axiosWithAuth().put(`/users/tickets/${props.object.id}/reassign`)
        .then(resp => {
            console.log(resp);
            props.updateTickets();
        })
        .catch(err => {
            console.log(err.response.data.message);
        })
    }

    const resolveTicket = resolution => {
        console.log("resolution = ", resolution);
        axiosWithAuth().put(`/users/tickets/${props.object.id}/resolve`, {solution: resolution})
        .then(resp => {
            console.log(resp);
            props.updateTickets();
        })
        .catch(err => {
            console.log(err.response.data.message);
        })
    }

    const postSolution = ()=>{
        console.log("props.object=",props.object)
        if(props.object.solution){
            return(
                <div className="text-section">
                    {/* <CardSubtitle>Solution:</CardSubtitle> */}
                    <CardText>Solution: {props.object.solution}</CardText>
                </div>
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
                    <CardSubtitle>Category:{props.object.category}</CardSubtitle>
                </CardHeader>
                <CardBody>
                    <div className="text-section">
                        <CardSubtitle>Description:</CardSubtitle>
                        <CardText>{props.object.description}</CardText>
                    </div>
                    <div className="text-section">
                        <CardSubtitle>What they tried:</CardSubtitle>
                        <CardText>{props.object.tried}</CardText>
                    </div>
                    {postSolution()}
                    <Modal isOpen={modal} toggle={toggle} className="ticketModal">
                        <ModalHeader toggle={toggle}>Resolve: {props.object.title}</ModalHeader>
                        <ModalBody>
                            <ResolveFormik resolveTicket={resolveTicket}/>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </Modal>
                </CardBody>
                <CardFooter>
                {
                        props.object.assigned &&
                        <>

                            <Button color="primary"onClick={reassignTicket}>Reassign</Button>
                      
                            <Button color="success"onClick={toggle}>Resolve Ticket</Button>
                        </>
                    }
                    {
                        props.object.assigned ||
                        <>
                            <Button color="primary" onClick={assignTicket}>Assign</Button>
                        </>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

export default connect(null, {updateTickets})(TicketHelperCard);