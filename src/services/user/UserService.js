import {request} from "../../util/UtilsAPI";
import {BASE_URL} from "../../constants";

export function personalAccount(id) {
    return request({
        url: BASE_URL + "/users/" + id,
        method: 'GET'
    });
}

export function updatePersonalInfo(updateRequest) {
    return request({
        url:BASE_URL + "/users/" + Number(updateRequest.id) + "/update-info",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}