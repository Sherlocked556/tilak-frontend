export const categoryConstants = {
    GET_ALL_CATEGORIES_REQUEST: "GET_ALL_CATEGORIES_REQUEST",
    GET_ALL_CATEGORIES_SUCCESS: "GET_ALL_CATEGORIES_SUCCESS",
    GET_ALL_CATEGORIES_FAILURE: "GET_ALL_CATEGORIES_FAILURE",
    ADD_NEW_CATEGORY_REQUEST: " ADD_NEW_CATEGORY_REQUEST",
    ADD_NEW_CATEGORY_SUCCESS: " ADD_NEW_CATEGORY_SUCCESS",
    ADD_NEW_CATEGORY_FAILURE: " ADD_NEW_CATEGORY_FAILURE",
};

export const productConstants = {
    GET_PRODUCTS_BY_SLUG_REQUEST: "GET_PRODUCTS_BY_SLUG_REQUEST",
    GET_PRODUCTS_BY_SLUG_SUCCESS: "GET_PRODUCTS_BY_SLUG_SUCCESS",
    GET_PRODUCTS_BY_SLUG_FAILURE: "GET_PRODUCTS_BY_SLUG_FAILURE",

    GET_ALL_PRODUCTS_REQUEST: "GET_ALL_PRODUCTS_REQUEST",
    GET_ALL_PRODUCTS_SUCCESS: "GET_ALL_PRODUCTS_SUCCESS",
    GET_ALL_PRODUCTS_FAILURE: "GET_ALL_PRODUCTS_FAILURE",

    GET_PRODUCT_DETAILS_BY_ID_REQUEST: "GET_PRODUCT_DETAILS_BY_ID_REQUEST",
    GET_PRODUCT_DETAILS_BY_ID_SUCCESS: "GET_PRODUCT_DETAILS_BY_ID_SUCCESS",
    GET_PRODUCT_DETAILS_BY_ID_FAILURE: "GET_PRODUCT_DETAILS_BY_ID_FAILURE",

    DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST",
    DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
    DELETE_PRODUCT_FAILURE: "DELETE_PRODUCT_FAILURE",

    UPDATE_PRODUCT_REQUEST: "UPDATE_PRODUCT_REQUEST",
    UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
    UPDATE_PRODUCT_FAILURE: "UPDATE_PRODUCT_FAILURE",

    UPDATE_BY_ID_PRODUCT_REQUEST: "UPDATE_BY_ID_PRODUCT_REQUEST",
    UPDATE_BY_ID_PRODUCT_SUCCESS: "UPDATE_BY_ID_PRODUCT_SUCCESS",
    UPDATE_BY_ID_PRODUCT_FAILURE: "UPDATE_BY_ID_PRODUCT_FAILURE",

    ADD_PRODUCT_REQUEST: "ADD_PRODUCT_REQUEST",
    ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
    ADD_PRODUCT_FAILURE: "ADD_PRODUCT_FAILURE",
};

export const initialDataConstants = {
    GET_ALL_INITIAL_DATA_REQUEST: "GET_ALL_INITIAL_DATA_REQUEST",
    GET_ALL_INITIAL_DATA_SUCCESS: "GET_ALL_INITIAL_DATA_SUCCESS",
    GET_ALL_INITIAL_DATA_FAILURE: "GET_ALL_INITIAL_DATA_FAILURE",
};

export const authConstants = {
    USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST",
    USER_LOGOUT_REQUEST: "USER_LOGOUT_REQUEST",
    USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST",
    USER_REGISTER_FAILURE: "USER_REGISTER_FAILURE",
    USER_LOGIN_FAILURE: "USER_LOGIN_FAILURE",
    USER_LOGOUT_FAILURE: "USER_LOGOUT_FAILURE",
    USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
    USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
    USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",
};

export const cartConstants = {
    FETCH_CART_REQUEST: "FETCH_CART_REQUEST",
    FETCH_CART_SUCCESS: "FETCH_CART_SUCCESS",
    FETCH_CART_FAILURE: "FETCH_CART_FAILURE",

    ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
    ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
    ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",

    UPDATE_CART_REQUEST: "UPDATE_CART_REQUEST",
    UPDATE_CART_SUCCESS: "UPDATE_CART_SUCCESS",
    UPDATE_CART_FAILURE: "UPDATE_CART_FAILURE",

    CLEAR_FROM_CART_REQUEST: "CLEAR_FROM_CART_REQUEST",
    CLEAR_FROM_CART_SUCCESS: "CLEAR_FROM_CART_SUCCESS",
    CLEAR_FROM_CART_FAILURE: "CLEAR_FROM_CART_FAILURE",
};

