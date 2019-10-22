import axiosWithAuth from "../axiosWithAuth";

// export const LOGIN_START = "LOGIN_START";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "LOGIN_FAILURE";

// export const login = (credentials) => {
//     dispatch({type: LOGIN_START});

//     axiosWithAuth().post("/auth/login", credentials)
//         .then(resp => {
//             localStorage.setItem("token", resp.data.token);
//             props.history.push("/");
//             dispatch({type: LOGIN_SUCCESS});
//         })
//         .catch(err => {
//             console.log("Error:",err);
//             dispatch({type: LOGIN_FAILURE});
//         })
// }