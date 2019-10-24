import axios from "axios";

const axiosWithAuth = props => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    const userId = userInfo ? JSON.parse(userInfo).id : -1;

    return axios.create({
        baseURL: "https://devdesk-queue-bw.herokuapp.com",
        headers: {
            Authorization: token,
            id: userId
        }
    })
}

export default axiosWithAuth;