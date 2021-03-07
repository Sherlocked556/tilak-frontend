import { cartConstants } from "./constants";
import store from "../store";
import axios from "../helpers/axios";
import { toast } from "react-toastify";

export const addToCart = (product, index) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: cartConstants.ADD_TO_CART_REQUEST,
            });

            console.log(localStorage.getItem("access-token"));

            if (
                !localStorage.getItem("access-token") ||
                localStorage.getItem("access-token") === ""
            ) {
                throw new Error("To add a product to cart, Please login");
            }

            let req = {};

            if (product.areSizes) {
                req = {
                    product: product._id,
                    quantity: 1,
                    size: {
                        sizeUnit: product.sizes.sizeUnit,
                        sizeValue: product.sizes.sizeVariants[index].sizeValue,
                    },
                    amount:
                        product.basePrice +
                        product.sizes.sizeVariants[index].addOnPrice,
                };
            } else {
                req = {
                    product: product._id,
                    quantity: 1,
                    amount: product.basePrice,
                };
            }

            console.log(req);

            const response = await axios.post("user/cart/addtocart", req);

            // console.log("ADD_TO_CART", response.data);

            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: response.data.cartItems,
            });
            toast.success("Product Successfully added to cart", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } catch (error) {
            dispatch({
                type: cartConstants.ADD_TO_CART_FAILURE,
                payload: { error: error },
            });

            if (
                !localStorage.getItem("access-token") ||
                localStorage.getItem("access-token") === ""
            ) {
                toast.error("To add a product to cart, Please login", {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
            } else if (error.response) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
            } else {
                toast.error("Error in adding product to cart", {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
            }
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

        // console.log("UPDATE_TO_CART", response.data);

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

        console.log(product);

        const response = await axios.post("user/cart/removeItem", {
            productId: product._id,
            price: product.price * product.quantity,
        });

        // console.log("CLEAR_FROM_CART", response.data);

        dispatch({
            type: cartConstants.CLEAR_FROM_CART_SUCCESS,
            payload: product,
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

        // console.log("FETCH_CART", response.data);

        dispatch({
            type: cartConstants.FETCH_CART_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: cartConstants.FETCH_CART_FAILURE,
            payload: { error: error },
        });
    }
};
