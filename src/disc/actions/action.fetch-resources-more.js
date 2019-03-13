import { DiscActionTypes } from "./action.types";
import { DiscService } from "../services/service.disc";

function started() {
    return {
        type: DiscActionTypes.FETCH_RESOURCES_MORE_STARTED
    }
}

function failed(error) {
    return {
        type: DiscActionTypes.FETCH_RESOURCES_MORE_FAILED,
        error: error
    }
}

function successed(resources) {
    return {
        type: DiscActionTypes.FETCH_RESOURCES_MORE_SUCCESSED,
        payload: resources
    }
}

export function fetchResourcesMore(resourcePath, limit, offset) {
    return async dispatch => {
        try {
            dispatch(started());
            const resources = await DiscService.getResources(resourcePath, limit, offset);
            dispatch(successed(resources));
        }
        catch (error) {
            dispatch(failed(error.response.data));
            throw error.response.data;
        }
    }
}
