import axios from "../helpers/axios";
import { toast } from "react-toastify";
import { resellerConstant } from "./constants";

export const createReseller = (data) => async (dispatch) => {
    dispatch({ type: resellerConstant.ADD_RESELLER_REQUEST });

    try {
        const response = await axios.post("/reseller", {
            email: data.email,
            percent: data.percent,
        });

        dispatch({
            type: resellerConstant.ADD_RESELLER_SUCCESS,
            payload: response.data,
        });

        toast.success("Reseller Added Successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.ADD_RESELLER_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in adding Reseller", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const updateReseller = (data) => async (dispatch) => {
    dispatch({ type: resellerConstant.UPDATE_RESELLER_REQUEST });

    try {
        const response = await axios.patch("/reseller", {
            resellerId: data.resellerId,
            percent: data.percent,
        });

        dispatch({
            type: resellerConstant.UPDATE_RESELLER_SUCCESS,
            payload: response.data,
        });

        toast.success("Reseller Updated Successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.UPDATE_RESELLER_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in adding Reseller", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const deleteReseller = (resellerId) => async (dispatch) => {
    dispatch({ type: resellerConstant.DELETE_RESELLER_REQUEST });

    try {
        const response = await axios.delete(`/reseller/${resellerId}`);

        // console.log(response.data);

        dispatch({
            type: resellerConstant.DELETE_RESELLER_SUCCESS,
            payload: response.data,
        });

        toast.success("Reseller Deleted Successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.DELETE_RESELLER_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in deleting Reseller", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const fetchResellerById = (resellerId) => async (dispatch) => {
    dispatch({ type: resellerConstant.FETCH_SINGLE_RESELLER_REQUEST });

    try {
        const response = await axios.get(`/reseller/${resellerId}`);

        dispatch({
            type: resellerConstant.FETCH_SINGLE_RESELLER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.FETCH_SINGLE_RESELLER_FAILURE,
            payload: { error: error },
        });
    }
};

export const fetchAllReseller = () => async (dispatch) => {
    dispatch({ type: resellerConstant.FETCH_ALL_RESELLERS_REQUEST });

    try {
        const response = await axios.get("/reseller");

        dispatch({
            type: resellerConstant.FETCH_ALL_RESELLERS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.FETCH_ALL_RESELLERS_FAILURE,
            payload: { error: error },
        });
    }
};

export const createResellerRequest = (resellerId) => async (dispatch) => {
    dispatch({ type: resellerConstant.CREATE_RESELLER_REQUEST_REQUEST });

    try {
        const response = await axios.post("/reseller/request", {
            resellerId,
        });

        dispatch({
            type: resellerConstant.CREATE_RESELLER_REQUEST_SUCCESS,
            payload: response.data,
        });

        toast.success("Request Added Successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.CREATE_RESELLER_REQUEST_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in adding Request", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const updateResellerRequest = (data) => async (dispatch) => {
    dispatch({ type: resellerConstant.UPDATE_RESELLER_REQUEST_REQUEST });

    try {
        const response = await axios.patch("/reseller/request", {
            status: data.status,
            requestId: data.requestId,
        });

        dispatch({
            type: resellerConstant.UPDATE_RESELLER_REQUEST_SUCCESS,
            payload: response.data,
        });

        toast.success("Request Updated Successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.UPDATE_RESELLER_REQUEST_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.msg, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in updating Request", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const fetchResellerRequest = (requestId) => async (dispatch) => {
    dispatch({ type: resellerConstant.FETCH_REQUEST_REQUEST });

    try {
        const response = await axios.get(`/reseller/request/${requestId}`);

        dispatch({
            type: resellerConstant.FETCH_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.FETCH_REQUEST_FAILURE,
            payload: { error: error },
        });
    }
};

export const fetchRequestByReseller = (resellerId) => async (dispatch) => {
    dispatch({ type: resellerConstant.FETCH_RESELLER_REQUEST_REQUEST });

    try {
        const response = await axios.get(`/reseller/${resellerId}/request`);

        dispatch({
            type: resellerConstant.FETCH_RESELLER_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // console.log(error);

        dispatch({
            type: resellerConstant.FETCH_RESELLER_REQUEST_FAILURE,
            payload: { error: error },
        });
    }
};

export const fetchAllRequest = () => async (dispatch) => {
    dispatch({ type: resellerConstant.FETCH_ALL_REQUEST_REQUEST });

    try {
        const response = await axios.get("/reseller/request");

        dispatch({
            type: resellerConstant.FETCH_ALL_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        // console.log(error);
        dispatch({
            type: resellerConstant.FETCH_ALL_REQUEST_FAILURE,
            payload: { error: error },
        });
    }
};
