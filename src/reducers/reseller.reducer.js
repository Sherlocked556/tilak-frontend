import { resellerConstant } from "../actions/constants";

const initState = {
    resellerOrders: [],
    adminResellers: [],
    loading: false,
    resellerDetails: {},
    requests: [],
    resellerRequests: [],
    requestDetails: {},
    error: null,
};

export const resellerReducer = (state = initState, action) => {
    switch (action.type) {
        case resellerConstant.ADD_RESELLER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case resellerConstant.DELETE_RESELLER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case resellerConstant.FETCH_SINGLE_RESELLER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case resellerConstant.FETCH_ALL_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case resellerConstant.CREATE_RESELLER_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case resellerConstant.FETCH_REQUEST_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case resellerConstant.UPDATE_RESELLER_REQUEST_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case resellerConstant.FETCH_ALL_RESELLERS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case resellerConstant.FETCH_RESELLER_REQUEST_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case resellerConstant.ADD_RESELLER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case resellerConstant.DELETE_RESELLER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case resellerConstant.FETCH_SINGLE_RESELLER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case resellerConstant.FETCH_ALL_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case resellerConstant.CREATE_RESELLER_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case resellerConstant.FETCH_REQUEST_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }

        case resellerConstant.UPDATE_RESELLER_REQUEST_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }

        case resellerConstant.FETCH_ALL_RESELLERS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }

        case resellerConstant.FETCH_RESELLER_REQUEST_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }

        case resellerConstant.ADD_RESELLER_SUCCESS: {
            return {
                ...state,
                adminResellers: [
                    ...state.adminResellers,
                    action.payload.reseller,
                ],
                loading: false,
                error: null,
            };
        }

        case resellerConstant.DELETE_RESELLER_SUCCESS: {
            return {
                ...state,
                adminResellers: state.adminResellers.filter(
                    (reseller) => reseller._id !== action.payload.reseller
                ),
                loading: false,
                error: null,
            };
        }

        case resellerConstant.CREATE_RESELLER_REQUEST_SUCCESS: {
            return {
                ...state,
                requests: [...state.requests, action.payload.request],
                resellerRequests: [
                    ...state.resellerRequests,
                    action.payload.request,
                ],
                loading: false,
                error: null,
            };
        }

        case resellerConstant.FETCH_ALL_REQUEST_SUCCESS: {
            return {
                ...state,
                requests: action.payload.requests,
                loading: false,
                error: null,
            };
        }

        case resellerConstant.FETCH_ALL_RESELLERS_SUCCESS: {
            return {
                ...state,
                adminResellers: action.payload.resellers,
                loading: false,
                error: null,
            };
        }

        case resellerConstant.FETCH_REQUEST_SUCCESS: {
            return {
                ...state,
                requests: action.payload.requests,
                loading: false,
                error: null,
            };
        }

        case resellerConstant.FETCH_RESELLER_REQUEST_SUCCESS: {
            return {
                ...state,
                resellerRequests: action.payload.request,
                loading: false,
                error: null,
            };
        }

        case resellerConstant.FETCH_SINGLE_RESELLER_SUCCESS: {
            return {
                ...state,
                resellerDetails: action.payload.reseller,
                loading: false,
                error: null,
            };
        }

        case resellerConstant.UPDATE_RESELLER_REQUEST_SUCCESS: {
            return {
                ...state,
                requests: state.requests.map((request) => {
                    if (request._id !== action.payload.request._id) {
                        return request;
                    } else {
                        return {
                            ...request,
                            status: action.payload.request.status,
                        };
                    }
                }),
                loading: false,
                error: null,
            };
        }

        default:
            return state;
    }
};
