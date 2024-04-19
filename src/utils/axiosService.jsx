import axios from "axios";
import config from "../data/config.json"

export const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})