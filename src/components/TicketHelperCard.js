import React, {useState} from "react";
import {connect} from "react-redux";
import {updateTickets} from "../actions";
import {ResolveFormik} from "./Forms";

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, 
    ModalHeader, ModalBody, ModalFooter 
  } from 'reactstrap';

const TicketHelperCard = (props)=>{
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return(
        <div>
            <Card>
                <CardBody>
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
                    {
                        props.object.assigned &&
                        <>
                            <Button>Reassign</Button>
                            <Button onClick={toggle}>Resolve Ticket</Button>
                        </>
                    }
                    {
                        props.object.assigned ||
                        <>
                            <Button>Assign</Button>
                        </>
                    }
                    <Modal isOpen={modal} toggle={toggle} className="ticketModal">
                        <ModalHeader toggle={toggle}>Resolve: {props.object.title}</ModalHeader>
                        <ModalBody>
                            <ResolveFormik/>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </Modal>
                </CardBody>
            </Card>
        </div>
    )
}

export default connect(null, updateTickets)(TicketHelperCard);