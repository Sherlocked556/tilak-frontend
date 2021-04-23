import { blogConstant } from "./constants";
import axios from "../helpers/axios";
import { toast } from "react-toastify";

export const addBlog = ({ title, coverImg, content, description }) => async (
    dispatch
) => {
    dispatch({ type: blogConstant.ADD_BLOG_REQUEST });

    try {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("coverImg", coverImg);
        formData.append("description", description);

        const response = await axios.post("/blog", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        dispatch({
            type: blogConstant.ADD_BLOG_SUCCESS,
            payload: response.data,
        });

        toast.success("Blog Successfully Added", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: blogConstant.ADD_BLOG_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in adding new Blog", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const updateBlog = ({ title, content, description, blogId }) => async (
    dispatch
) => {
    dispatch({ type: blogConstant.UPDATE_BLOG_REQUEST });

    try {
        const response = await axios.patch(`/blog/${blogId}`, {
            title,
            content,
            description,
        });

        dispatch({
            type: blogConstant.UPDATE_BLOG_SUCCESS,
            payload: response.data,
        });

        toast.success("Blog successfully updated", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: blogConstant.UPDATE_BLOG_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in Updating the blog", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
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
