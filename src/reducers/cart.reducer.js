import { cartConstants } from "../actions/constants";

const initState = {
    cartItems: [],
    error: null,
    loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_SUCCESS:
            return (state = {
                ...state,
                cartItems: action.payload,
                loading: false,
            });

        case cartConstants.ADD_TO_CART_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case cartConstants.ADD_TO_CART_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };

        case cartConstants.FETCH_CART_SUCCESS:
            return (state = {
                ...state,
                cartItems: action.payload,
                loading: false,
            });

        case cartConstants.FETCH_CART_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case cartConstants.FETCH_CART_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };

        case cartConstants.CLEAR_FROM_CART_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case cartConstants.CLEAR_FROM_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: {
                    ...state.cartItems,
                    cartItems: state.cartItems.cartItems.filter(
                        (item) => item._id !== action.payload._id
                    ),
                    totalAmount:
                        state.cartItems.totalAmount -
                        action.payload.price * action.payload.quantity,
                },
            };

        case cartConstants.CLEAR_FROM_CART_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };

        // case cartConstants.UPDATE_CART_SUCCESS:

        default:
            return state;
    }
    return state;
};
