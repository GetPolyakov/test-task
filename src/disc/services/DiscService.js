import axios from 'axios'

export default {
    getResources(path, limit) {
        return axios.get(`resources?path=${path}&limit=${limit}`)
    }
};
