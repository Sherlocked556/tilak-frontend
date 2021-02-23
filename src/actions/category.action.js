import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get("category/getcategory");
        // console.log(res);
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
    } catch (error) {
        dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload: { error },
        });
    }
};
