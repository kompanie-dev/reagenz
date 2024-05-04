export const myAppInitialState = {
    count: 0,
    route: ""
};

export function myAppReducer(state = myAppInitialState, action) {
    switch (action.type) {
        case "COUNT_UPDATE": {
            return { ...state, count: state.count + action.count };
        }

        case "COUNT_LOAD_SUCCESS": {
            return { ...state, count: action.count };
        }

        case "ROUTE_UPDATE": {
            return { ...state, route: action.route };
        }
    }

    return state;
}