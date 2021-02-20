import cartReducer from "./cart.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";

import { combineReducers } from "redux";
import { cartConstants } from "../actions/constants";
import authReducer from "./auth.reducer";

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
});

export default rootReducer;
