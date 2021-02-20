import { cartConstants } from "../actions/constants";

const initState = {
    cartItems: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_SUCCESS:
            return (state = {
                ...state,
                cartItems: action.payload,
            });

        case cartConstants.FETCH_CART_SUCCESS:
            return (state = {
                ...state,
                cartItems: action.payload,
            });

        case cartConstants.UPDATE_CART_SUCCESS:

        default:
            return state;
    }
    return state;
};
