import { DiscActionTypes } from "./action.types";
import { DiscService } from "../services/service.disc";

function started() {
    return {
        type: DiscActionTypes.FETCH_RESOURCES_STARTED
    }
}

function failed(error) {
    return {
        type: DiscActionTypes.FETCH_RESOURCES_FAILED,
        error: error
    }
}

function successed(resources) {
    return {
        type: DiscActionTypes.FETCH_RESOURCES_SUCCESSED,
        payload: resources
    }
}

export function fetchResources(resourcePath, limit) {
    return async dispatch => {
        try {
            dispatch(started());
            const resources = await DiscService.getResources(resourcePath, limit);
            dispatch(successed(resources));
        }
        catch (e) {
            dispatch(failed('Something went wrong, please make sure you have stable connection to the internet.'));
            throw e;
        }
    }
}
