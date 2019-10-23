import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {withFormik, Form, Field} from "formik";
import {connect} from "react-redux";
import {setLoginStatus} from "../actions";
import * as Yup from "yup";
// import axios from "axios";
import axiosWithAuth from "../axiosWithAuth";
// import {reactLocalStorage} from "reactjs-localstorage";

const LoginForm = ({ values, touched, errors, status }) =>{
    // const [loginData,setLoginData] = useState([]);
    // useEffect(() => {
    //     status && setLoginData(loginData => [...loginData, status])
    //   },[status])
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
                <button type="submit">Submit!</button>
            </Form>
            <Link to="/register">Create new account.</Link>

            {/* {loginData.map(user => (
                <ul key={user.id}>
                <li>Name: {user.username}</li>
                <li>Password: {user.password}</li>
                </ul>
            ))} */}

        </div>
    )
}
const LoginFormik = withFormik({
    mapPropsToValues({ username, password}) {
      return {
        username: username || "",
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password:Yup.string().required()
      }),
    handleSubmit(values, {setStatus, props}) { 
        // axios.post('https://reqres.in/api/users/', values) 
        //       .then(res => { 
        //           setStatus(res.data); 
        //           console.log(res.data);
        //         }) 
        //       .catch(err => console.log(err.response));
        // }
        axiosWithAuth().post("/auth/login", values)
        .then(resp => {
            // console.log("Success:", resp.data);
            console.log(resp.data);
            localStorage.setItem("userInfo", JSON.stringify({name: resp.data.username, role: resp.data.role, id: resp.data.id}));
            localStorage.setItem("token", resp.data.token);
            props.setLoginStatus(true);
            props.history.push("/");
        })
        .catch(err => {
            console.log("Error:",err);
        })
    }
  })(LoginForm);

  const RegisterForm = ({ values, touched, errors, status }) =>{
    const [registerData,setRegisterData] = useState([]);
    useEffect(() => {
        status && setRegisterData(registerData => [...registerData, status])
      },[status])
    return(
        <div className="registerForm">
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
                <br/><br/>
                <Field component="select" className="role-select" name="role">
                    <option>Choose a role.</option>
                    <option value="student">Student</option>
                    <option value="helper">Helper</option>
                </Field>
                {touched.role && errors.role && (
                    <p className="error">{errors.role}</p>
                )}
                <br/><br/>
                <button type="submit">Create Account</button>
            </Form>
        </div>
    )
}
const RegisterFormik = withFormik({
    mapPropsToValues({ username, password,role}) {
      return {
        username: username || "",
        password: password || "",
        role: role || ""
      };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password:Yup.string().required(),
        role:Yup.string().required()
      }),
      handleSubmit(values, {setStatus, props}) { 
          console.log("values = ", values);
        axiosWithAuth().post("/auth/register", values)
        .then(resp => {
            console.log(resp.data);
            props.history.push("/login");
        })
        .catch(err => {
            console.log("Error:",err.response.data.message);
        })
    }
  })(RegisterForm);

  const TicketForm = ({ values, touched, errors, status }) =>{
    const [registerData,setRegisterData] = useState([]);
    useEffect(() => {
        status && setRegisterData(registerData => [...registerData, status])
      },[status])
    return(
        <div className="ticketForm">
            <Form>
                
                    <Field type="text" name="title" placeholder="Title"/>
                {touched.title && errors.title && (
                    <p className="error">{errors.title}</p>
                )}
                    <Field type="text" name="description" placeholder="Description of your problem"/>
                {touched.description && errors.description && (
                    <p className="error">{errors.description}</p>
                )}
                <Field type="text" name="tried"placeholder="What have you tried?"/>
                {touched.tried && errors.tried && (
                    <p className="error">{errors.tried}</p>
                )}
                <Field component="select" className="category-select" name="category">
                    <option value="">Choose a category.</option>
                    <option value="React">React</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Redux">Redux</option>
                    <option value="Node">Node</option>
                    <option value="Javascript">Javascript</option>
                </Field>
                {
                    touched.category && errors.category && (
                        <p className="error">{errors.category}</p>
                    )
                }
                <button type="submit">Create new ticket.</button>
            </Form>


        </div>
    )
}
const TicketFormik = withFormik({
    mapPropsToValues({ title, description,tried,category}) {
      return {
        title: title || "",
        description: description || "",
        tried: tried || "",
        category: category || ""
      };
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required(),
        description:Yup.string().required(),
        tried: Yup.string().required(),
        category: Yup.string().required()
      }),
      handleSubmit(values) {
          console.log(values);
          axiosWithAuth().post("/tickets", values)
          .then((resp) => {
              console.log("success", resp);
          })
          .catch((err) => {
              console.log("Failed to send ticket: ", err.response.data.message);
          });
      }
  })(TicketForm);


const ConnectLoginFormik = connect(null, {setLoginStatus})(LoginFormik);

export {
    ConnectLoginFormik,
    RegisterFormik,
    TicketFormik
};