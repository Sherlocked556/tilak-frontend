import axios from "../helpers/axios";
import { addressConstant } from "./constants";

export const addAddress = (data) => async (dispatch) => {
    dispatch({ type: addressConstant.ADD_ADDRESS_REQUEST });

    try {
        const response = await axios.post("user/address/create", {
            payload: { address: data },
        });

        dispatch({
            type: addressConstant.ADD_ADDRESS_SUCCESS,
            payload: response.data.address,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: addressConstant.ADD_ADDRESS_FAILURE,
            payload: { error: error },
        });
    }
};

export const fetchAddress = () => async (dispatch) => {
    dispatch({ type: addressConstant.FETCH_ADDRESS_REQUEST });

    try {
        const response = await axios.get("user/getaddress");

        dispatch({
            type: addressConstant.FETCH_ADDRESS_SUCCESS,
            payload: response.data.userAddress,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: addressConstant.FETCH_ADDRESS_FAILURE,
            payload: { error: error },
        });
    }
};

export const deleteAddress = (addressId) => async (dispatch) => {
    dispatch({ type: addressConstant.DELETE_ADDRESS_REQUEST });

    try {
        const response = await axios.delete(`user/address/${addressId}`);

        dispatch({
            type: addressConstant.DELETE_ADDRESS_SUCCESS,
            payload: response.data.address,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: addressConstant.DELETE_ADDRESS_FAILURE,
            payload: { error: error },
        });
    }
};
