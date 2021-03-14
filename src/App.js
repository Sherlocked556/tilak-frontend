import React, { useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.css";
import Home from "./Container/Pages/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import jwt from "jsonwebtoken";
import Shop from "./Container/Pages/Shop";
import About from "./Container/Pages/About";
import Query from "./Container/Pages/Query";
import Categories from "./Container/Pages/Categories";
import Cart from "./Container/Pages/Cart";
import Product from "./Container/Pages/Product";
import Blogs from "./Container/Pages/Blogs";
import Profile from "./Container/Pages/Profile";
import myProfile from "./Container/Pages/myProfile";
import Address from "./Container/Pages/Address";
import Admin from "./Container/Pages/Admin";
import AdminBilling from "./Container/Pages/AdminBilling";
import payment from "./Container/Pages/payment";
import orderSummary from "./Container/Pages/orderSummary";
import AdminReseller from "./Container/Pages/AdminReseller";
import ResellerOrder from "./Container/Pages/ResellerOrder";
import ResellerNotification from "./Container/Pages/ResellerNotification";
import ResellerEarning from "./Container/Pages/ResellerEarning";
import { getInitialData } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import result from "./Container/Pages/result";
import PrivacyPolicy from "./Container/Pages/PrivacyPolicy";
import ShippingPolicy from "./Container/Pages/ShippingPolicy";
import Terms from "./Container/Pages/Terms";
import LoginSign from "./Container/Pages/LoginSign";
import LoginNextPage from "./Container/Pages/LoginNextPage";
import ScrollToTop from "./Container/scrollToTop";
import AdminBlogs from "./Container/Pages/AdminBlogs";
import AdminInventory from "./Container/Pages/AdminInventory";

const isLoggedIn = () => {
    if (localStorage.getItem("access-token")) {
        return true;
    } else return false;
};

const isAdmin = () => {
    if (isLoggedIn()) {
        let user = jwt.decode(localStorage.getItem("access-token"));

        if (user.role === "admin") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/loginSign",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAdmin() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getInitialData());
    }, []);


    return (
        <Router>
            <ScrollToTop />

            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/shop" component={Shop}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/query" component={Query}></Route>
                <Route path="/categories" component={Categories}></Route>
                <PrivateRoute path="/cart" component={Cart}></PrivateRoute>
                <Route
                    path="/:inventorySlug/:productId/p"
                    component={Product}
                ></Route>
                <Route path="/blogs" component={Blogs}></Route>
                <PrivateRoute
                    path="/profile"
                    component={Profile}
                ></PrivateRoute>
                <PrivateRoute
                    path="/address"
                    component={Address}
                ></PrivateRoute>
                <PrivateRoute
                    path="/myprofile"
                    component={myProfile}
                ></PrivateRoute>
                <AdminRoute path="/admin" component={Admin}></AdminRoute>
                <AdminRoute
                    path="/adminbilling"
                    component={AdminBilling}
                ></AdminRoute>
                <AdminRoute
                    path="/adminReseller"
                    component={AdminReseller}
                ></AdminRoute>
                <AdminRoute
                    path="/adminBlogs"
                    component={AdminBlogs}
                ></AdminRoute>
                <AdminRoute
                    path="/adminInventory"
                    component={AdminInventory}
                ></AdminRoute>
                <PrivateRoute
                    path="/payment"
                    component={payment}
                ></PrivateRoute>
                <PrivateRoute
                    path="/orderSummary"
                    component={orderSummary}
                ></PrivateRoute>
                <AdminRoute
                    path="/resellerOrder"
                    component={ResellerOrder}
                ></AdminRoute>
                <AdminRoute
                    path="/resellerEarning"
                    component={ResellerEarning}
                ></AdminRoute>
                <AdminRoute
                    path="/ResellerNotification"
                    component={ResellerNotification}
                ></AdminRoute>
                <PrivateRoute path="/result" component={result}></PrivateRoute>
                <Route path="/privacypolicy" component={PrivacyPolicy}></Route>
                <Route
                    path="/shippingandreturninfo"
                    component={ShippingPolicy}
                ></Route>
                <Route path="/termsandcondition" component={Terms}></Route>
                <Route path="/loginSign" component={LoginSign}></Route>
                <Route path="/loginNext" component={LoginNextPage}></Route>
            </Switch>
        </Router>
    );
}

export default App;
