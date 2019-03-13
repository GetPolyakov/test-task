import { createSelector } from 'reselect';
import { ResourceType } from "../constants";

const getResources = state => state.resources.resources;

export const resourcesSelector = createSelector(
    [getResources],
    resources => {
        if (resources._embedded === undefined) {
            return resources
        } else if (resources._embedded.items.length === 0) {
            return resources
        }  else {
            const embeddedItems = [...resources._embedded.items];

            const mappedEmpeddedItems = embeddedItems.map((x) => {
                if (x.type === ResourceType.FILE) {
                    const fileSize = Math.round(x.size / 1024);
                    return {
                        ...x,
                        size: fileSize
                    }
                } else {
                    return x;
                }
            });

            return {
                ...resources,
                embedded: {
                ...resources._embedded,
                    items: mappedEmpeddedItems
                }
            }

        }
    }
)
