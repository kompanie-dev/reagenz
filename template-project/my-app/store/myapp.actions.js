export const increaseCounter = (count) => ({ type: "COUNT_UPDATE", count });



export const loadCountRequest = () => ({ type: "COUNT_LOAD_REQUEST" });

export const loadCountSuccess = (count) => ({ type: "COUNT_LOAD_SUCCESS", count });

export const saveCountRequest = () => ({ type: "COUNT_SAVE_REQUEST" });

export const saveCountSuccess = (count) => ({ type: "COUNT_SAVE_SUCCESS", count });



export const updateRoute = (route) => ({ type: "ROUTE_UPDATE", route });
