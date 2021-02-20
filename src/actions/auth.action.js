import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const registerUser = (fullName, email, password) => async (dispatch) => {
    dispatch({ type: authConstants.USER_REGISTER_REQUEST });

    let firstName = fullName.split(" ")[0];
    let lastName = fullName.split(" ").slice(-1)[0];

    try {
        const response = await axios.post("user/signup", {
            firstName,
            lastName,
            email,
            password,
        });

        dispatch({
            type: authConstants.USER_REGISTER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);

        dispatch({ type: authConstants.USER_REGISTER_FAILURE, payload: error });
    }
};

export const loginUser = (email, password, history) => async (dispatch) => {
    dispatch({ type: authConstants.USER_LOGIN_REQUEST });

    try {
        const response = await axios.post("user/signin", { email, password });

        localStorage.setItem("access-token", response.data.accessToken);

        // history.push("/loginNext");
        dispatch({
            type: authConstants.USER_LOGIN_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: authConstants.USER_LOGIN_FAILURE, payload: error });
    }
};

export const logoutUser = (id) => async (dispatch) => {
    dispatch({ type: authConstants.USER_LOGOUT_REQUEST });

    try {
        const response = await axios.post("user/signout", { _id: id });

        localStorage.setItem("access-token", "");

        dispatch({
            type: authConstants.USER_LOGOUT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({ type: authConstants.USER_LOGOUT_FAILURE, payload: error });
    }
};
