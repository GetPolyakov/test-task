import axios from 'axios'

export const DiscService = {
    getResources(path, limit = 40, offset = 0) {
        return axios.get(`resources?path=${path}&limit=${limit}&offset=${offset}`)
            .then((x) => {
              return x.data;
            })
    },
};
