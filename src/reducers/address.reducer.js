import { addressConstant } from "../actions/constants";

const initState = {
    address: [],
    loading: false,
    error: null,
};

export default (state = initState, action) => {
    switch (action.type) {
        case addressConstant.FETCH_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.payload,
                loading: false,
            };

        case addressConstant.FETCH_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case addressConstant.FETCH_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case addressConstant.ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                address:
                    state.address.length > 0
                        ? state.address.map((userAddress) => {
                              if (userAddress.user === action.payload.user) {
                                  userAddress.address = action.payload.address;

                                  return userAddress;
                              } else {
                                  return userAddress;
                              }
                          })
                        : [action.payload],
                loading: false,
            };

        case addressConstant.ADD_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case addressConstant.ADD_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case addressConstant.DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                address: state.address.map((userAddress) => {
                    if (userAddress.user === action.payload.user) {
                        userAddress.address = action.payload.address;

                        return userAddress;
                    } else {
                        return userAddress;
                    }
                }),
            };

        case addressConstant.DELETE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case addressConstant.DELETE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
};
