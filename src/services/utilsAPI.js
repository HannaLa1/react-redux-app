import http from "./http-common";
import authHeader from "./auth-header";

class UtilsAPIService {
    signUp(username, password, confirmPassword, email, firstName, lastName, imageUrl) {
        return http.post( "/auth/signUp", {
            username,
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
            imageUrl
        })
    }

    signIn(email, password) {
        return http
            .post("/auth/signIn",
                { email, password })
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

    getPublicContent() {
        return http.get("/admins/users");
    }

    getUserBoard(id) {
        return http.get(`/tutorials/${id}`, { headers: authHeader() });
    }
}

export default new UtilsAPIService();