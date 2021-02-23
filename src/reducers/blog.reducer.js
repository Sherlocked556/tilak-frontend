import { blogConstant } from "../actions/constants";

const initState = {
    blogs: [],
    error: null,
    loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case blogConstant.FETCH_BLOG_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case blogConstant.FETCH_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload,
            };

        case blogConstant.FETCH_BLOG_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload.error,
            });

        case blogConstant.ADD_BLOG_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case blogConstant.ADD_BLOG_SUCCESS:
            return (state = {
                ...state,
                loading: false,
                blogs: [...state.blogs, action.payload],
            });

        case blogConstant.ADD_BLOG_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload.error,
            });

        case blogConstant.UPDATE_BLOG_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case blogConstant.UPDATE_BLOG_SUCCESS:
            return (state = {
                ...state,
                loading: false,
                blogs: state.blogs.map((blog) => {
                    if (blog._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return blog;
                    }
                }),
            });

        case blogConstant.UPDATE_BLOG_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload.error,
            });

        case blogConstant.DELETE_BLOG_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case blogConstant.DELETE_BLOG_SUCCESS:
            return (state = {
                ...state,
                loading: false,
                blogs: state.blogs.filter(
                    (blog) => blog._id !== action.payload
                ),
            });

        case blogConstant.DELETE_BLOG_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload.error,
            });

        default:
            return state;
    }
};
