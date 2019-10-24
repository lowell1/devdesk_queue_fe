import React from 'react';
import './App.css';
import {Route, NavLink} from "react-router-dom";
import {ConnectLoginFormik, RegisterFormik} from "./components/Forms";
import PrivateRoute from "./components/PrivateRoute";
import SignOut from "./components/SignOut";
import TicketMaker from "./components/TicketMaker";
import Dashboard from "./components/Dashboard";
import {connect} from "react-redux";
import {setLoginStatus} from "./actions";
import {setUserInfo} from "./actions";

function App(props) {
  props.setLoginStatus(localStorage.getItem("token") !== null);
  props.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

  return (
    <div className="App">
      <div className="links">
        {
          props.loginStatus ?
          <ul>
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/sign_out">Sign out</NavLink>
            </li>
            <li>
              <NavLink to="/new_ticket">Create new ticket</NavLink>
            </li>
          </ul>
          :
          (
          <ul>
            <li>
            <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
          )
        }
      </div>

      <Route path="/login" component={ConnectLoginFormik}/>
      <Route path="/sign_out" component={SignOut}/>
      <Route path="/register" component={RegisterFormik}/>
      <PrivateRoute path="/new_ticket" component={TicketMaker}/>
      <PrivateRoute exact path="/" component={Dashboard}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {loginStatus: state.loginStatus};
}

export default connect(mapStateToProps, {setLoginStatus, setUserInfo})(App);
// export default App;