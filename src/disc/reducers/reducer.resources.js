import { DiscActionTypes } from "../actions/action.types";
import { ResourceType } from "../constants";

const initialState = {
    resources: {},
    offset: 0,
    limit: 40,
    isLoading: true,
    isScrollLoading: false,
    hasMoreRecords: false,
}

export function resources (state = initialState, action) {
    switch (action.type) {
        case DiscActionTypes.FETCH_RESOURCES_STARTED: {
            return {
                ...state,
                isLoading: true
            }
        }

        case DiscActionTypes.FETCH_RESOURCES_FAILED: {
            return {
                ...state,
                isLoading: false
            }
        }

        case DiscActionTypes.FETCH_RESOURCES_SUCCESSED: {
            const resources = action.payload;

            if (resources.type === ResourceType.FOLDER) {
                const total = resources._embedded.total;
                const embeddedItems = resources._embedded.items;

                if (embeddedItems.length < total) {
                        return {
                            ...state,
                            offset: state.offset + state.limit,
                            hasMoreRecords: true,
                            isLoading: false,
                            resources,
                        }
                } else {
                    return {
                        ...state,
                        resources,
                        hasMoreRecords: false,
                        isLoading: false
                    }
                }

            } else {
                return {
                    ...state,
                    resources,
                    hasMoreRecords: false,
                    isLoading: false,
                }
            }
        }

        case DiscActionTypes.FETCH_RESOURCES_MORE_STARTED: {
            return {
                ...state,
                isScrollLoading: true
            }
        }

        case  DiscActionTypes.FETCH_RESOURCES_MORE_FAILED: {
            return {
                ...state,
                isScrollLoading: false
            }
        }

        case DiscActionTypes.FETCH_RESOURCES_MORE_SUCCESSED: {
            const resources = action.payload;

            if (resources.type === ResourceType.FOLDER) {
                const total = resources._embedded.total;
                const embeddedItems = resources._embedded.items;
                resources._embedded.items = state.resources._embedded.items.concat(embeddedItems);
                if (embeddedItems.length < total) {
                    return {
                        ...state,
                        resources,
                        offset: state.offset + state.limit,
                        hasMoreRecords: true,
                        isScrollLoading: false,
                    }
                } else {
                    return {
                        ...state,
                        resources,
                        hasMoreRecords: false,
                        isScrollLoading: false
                    }
                }

            } else {
                return {
                    ...state,
                    resources,
                    hasMoreRecords: false,
                    isScrollLoading: false
                }
            }
        }

        default: return state;
    }
}
