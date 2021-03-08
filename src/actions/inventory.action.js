import axios from "../helpers/axios";
import { inventoryConstant } from "./constants";
import { toast } from "react-toastify";

export const addInventory = (data) => async (dispatch) => {
    dispatch({ type: inventoryConstant.ADD_INVENTORY_REQUEST });

    try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("thumbnail", data.thumbnail);
        formData.append("category", data.category);
        formData.append("styles", JSON.stringify(data.styles));

        const response = await axios.post("/inventory", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        dispatch({
            type: inventoryConstant.ADD_INVENTORY_SUCCESS,
            payload: response.data.inventory,
        });

        toast.success("Inventory added Successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: inventoryConstant.ADD_INVENTORY_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in adding Inventory", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const updateInventory = (data, inventoryId) => async (dispatch) => {
    dispatch({ type: inventoryConstant.UPDATE_INVENTORY_REQUEST });

    try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("thumbnail", data.thumbnail);
        formData.append("category", data.category);
        formData.append("prevStyles", JSON.stringify(data.styles));

        const response = await axios.patch(
            `/inventory/${inventoryId}`,
            formData,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        );

        dispatch({
            type: inventoryConstant.UPDATE_INVENTORY_SUCCESS,
            payload: response.data.inventory,
        });

        toast.success("Inventory updated Successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: inventoryConstant.UPDATE_INVENTORY_FAILURE,
            payload: { error: error },
        });

        if (error.response) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } else {
            toast.error("Error in updating Inventory", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    }
};

export const fetchInventory = () => async (dispatch) => {
    dispatch({ type: inventoryConstant.FETCH_INVENTORY_REQUEST });

    try {
        const response = await axios.get("/inventory");

        dispatch({
            type: inventoryConstant.FETCH_INVENTORY_SUCCESS,
            payload: response.data.inventory,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: inventoryConstant.FETCH_INVENTORY_FAILURE,
            payload: { error: error },
        });
    }
};

export const fetchOneInventory = (inventoryId) => async (dispatch) => {
    dispatch({ type: inventoryConstant.FETCH_SINGLE_INVENTORY_REQUEST });

    try {
        const response = await axios.get(`/inventory/${inventoryId}`);

        dispatch({
            type: inventoryConstant.FETCH_SINGLE_INVENTORY_SUCCESS,
            payload: response.data.inventory,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: inventoryConstant.FETCH_SINGLE_INVENTORY_FAILURE,
            payload: { error: error },
        });
    }
};

export const deleteInventory = (inventoryId) => async (dispatch) => {
    dispatch({ type: inventoryConstant.DELETE_INVENTORY_REQUEST });

    try {
        const response = await axios.delete(`/inventory/${inventoryId}`);

        dispatch({
            type: inventoryConstant.DELETE_INVENTORY_SUCCESS,
            payload: response.data.inventory,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: inventoryConstant.DELETE_INVENTORY_FAILURE,
            payload: { error: error },
        });
    }
};
