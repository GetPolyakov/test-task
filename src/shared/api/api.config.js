import axios from "axios";
import { AuthService } from "../../auth/services/service.auth";
import { UNAUTHORIZED_CODE } from "../../auth/constants";

axios.defaults.baseURL = 'https://cloud-api.yandex.net/v1/disk/';
axios.defaults.withCredentials = false;
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
    const token = AuthService.getToken();
    if (token) {
        config.headers['Authorization'] = token
    } else {
        config.headers['Authorization'] = null
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
    return response;
}, function (e) {

    if (e.response.status === UNAUTHORIZED_CODE) {
        AuthService.removeToken();
        AuthService.redirectToLogin();
    }
    return Promise.reject(e);
});

