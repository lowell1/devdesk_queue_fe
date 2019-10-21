import React, {useState} from "react";
import {Link} from "react-router-dom";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";

const loginForm = ({ values, touched, errors, status }) =>{
    
    return(
        <div className="loginForm">
            <Form>
                <label>
                    <h2>Username:</h2>
                    <Field type="text" name="username"/>
                </label>
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <label>
                    <h2>Password:</h2>
                    <Field type="text" name="password"/>
                </label>
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
            </Form>
            <Link to="/register">Create new account.</Link>

        </div>
    )
}
const loginFormik = withFormik({
    mapPropsToValues({ username, password}) {
      return {
        username: username || "",
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        password:Yup.string().required()
      })
  })(loginForm);




export {loginFormik};