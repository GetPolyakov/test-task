export const getQueryParams = (queryParamsString) => { //оптимизировать не безопасный код
    if (queryParamsString.length === 0) {
        return [];
    }

    if (!queryParamsString.includes('=')) {
        return [];
    }
        const queryParamsArr = queryParamsString.split('&');

        return queryParamsArr.reduce((acc, stringQueryParam, index) => {
            const queryParamArray = stringQueryParam.split('=');
            const queryParam = {};
            queryParam[queryParamArray[0]] = queryParamArray[1];
            acc.push(queryParam);
            return acc;
        }, [])

}
