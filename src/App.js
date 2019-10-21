import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import {loginFormik,registerFormik} from "./components/Forms"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={loginFormik}/>
      <Route path="/register" component={registerFormik}/>
    </div>
  );
}

export default App;
