import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
import Footer from "../Footer/Footer";
// import Search from '../Search Button/Search';
import Aboutme from "./Aboutme";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../actions/order.action";
import { Grid } from "semantic-ui-react";
import dayjs from "dayjs";
import CurrencyConverter from "./CurrencyConvert";

const Profile = () => {
    const dispatch = useDispatch();
    const { userOrders } = useSelector((state) => state.orders);
    const { currency } = useSelector((state) => state.currency);

    const [viewOrder, setViewOrder] = useState("");

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, []);

    if (userOrders) {
        // console.log(userOrders);
    }

    return (
        <div>
            <Header />
            <Index2 />
            {/* <div className='shop'>
            < Search />
            </div> */}
            <h2 className="headlineew">my profile...</h2>
            <div className="Aaboutme">
                <Aboutme />
            </div>
            <div className="profileBox">
                <div className="boxNav">
                    <h6 className="myProfile">
                        <Link to="/myprofile" style={{ color: "#4D4D4D" }}>
                            MY PROFILE
                        </Link>
                    </h6>
                    <h6 className="myOrders">
                        <Link to="/profile" style={{ color: "#4D4D4D" }}>
                            MY ORDERS
                        </Link>
                    </h6>
                    <h6 className="myAddress">
                        <Link to="/address" style={{ color: "#4D4D4D" }}>
                            MY ADDRESS
                        </Link>
                    </h6>
                </div>
                <div className="forline">
                    <hr id="line0"></hr>
                    <hr id="line00"></hr>
                    <hr id="line000"></hr>
                </div>

                {userOrders &&
                    userOrders
                        .slice(0)
                        .reverse()
                        .map((order, index) => (
                            <div className="orderBox" key={index}>
                                <div className="orderID">
                                    <h6>{index + 1}</h6>
                                    <span className="orderidd">Order ID:</span>
                                    <span className="orderNo">
                                        {order.paymentData.orderId}
                                    </span>
                                    <span
                                        className="closeDetail"
                                        onClick={() => {
                                            if (
                                                viewOrder === "" ||
                                                viewOrder !== order._id
                                            ) {
                                                setViewOrder(order._id);
                                            } else {
                                                setViewOrder("");
                                            }
                                        }}
                                    >
                                        {(viewOrder === "" ||
                                            viewOrder !== order._id) && (
                                            <span> View Order </span>
                                        )}

                                        {viewOrder === order._id && (
                                            <span> Close Order </span>
                                        )}
                                    </span>
                                </div>
                                <div className="datee">
                                    <span className="dateeW">Date:</span>
                                    <span className="month">
                                        {dayjs(order.createdAt).format(`DD
                                            MMMM YYYY`)}
                                    </span>
                                </div>
                                <div className="Amount">
                                    <span className="totalAmount">
                                        Total Amount:
                                    </span>
                                    {currency === "INR" && (
                                        <span className="amountRs">
                                            Rs. {order.totalAmount}
                                            /-
                                        </span>
                                    )}

                                    {currency !== "INR" && (
                                        <span className="amountRs">
                                            {currency}.
                                            <CurrencyConverter
                                                from={"INR"}
                                                to={currency}
                                                value={order.totalAmount * 1.05}
                                                precision={2}
                                            />
                                            /-
                                        </span>
                                    )}
                                </div>
                                <div className="Payment">
                                    <span className="paymentMode">
                                        Payment Mode:
                                    </span>
                                    {order.paymentStatus == "pending" ? (
                                        <span className="COD">
                                            Payment Pending
                                        </span>
                                    ) : (
                                        <span className="COD">
                                            {order.paymentType}
                                        </span>
                                    )}
                                </div>
                                <div className="statusBox">
                                    <span className="Status">Status:</span>
                                    <span className="outDelivery">
                                        {order.orderStatus[
                                            order.orderStatus.length - 1
                                        ]
                                            ? order.orderStatus[
                                                  order.orderStatus.length - 1
                                              ].type
                                            : "Ordered"}
                                    </span>
                                </div>
                                <div className="itemBox">
                                    <span className="items">Items:</span>
                                </div>
                                <hr id="orderLine"></hr>
                                {viewOrder === order._id && (
                                    <div className="orderProduct">
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    alignItems: "space-between",
                                                    height: "100%",
                                                }}
                                            >
                                                {order.items &&
                                                    order.items.map(
                                                        (item, index) => (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    flex:
                                                                        "1 1 50%",
                                                                }}
                                                            >
                                                                <div className="orderProductBox">
                                                                    <span className="imageBox">
                                                                        <img
                                                                            src={`https://api.tilakshringar.com/public/${item.productId.productPictures[0].img}`}
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <div className="ppproductName">
                                                                        <span className="pppproductName">
                                                                            {
                                                                                item
                                                                                    .productId
                                                                                    .name
                                                                            }
                                                                        </span>

                                                                        {currency ===
                                                                            "INR" && (
                                                                            <span className="productPricee">
                                                                                <span>
                                                                                    Price:-
                                                                                    Rs.
                                                                                    {
                                                                                        item.payablePrice
                                                                                    }
                                                                                    /-
                                                                                </span>
                                                                            </span>
                                                                        )}

                                                                        {currency !==
                                                                            "INR" && (
                                                                            <span className="productPricee">
                                                                                Price:-
                                                                                {
                                                                                    currency
                                                                                }
                                                                                .
                                                                                <CurrencyConverter
                                                                                    from={
                                                                                        "INR"
                                                                                    }
                                                                                    to={
                                                                                        currency
                                                                                    }
                                                                                    value={
                                                                                        item.payablePrice *
                                                                                        1.05
                                                                                    }
                                                                                    precision={
                                                                                        2
                                                                                    }
                                                                                />
                                                                                /-
                                                                            </span>
                                                                        )}
                                                                        <span className="productSize">
                                                                            Quantity:{" "}
                                                                            {
                                                                                item.purchasedQty
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                {/* <div className="secondBoxOrder">
                    <div className="secondOrderID">
                        <h6>2</h6>
                        <span className="orderidd">Order ID:</span>
                        <span className="orderNo">323232DS</span>
                        <span className="closeDetail">See details</span>
                    </div>
                    <div className="datee">
                        <span className="dateeW">Date:</span>
                        <span className="month">27th August 2020</span>
                    </div>
                    <div className="statusBox">
                        <span className="Status">Status:</span>
                        <span className="Delivered">Delivered</span>
                    </div>
                </div>
                <div className="ThirdBoxOrder">
                    <div className="secondOrderID">
                        <h6>3</h6>
                        <span className="orderidd">Order ID:</span>
                        <span className="orderNo">323232DS</span>
                        <span className="closeDetail">See details</span>
                    </div>
                    <div className="datee">
                        <span className="dateeW">Date:</span>
                        <span className="month">27th August 2020</span>
                    </div>
                    <div className="statusBox">
                        <span className="Status">Status:</span>
                        <span className="Delivered">Delivered</span>
                    </div>
                </div> */}
            </div>
            <hr id="linee"></hr>
            <div className="cardss">
                <div className="rcardd1">
                    <span>
                        <Link to="/shop" style={{ color: "#4D4D4D" }}>
                            SHOP
                        </Link>
                    </span>
                </div>
                <div className="rcard3">
                    <span>
                        <Link to="/categories" style={{ color: "#4D4D4D" }}>
                            CATEGORIES
                        </Link>
                    </span>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Profile;
