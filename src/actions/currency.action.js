import { currencyConstant } from "./constants";

export const setCurrency = (currency) => (dispatch) => {
    dispatch({ type: currencyConstant.SET_CURRENCY, payload: currency });
};
