import React from 'react';
import './App.css';
import {Route, Link} from "react-router-dom";
import {loginFormik,registerFormik} from "./components/Forms";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {/* <li>
          <Link to="/dashboard">Dashboard</Link>
        </li> */}
      </ul>

      <Route path="/login" component={loginFormik}/>
      <Route path="/register" component={registerFormik}/>
      <PrivateRoute exact path="/" component={Dashboard}/>
    </div>
  );
}

export default App;
