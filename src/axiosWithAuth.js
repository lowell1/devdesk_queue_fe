import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://devdesk-queue-bw.herokuapp.com/",
        headers: {
            Authorization: token
        }
    })
}