import axios from "../helpers/axios";
import { categoryConstants } from "./constants";
import { toast } from "react-toastify";

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get("category/getcategory");
        // // console.log(res);
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList },
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const addCategory = (name, categoryImg) => async (dispatch) => {
    dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_REQUEST,
    });

    try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("categoryImage", categoryImg);

        const response = await axios.post("/category/create", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
            payload: response.data,
        });

        toast.success("Category Successfully added", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload: { error },
        });
        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in adding new Category", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};
