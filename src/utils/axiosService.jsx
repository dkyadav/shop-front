import axios from "axios";
import config from "../data/config.json"

export const authAxios = axios.create({
    baseURL: config.baseurl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})