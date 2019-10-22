import React from 'react';
import './App.css';
import {Route, Link} from "react-router-dom";
import {connectLoginFormik as loginFormik,registerFormik} from "./components/Forms";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import SignOut from "./components/SignOut";
import {connect} from "react-redux";
import {setLoginStatus} from "./actions";

function App(props) {
  props.setLoginStatus(localStorage.getItem("token") !== null);

  return (
    <div className="App">
        {
          props.loginStatus ?
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/sign_out">Sign out</Link>
            </li>
          </ul>
          :
          (
          <ul>
            <li>
            <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
          )
        }

      <Route path="/login" component={loginFormik}/>
      <Route path="/sign_out" component={SignOut}/>
      <Route path="/register" component={registerFormik}/>
      <PrivateRoute exact path="/" component={Dashboard}/>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("state =", state);
  return {loginStatus: state.loginStatus};
}

export default connect(mapStateToProps, {setLoginStatus})(App);
// export default App;