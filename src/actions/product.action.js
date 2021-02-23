import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async (dispatch) => {
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data,
            });
        } else {
            // dispatch({
            //   type:
            // })
        }
    };
};

export const GetProductDetailsById = (payload) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            console.log(payload);
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product },
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });

        const response = await axios.post("/product/getProducts");

        console.log(response.data);

        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: productConstants.GET_ALL_PRODUCTS_FAILURE,
            payload: { error: error },
        });
    }
};

export const deleteProductById = (id) => async (dispatch) => {
    dispatch({
        type: productConstants.DELETE_PRODUCT_REQUEST,
    });

    try {
        const response = await axios.delete(`/product/deleteProductById/${id}`);

        dispatch({
            type: productConstants.DELETE_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: productConstants.DELETE_PRODUCT_FAILURE,
            payload: { error: error },
        });
    }
};

export const updateProducts = (updateProducts) => async (dispatch) => {
    dispatch({
        type: productConstants.UPDATE_PRODUCT_REQUEST,
    });

    try {
        const response = await axios.patch("/product/updateProducts", {
            products: updateProducts,
        });

        dispatch({
            type: productConstants.UPDATE_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: productConstants.UPDATE_PRODUCT_FAILURE,
            payload: { error: error },
        });
    }
};

export const addProduct = (data, isVariant) => async (dispatch) => {
    dispatch({
        type: productConstants.ADD_PRODUCT_REQUEST,
    });

    try {
        const formData = new FormData();

        console.log(data);

        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append("category", data.category);
        formData.append("description", data.description);
        if (isVariant) {
            formData.append("variant", JSON.stringify(data.variant));
        }
        data.productImages.forEach((file) => {
            formData.append("productPicture", file);
        });

        const response = await axios.post("/product/create", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        dispatch({
            type: productConstants.ADD_PRODUCT_SUCCESS,
            payload: response.data.product,
        });
    } catch (error) {
        dispatch({
            type: productConstants.ADD_PRODUCT_FAILURE,
            payload: { error: error },
        });
    }
};

export const updateProductById = (data) => async (dispatch) => {
    dispatch({
        type: productConstants.UPDATE_BY_ID_PRODUCT_REQUEST,
    });

    try {
        const formData = new FormData();

        console.log(data);

        formData.append("_id", data._id);
        formData.append("name", data.name);
        formData.append("areVariants", data.areVariants);
        formData.append("availability", data.availability);
        formData.append("createdBy", data.createdBy);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append("category", data.category);
        formData.append("description", data.description);
        if (data.areVariants) {
            formData.append("variant", JSON.stringify(data.variant));
        }
        if (data.prevProductImages.length > 0) {
            formData.append(
                "prevProductImages",
                JSON.stringify(data.prevProductImages)
            );
        }
        data.productImages.forEach((file) => {
            formData.append("productPicture", file);
        });

        const response = await axios.patch("/product/updateById", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        console.log(response);

        dispatch({
            type: productConstants.UPDATE_BY_ID_PRODUCT_SUCCESS,
            payload: response.data.update,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: productConstants.UPDATE_BY_ID_PRODUCT_FAILURE,
            payload: { error: error },
        });
    }
};
