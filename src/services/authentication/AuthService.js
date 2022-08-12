import {ACCESS_TOKEN, BASE_URL} from "../../constants";
import {request} from "../../util/UtilsAPI";

export function signIn(signInRequest) {
    return request({
        url: BASE_URL + "/users/auth/signIn",
        method: 'POST',
        body: JSON.stringify(signInRequest)
    });
}

export function signUp(signUpRequest) {
    return request({
        url: BASE_URL + "/users/auth/signUp",
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: BASE_URL + "/users/me",
        method: 'GET'
    });
}

export function recoveryPassword(id, recoveryRequest) {
    return request({
        url:BASE_URL + "/users/mail/" + id + "/recovery-password",
        method: 'GET',
    });
}

export function resetPassword(resetRequest) {
    return request({
        url:BASE_URL + "/users/mail/reset-password",
        method: 'PUT',
        body: JSON.stringify(resetRequest)
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: BASE_URL + "/users/auth/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

