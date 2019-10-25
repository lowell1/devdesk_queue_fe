import React, {useState} from "react";
// import TicketCard from "./TicketCard"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {TicketFormik} from "./Forms";

const TicketMaker = () => {
    // const testObj = {
    //    title: 'Send Help',
    //     description: 'I dont know what to do',
    //     tried: 'I tried to do something',
    //     category: 'HTML',
    //     resolved: true,
    //     solution:'I found something that helped',
    //     assigned: false
    // }; 
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <div className="middle-screen ticket-maker">
            <h1>Open new ticket</h1>
            {/* <TicketCard object={testObj}/> */}
            <Button onClick={toggle}>Create Ticket</Button>
            <Modal isOpen={modal} toggle={toggle} className="ticketModal">
                <ModalHeader toggle={toggle}>Create a Ticket</ModalHeader>
                <ModalBody>
                    <TicketFormik/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default TicketMaker;