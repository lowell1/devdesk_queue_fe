export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";

export const setLoginStatus = loginStatus => {
    return {type: SET_LOGIN_STATUS, payload: loginStatus};    
}