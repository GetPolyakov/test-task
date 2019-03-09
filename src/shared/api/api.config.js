import axios from "axios";
import { history } from "../../index";
import LocalStorageService from '../services/LocalStorageService'

axios.defaults.baseURL = 'https://cloud-api.yandex.net/v1/disk/';
axios.defaults.withCredentials = false;
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
    const token = LocalStorageService.getItem('token');
    if (token) {
        config.headers['Authorization'] = token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


const UNAUTHORIZED_CODE = 401;
axios.interceptors.response.use(function (response) {
    return response;
}, function (e) {

    if (e.response.status === UNAUTHORIZED_CODE) {
        history.push('/login')
    }
    return Promise.reject(e);
});

