import { inventoryConstant } from "../actions/constants";

const initState = {
    loading: false,
    error: null,
    inventoryDetails: {},
    inventory: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        case inventoryConstant.ADD_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case inventoryConstant.ADD_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventory: [...state.inventory, action.payload],
                error: null,
            };

        case inventoryConstant.ADD_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case inventoryConstant.UPDATE_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case inventoryConstant.UPDATE_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventory: state.inventory.map((item) => {
                    if (item._id == action.payload._id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
                error: null,
            };

        case inventoryConstant.UPDATE_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case inventoryConstant.FETCH_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case inventoryConstant.FETCH_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventory: action.payload,
                error: null,
            };

        case inventoryConstant.FETCH_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case inventoryConstant.FETCH_SINGLE_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case inventoryConstant.FETCH_SINGLE_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventoryDetails: action.payload,
                error: null,
            };

        case inventoryConstant.FETCH_SINGLE_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case inventoryConstant.DELETE_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case inventoryConstant.DELETE_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventory: state.inventory.filter(
                    (item) => item._id !== action.payload
                ),
                error: null,
            };

        case inventoryConstant.DELETE_INVENTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
};
