import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setLoginStatus} from "../actions";

const SignOut = props => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  props.setLoginStatus(false);
  return (<Redirect to="/login"/>);
}

export default connect(null, {setLoginStatus})(SignOut);