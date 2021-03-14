import { orderConstants } from "../actions/constants";

const initState = {
    userOrders: [],
    adminOrders: [],
    error: null,
    loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case orderConstants.FETCH_ALL_ORDERS_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case orderConstants.FETCH_ALL_ORDERS_ADMIN_SUCCESS:
            return {
                ...state,
                adminOrders: action.payload,
                loading: false,
                error: null,
            };

        case orderConstants.FETCH_ALL_ORDERS_ADMIN_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };

        case orderConstants.FETCH_ALL_USER_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case orderConstants.FETCH_ALL_USER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                userOrders: action.payload.orders,
            };

        case orderConstants.FETCH_ALL_USER_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};
