import axios from 'axios'

export default {
    getResources(token, path, limit) {
        return axios.get(`resources?path=${path}&limit=${limit}`)
    }
};
