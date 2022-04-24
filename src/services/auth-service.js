import axios from "axios";
import {API_URL_AUTH} from "../constants";


class AuthService {
    signIn(email, password) {
        return axios
            .post(API_URL_AUTH + "signIn", { email, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    signUp(username, password, confirmPassword, email, firstName, lastName, imageUrl) {
        return axios.post(API_URL_AUTH + "signUp", {
            username,
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
            imageUrl
        });
    }
}

export default new AuthService();