import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    productsByPrice: {
        under1k: [],
        under2k: [],
    },
    pageRequest: false,
    page: {},
    error: null,
    productDetails: {},
    loading: false,
};

export default (state = initState, action) => {
    // console.log(action);

    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice,
                },
            };
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                error: null,
                loading: false,
            };
            break;

        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;

        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                productDetails: action.payload.productDetails,
            };
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        case productConstants.DELETE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case productConstants.DELETE_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: state.products.filter(
                    (product) => product._id !== action.payload.productId
                ),
                loading: false,
                error: null,
            };
            break;

        case productConstants.DELETE_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        case productConstants.UPDATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case productConstants.UPDATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.updateProducts,
                error: null,
                loading: false,
            };

        case productConstants.UPDATE_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        case productConstants.ADD_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: [...state.products, action.payload],
                loading: false,
            };
            break;

        case productConstants.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        case productConstants.UPDATE_BY_ID_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: state.products.map((product) => {
                    if (product._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return product;
                    }
                }),
                loading: false,
            };
            break;

        case productConstants.UPDATE_BY_ID_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case productConstants.UPDATE_BY_ID_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        default:
            return state;
    }

    return state;
};
