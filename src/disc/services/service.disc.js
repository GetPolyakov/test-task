import axios from 'axios'
import { RESOURCE_TYPE } from "../constants";

export const DiscService = {
    getResources(path, limit = 40, offset = 0) {
        return axios.get(`resources?path=${path}&limit=${limit}&offset=${offset}`)
            .then((x) => {
              return x.data;
            })
    },

    mapResourcesToView(resource) {
        if (resource._embedded === undefined) {
            return resource
        } else if (resource._embedded.items.length === 0) {
            return resource
        }  else {
            const embeddedItems = resource._embedded.items;

            const mappedEmpeddedItems = embeddedItems.map((x) => {
                if (x.type === RESOURCE_TYPE.FILE) {
                    const file = {...x};
                    file.size = Math.round(file.size / 1024);
                    return file
                } else {
                    return x;
                }
            });

            resource._embedded.items = mappedEmpeddedItems;
            return resource

        }
    }
};
