import React from "react";
import Dashboard from "./Dashboard"
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const TicketCard = (props)=>{
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

export default TicketCard;