import { authConstants } from "../actions/constants";

const initState = {
    user: {},
    loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case authConstants.USER_REGISTER_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case authConstants.USER_LOGIN_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case authConstants.USER_LOGOUT_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case authConstants.USER_REGISTER_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload,
            });

        case authConstants.USER_LOGIN_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload,
            });

        case authConstants.USER_LOGOUT_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload,
            });

        case authConstants.USER_REGISTER_SUCCESS:
            return (state = {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            });

        case authConstants.USER_LOGIN_SUCCESS:
            return (state = {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            });

        case authConstants.USER_LOGOUT_SUCCESS:
            return (state = {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            });

        default:
            return state;
    }
};