export const orderConstants = {
    ADD_ORDER_REQUEST: "ADD_ORDER_REQUEST",
    ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
    ADD_ORDER_FAILURE: "ADD_ORDER_FAILURE",

    CANCEL_ORDER_REQUEST: "CANCEL_ORDER_REQUEST",
    CANCEL_ORDER_SUCCESS: "CANCEL_ORDER_SUCCESS",
    CANCEL_ORDER_FAILURE: "CANCEL_ORDER_FAILURE",

    FETCH_ALL_ORDERS_ADMIN_REQUEST: "FETCH_ALL_ORDERS_ADMIN_REQUEST",
    FETCH_ALL_ORDERS_ADMIN_SUCCESS: "FETCH_ALL_ORDERS_ADMIN_SUCCESS",
    FETCH_ALL_ORDERS_ADMIN_FAILURE: "FETCH_ALL_ORDERS_ADMIN_FAILURE",

    FETCH_ALL_USER_ORDERS_REQUEST: "FETCH_ALL_USER_ORDERS_REQUEST",
    FETCH_ALL_USER_ORDERS_SUCCESS: "FETCH_ALL_USER_ORDERS_SUCCESS",
    FETCH_ALL_USER_ORDERS_FAILURE: "FETCH_ALL_USER_ORDERS_FAILURE",
};

export const addressConstant = {
    ADD_ADDRESS_REQUEST: "ADD_ADDRESS_REQUEST",
    ADD_ADDRESS_SUCCESS: "ADD_ADDRESS_SUCCESS",
    ADD_ADDRESS_FAILURE: "ADD_ADDRESS_FAILURE",

    FETCH_ADDRESS_REQUEST: "FETCH_ADDRESS_REQUEST",
    FETCH_ADDRESS_SUCCESS: "FETCH_ADDRESS_SUCCESS",
    FETCH_ADDRESS_FAILURE: "FETCH_ADDRESS_FAILURE",

    DELETE_ADDRESS_REQUEST: "DELETE_ADDRESS_REQUEST",
    DELETE_ADDRESS_SUCCESS: "DELETE_ADDRESS_SUCCESS",
    DELETE_ADDRESS_FAILURE: "DELETE_ADDRESS_FAILURE",
};

export const currencyConstant = {
    SET_CURRENCY: "SET_CURRENCY",
};

export const blogConstant = {
    ADD_BLOG_REQUEST: "ADD_BLOG_REQUEST",
    ADD_BLOG_SUCCESS: "ADD_BLOG_SUCCESS",
    ADD_BLOG_FAILURE: "ADD_BLOG_FAILURE",

    DELETE_BLOG_REQUEST: "DELETE_BLOG_REQUEST",
    DELETE_BLOG_SUCCESS: "DELETE_BLOG_SUCCESS",
    DELETE_BLOG_FAILURE: "DELETE_BLOG_FAILURE",

    UPDATE_BLOG_REQUEST: "UPDATE_BLOG_REQUEST",
    UPDATE_BLOG_SUCCESS: "UPDATE_BLOG_SUCCESS",
    UPDATE_BLOG_FAILURE: "UPDATE_BLOG_FAILURE",

    FETCH_BLOG_REQUEST: "FETCH_BLOG_REQUEST",
    FETCH_BLOG_SUCCESS: "FETCH_BLOG_SUCCESS",
    FETCH_BLOG_FAILURE: "FETCH_BLOG_FAILURE",
};

