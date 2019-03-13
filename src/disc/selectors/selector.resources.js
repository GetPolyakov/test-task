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
            const embeddedItems = resources._embedded.items;

            const mappedEmpeddedItems = embeddedItems.map((x) => {
                if (x.type === ResourceType.FILE) {
                    const file = {...x};
                    file.size = Math.round(file.size / 1024);
                    return file
                } else {
                    return x;
                }
            });

            resources._embedded.items = mappedEmpeddedItems;
            return resources

        }
    }
)
