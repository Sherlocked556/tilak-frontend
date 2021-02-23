import { blogConstant } from "./constants";
import axios from "../helpers/axios";

export const addBlog = ({ title, coverImg, content }) => async (dispatch) => {
    dispatch({ type: blogConstant.ADD_BLOG_REQUEST });

    try {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("coverImg", coverImg);

        const response = await axios.post("/blog", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        dispatch({
            type: blogConstant.ADD_BLOG_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: blogConstant.ADD_BLOG_FAILURE,
            payload: { error: error },
        });
    }
};

export const updateBlog = ({ title, content, blogId }) => async (dispatch) => {
    dispatch({ type: blogConstant.UPDATE_BLOG_REQUEST });

    try {
        const response = await axios.patch(`/blog/${blogId}`, {
            title,
            content,
        });

        dispatch({
            type: blogConstant.UPDATE_BLOG_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: blogConstant.UPDATE_BLOG_FAILURE,
            payload: { error: error },
        });
    }
};

export const deleteBlog = (blogId) => async (dispatch) => {
    dispatch({ type: blogConstant.DELETE_BLOG_REQUEST });

    try {
        const response = await axios.delete(`/blog/${blogId}`);

        dispatch({
            type: blogConstant.DELETE_BLOG_SUCCESS,
            payload: blogId,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: blogConstant.DELETE_BLOG_FAILURE,
            payload: { error: error },
        });
    }
};

export const fetchBlogs = () => async (dispatch) => {
    dispatch({ type: blogConstant.FETCH_BLOG_REQUEST });

    try {
        const response = await axios.get("/blog/all");

        dispatch({
            type: blogConstant.FETCH_BLOG_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: blogConstant.FETCH_BLOG_FAILURE,
            payload: { error: error },
        });
    }
};
