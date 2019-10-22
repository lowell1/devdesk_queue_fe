import React from "react";
import {Route, Redirect} from "react-router-dom";


const PrivateRoute = ({component: Component, ...rest}) => {
    if(localStorage.getItem("token"))
        console.log("true");
        else console.log("false");
    return (<Route {...rest} render={
        props => localStorage.getItem("token") ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/login"/>
        )
    }/>);
}
// const PrivateRoute = ({component: Component, ...rest}) => {
//     return (<Route {...rest} render={
//         props => localStorage.getItem("token") ? (
//             <Component {...props}/>
//         ) : (
//             <Redirect to="/login"/>
//         )
//     }/>);
// }

export default PrivateRoute;