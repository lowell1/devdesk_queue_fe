import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import {loginFormik} from "./components /Forms"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={loginFormik}/>
      <Route path="/register" />
    </div>
  );
}

export default App;
