export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const SET_USER_INFO = "SET_USER_INFO";

export const setLoginStatus = loginStatus => {
    return {type: SET_LOGIN_STATUS, payload: loginStatus};    
}

export const setUserInfo = userInfo => {
    return {
        type: SET_USER_INFO,
        payload: userInfo
    }
}