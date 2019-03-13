import { DiscActionTypes } from "./action.types";
import { DiscService } from "../services/service.disc";
import {NOT_FOUND_CODE, UNAUTHORIZED_CODE} from "../../auth/constants";

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
        catch (e) {
            if (e.response !== undefined) {
                const responseStatus = e.response.status;
                if (responseStatus === UNAUTHORIZED_CODE) {
                    dispatch(failed('Unauthorized'));
                    return;
                }
                if (responseStatus === NOT_FOUND_CODE) {
                    dispatch(failed('Resource not found'));
                    return;
                }
            }
            dispatch(failed('Something went wrong, please make sure you have stable connection to the internet.'));
            throw e
        }
    }
}
