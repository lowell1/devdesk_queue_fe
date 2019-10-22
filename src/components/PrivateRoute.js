import React from "react";
import {Route, Redirect} from "react-router-dom";
import {reactLocalStorage} from "reactjs-localstorage";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (<Route {...rest} render={
        props => reactLocalStorage.get("token") ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/login"/>
        )
    }/>);
}

export default PrivateRoute;