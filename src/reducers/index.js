import cartReducer from "./cart.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";

import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import orderReducer from "./order.reducer";
import addressReducer from "./address.reducer";
import currencyReducer from "./currency.reducer";
import blogReducer from "./blog.reducer";
import inventoryReducer from "./inventory.reducer";

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    address: addressReducer,
    currency: currencyReducer,
    blogs: blogReducer,
    inventory: inventoryReducer,
});

export default rootReducer;
