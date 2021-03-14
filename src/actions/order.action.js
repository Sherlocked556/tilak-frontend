import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const fetchAllAdminOrders = () => async (dispatch) => {
    dispatch({
        type: orderConstants.FETCH_ALL_ORDERS_ADMIN_REQUEST,
    });

    try {
        const response = await axios.get("/getAllOrders");

        dispatch({
            type: orderConstants.FETCH_ALL_ORDERS_ADMIN_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: orderConstants.FETCH_ALL_ORDERS_ADMIN_FAILURE,
            error: error,
        });
    }
};

export const fetchUserOrders = () => async (dispatch) => {
    dispatch({
        type: orderConstants.FETCH_ALL_USER_ORDERS_REQUEST,
    });

    try {
        const response = await axios.get("/getOrders");

        dispatch({
            type: orderConstants.FETCH_ALL_USER_ORDERS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: orderConstants.FETCH_ALL_USER_ORDERS_FAILURE,
            error: error,
        });
    }
};
