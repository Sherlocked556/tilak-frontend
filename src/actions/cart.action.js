import { cartConstants } from "./constants";
import store from "../store";
import axios from "../helpers/axios";
import { toast } from "react-toastify";

export const addToCart = (product) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: cartConstants.ADD_TO_CART_REQUEST,
            });

            const response = await axios.post("user/cart/addtocart", {
                product: product._id,
                quantity: 1,
            });

            console.log("ADD_TO_CART", response.data);

            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: response.data.cartItems,
            });
            toast.success("Product Successfully added to cart", {
                position: toast.POSITION.BOTTOM_LEFT
              });
        } catch (error) {
            dispatch({
                type: cartConstants.ADD_TO_CART_FAILURE,
                payload: { error: error },
            });
            toast.error("Error in added product to cart", {
                position: toast.POSITION.BOTTOM_LEFT
              });
        }
    };
};

export const updateCart = (product, quantity) => async (dispatch) => {
    try {
        dispatch({
            type: cartConstants.UPDATE_CART_REQUEST,
        });

        const response = await axios.post("user/cart/addtocart", {
            product: product._id,
            quantity,
        });

        console.log("UPDATE_TO_CART", response.data);

        dispatch({
            type: cartConstants.UPDATE_CART_SUCCESS,
            payload: response.data.cartItems,
        });
    } catch (error) {
        console.log(error);

        dispatch({
            type: cartConstants.UPDATE_CART_FAILURE,
            payload: { error: error },
        });
    }
};

export const clearFromCart = (product) => async (dispatch) => {
    try {
        dispatch({
            type: cartConstants.CLEAR_FROM_CART_REQUEST,
        });

        const response = await axios.post("user/cart/removeItem", {
            productId: product.product,
        });

        console.log("CLEAR_FROM_CART", response.data);

        dispatch({
            type: cartConstants.CLEAR_FROM_CART_SUCCESS,
            payload: product.product,
        });
    } catch (error) {
        dispatch({
            type: cartConstants.CLEAR_FROM_CART_FAILURE,
            payload: { error: error },
        });
    }
};

export const fetchCart = () => async (dispatch) => {
    try {
        dispatch({
            type: cartConstants.FETCH_CART_REQUEST,
        });

        const response = await axios.get("user/cart/getCartItems");

        console.log("FETCH_CART", response.data);

        dispatch({
            type: cartConstants.FETCH_CART_SUCCESS,
            payload: response.data.cartItems,
        });
    } catch (error) {
        dispatch({
            type: cartConstants.FETCH_CART_FAILURE,
            payload: { error: error },
        });
    }
};
