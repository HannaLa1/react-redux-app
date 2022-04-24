import axios from "axios";
import authHeader from "./auth-header";
import {API_URL_USERS} from "../constants";

class UserService {
    getPublicContent() {
        return axios.get(API_URL_USERS + "all");
    }

    getUserBoard() {
        return axios.get(API_URL_USERS, { headers: authHeader() });
    }
}

export default new UserService();