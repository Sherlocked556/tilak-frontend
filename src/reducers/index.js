import cartReducer from "./cart.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";

import { combineReducers } from "redux";
import { cartConstants } from "../actions/constants";
import authReducer from "./auth.reducer";
import orderReducer from "./order.reducer";
import addressReducer from "./address.reducer";
import currencyReducer from "./currency.reducer";
import blogReducer from "./blog.reducer";

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    address: addressReducer,
    currency: currencyReducer,
    blogs: blogReducer,
});

export default rootReducer;
