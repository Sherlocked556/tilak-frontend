import { currencyConstant } from "../actions/constants";

const initState = {
    currency: "INR",
};

export default (state = initState, action) => {
    if (action.type === currencyConstant.SET_CURRENCY) {
        return (state = { currency: action.payload });
    } else {
        return state;
    }
};
