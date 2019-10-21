import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";

const LoginForm = ({ values, touched, errors, status }) =>{
    const [loginData,setLoginData] = useState([]);
    useEffect(() => {
        status && setLoginData(loginData => [...loginData, status])
      },[status])
    return(
        <div className="loginForm">
            <Form>
                <label>
                    <h2>Username:</h2>
                    <Field type="text" name="username"/>
                </label>
                {touched.username && errors.username && (
                    <p className="error">{errors.username}</p>
                )}
                <label>
                    <h2>Password:</h2>
                    <Field type="password" name="password"/>
                </label>
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
            </Form>
            <button type="submit">Submit!</button>
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
        username: Yup.string().required(),
        password:Yup.string().required()
      })
  })(LoginForm);




export {loginFormik};