export const inventoryConstant = {
    ADD_INVENTORY_REQUEST: "ADD_INVENTORY_REQUEST",
    ADD_INVENTORY_SUCCESS: "ADD_INVENTORY_SUCCESS",
    ADD_INVENTORY_FAILURE: "ADD_INVENTORY_FAILURE",

    DELETE_INVENTORY_REQUEST: "DELETE_INVENTORY_REQUEST",
    DELETE_INVENTORY_SUCCESS: "DELETE_INVENTORY_SUCCESS",
    DELETE_INVENTORY_FAILURE: "DELETE_INVENTORY_FAILURE",

    UPDATE_INVENTORY_REQUEST: "UPDATE_INVENTORY_REQUEST",
    UPDATE_INVENTORY_SUCCESS: "UPDATE_INVENTORY_SUCCESS",
    UPDATE_INVENTORY_FAILURE: "UPDATE_INVENTORY_FAILURE",

    FETCH_INVENTORY_REQUEST: "FETCH_INVENTORY_REQUEST",
    FETCH_INVENTORY_SUCCESS: "FETCH_INVENTORY_SUCCESS",
    FETCH_INVENTORY_FAILURE: "FETCH_INVENTORY_FAILURE",

    FETCH_SINGLE_INVENTORY_REQUEST: "FETCH_SINGLE_INVENTORY_REQUEST",
    FETCH_SINGLE_INVENTORY_SUCCESS: "FETCH_SINGLE_INVENTORY_SUCCESS",
    FETCH_SINGLE_INVENTORY_FAILURE: "FETCH_SINGLE_INVENTORY_FAILURE",
};

export const resellerConstant = {
    ADD_RESELLER_REQUEST: "ADD_RESELLER_REQUEST",
    ADD_RESELLER_SUCCESS: "ADD_RESELLER_SUCCESS",
    ADD_RESELLER_FAILURE: "ADD_RESELLER_FAILURE",

    DELETE_RESELLER_REQUEST: "DELETE_RESELLER_REQUEST",
    DELETE_RESELLER_SUCCESS: "DELETE_RESELLER_SUCCESS",
    DELETE_RESELLER_FAILURE: "DELETE_RESELLER_FAILURE",

    FETCH_SINGLE_RESELLER_REQUEST: "FETCH_SINGLE_RESELLER_REQUEST",
    FETCH_SINGLE_RESELLER_SUCCESS: "FETCH_SINGLE_RESELLER_SUCCESS",
    FETCH_SINGLE_RESELLER_FAILURE: "FETCH_SINGLE_RESELLER_FAILURE",

    FETCH_ALL_RESELLERS_REQUEST: "FETCH_ALL_RESELLERS_REQUEST",
    FETCH_ALL_RESELLERS_SUCCESS: "FETCH_ALL_RESELLERS_SUCCESS",
    FETCH_ALL_RESELLERS_FAILURE: "FETCH_ALL_RESELLERS_FAILURE",

    CREATE_RESELLER_REQUEST_REQUEST: "CREATE_RESELLER_REQUEST_REQUEST",
    CREATE_RESELLER_REQUEST_SUCCESS: "CREATE_RESELLER_REQUEST_SUCCESS",
    CREATE_RESELLER_REQUEST_FAILURE: "CREATE_RESELLER_REQUEST_FAILURE",

    UPDATE_RESELLER_REQUEST_REQUEST: "UPDATE_RESELLER_REQUEST_REQUEST",
    UPDATE_RESELLER_REQUEST_SUCCESS: "UPDATE_RESELLER_REQUEST_SUCCESS",
    UPDATE_RESELLER_REQUEST_FAILURE: "UPDATE_RESELLER_REQUEST_FAILURE",

    UPDATE_RESELLER_REQUEST: "UPDATE_RESELLER_REQUEST",
    UPDATE_RESELLER_SUCCESS: "UPDATE_RESELLER_SUCCESS",
    UPDATE_RESELLER_FAILURE: "UPDATE_RESELLER_FAILURE",

    FETCH_REQUEST_REQUEST: "FETCH_REQUEST_REQUEST",
    FETCH_REQUEST_SUCCESS: "FETCH_REQUEST_SUCCESS",
    FETCH_REQUEST_FAILURE: "FETCH_REQUEST_FAILURE",

    FETCH_RESELLER_REQUEST_REQUEST: "FETCH_RESELLER_REQUEST_REQUEST",
    FETCH_RESELLER_REQUEST_SUCCESS: "FETCH_RESELLER_REQUEST_SUCCESS",
    FETCH_RESELLER_REQUEST_FAILURE: "FETCH_RESELLER_REQUEST_FAILURE",

    FETCH_ALL_REQUEST_REQUEST: "FETCH_ALL_REQUEST_REQUEST",
    FETCH_ALL_REQUEST_SUCCESS: "FETCH_ALL_REQUEST_SUCCESS",
    FETCH_ALL_REQUEST_FAILURE: "FETCH_ALL_REQUEST_FAILURE",
};
