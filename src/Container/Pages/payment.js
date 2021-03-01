import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import axios from "../../helpers/axios";
import "./payment.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cart.action";
import CurrencyConverter from "./CurrencyConvert";
import { fx } from "money";

const Payment = (props) => {
    const cart = useSelector((state) => state.cart);
    const { currency } = useSelector((state) => state.currency);

    const dispatch = useDispatch();
    var amount = 0;

    const [paymentMethod, setPaymentMethod] = useState("");
    // const [amount, setAmount] = useState(0);
    // const [currency, setCurrency] = useState("INR");
    const { orderAddress } = props.location;

    useEffect(() => {
        if (cartItems.length === 0) {
            dispatch(fetchCart());
        }
    }, []);

    let cartItems = [];

    if (cart.cartItems.cartItems) {
        cartItems = cart.cartItems.cartItems;
        amount = cart.cartItems.totalAmount;
    }

    console.log(orderAddress);

    const changePaymentMethod = (e) => {
        const { name } = e.target;

        setPaymentMethod(name);
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async () => {
        // let amount = 0;

        // for (let index = 0; index < cartItems.length; index++) {
        //     amount +=
        //         cartItems[index].product.price * cartItems[index].quantity;
        // }

        if (cartItems.length === 0) {
            alert("Cannot order an empty cart!!");
            return;
        }

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            console.error("Razorpay SDK failed to load.");
            return;
        }

        if (!orderAddress) {
            alert("Please select an address");
            return;
        }

        const result = await axios.post("/createOrder/razorpay", {
            paymentMethod,
            currency,
            addressId: orderAddress._id,
        });

        console.log(result.data);

        if (!result) {
            console.error("Server error.");
            return;
        }

        const {
            totalAmount: amount,
            paymentData: { orderId: order_id, currency: currencyRes },
        } = result.data.order;

        console.log(amount, order_id, currencyRes);

        if (currencyRes != "INR") {
            amount = await fx.convert(amount, { from: "INR", to: currencyRes });
        }

        const options = {
            key: "rzp_test_i7F44AtOei6anE",
            amount: amount.toString(),
            currency: currencyRes,
            name: "Test Name",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.get(
                    `/addOrder/razorpay?orderCreationId=${order_id}&razorpayPaymentId=${response.razorpay_payment_id}&razorpayOrderId=${response.razorpay_order_id}&razorpaySignature=${response.razorpay_signature}`
                );

                if (result.data) {
                    alert("Payment Successful");
                    window.location.replace("/")
                } else {
                    alert("Payment Unsuccessful");
                }
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const displayPaypal = async () => {
        // let amount = 0;

        // for (let index = 0; index < cartItems.length; index++) {
        //     amount +=
        //         cartItems[index].product.price * cartItems[index].quantity;
        // }

        if (cartItems.length === 0) {
            alert("Cannot order an empty cart!!");
            return;
        }

        if (!orderAddress) {
            alert("Please select an address");
            return;
        }

        const result = await axios.post("/createOrder/paypal", {
            paymentMethod,
            currency: "INR",
            addressId: orderAddress._id,
        });

        console.log(result.data);

        window.location.replace(result.data.redirect_uri);
    };

    console.log(orderAddress);

    return (
        <div>
            <Header />

            <div className="paymentWay">
                <p className="mycartPayment">My cart</p>
                <hr className="mycartPaymentLine"></hr>
                <p className="orderPayment">Order details</p>
                <hr className="orderPaymentLine"></hr>
                <p className="finalPayment">Payment</p>
            </div>

            <p className="paymentHeadline">payment...</p>

            <div className="paymentBoxMain">
                <div className="paymentOption">
                    <p className="headingPaymentOption">
                        Select payment option
                    </p>
                    <div className="boxPaymentOption">
                        <table>
                            <tbody>
                                {/* <tr> */}
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            name="razor"
                                            checked={paymentMethod === "razor"}
                                            id="1"
                                            onChange={changePaymentMethod}
                                            style={{ marginRight: "10px" }}
                                        />{" "}
                                        Pay with Razorpay
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="radio"
                                            name="paypal"
                                            checked={paymentMethod === "paypal"}
                                            id="2"
                                            onChange={changePaymentMethod}
                                            style={{ marginRight: "10px" }}
                                        />{" "}
                                        Pay with PayPal
                                    </td>
                                </tr>
                                {/* </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="summaryDetail">
                    <div className="priceSummarybox">
                        <p id="priceSummaryHeading">Price Summary</p>
                        <div className="discountPrice">
                            <p id="discountName">Discount:</p>
                            <p id="discountPriceValue">00.00</p>
                        </div>
                        <div className="bagTotalPrice">
                            <p id="bagTotal">Bag Total(in {currency}):</p>
                            {currency === "INR" && (
                                <p id="bagTotalValue">{amount}</p>
                            )}

                            {currency !== "INR" && (
                                <div id="bagTotalValue">
                                    <CurrencyConverter
                                        from={"INR"}
                                        to={currency}
                                        value={amount * 1.05}
                                        precision={2}
                                    />
                                </div>
                            )}
                        </div>
                        {currency && (
                            <button
                                id="confirmPayButton"
                                onClick={
                                    paymentMethod === "razor"
                                        ? displayRazorpay
                                        : displayPaypal
                                }
                            >
                                Confirm and Pay
                            </button>
                        )}
                    </div>
                    {orderAddress && (
                        <div className="userDetails">
                            <div className="userName">
                                <p id="nameHeading">Name:</p>
                                <p id="nameOfPerson">{orderAddress.name}</p>
                            </div>
                            <div className="addressDetail">
                                <p id="useraddressDetail">My Address:</p>
                                <p className="addressLineDetail">
                                    {orderAddress.address}
                                    <br />
                                    {orderAddress.locality}
                                    <br />
                                    {orderAddress.pinCode}
                                </p>
                            </div>
                            <div className="landmarkDetails">
                                <p id="landmarkHeading">Landmark:</p>
                                <p id="locationUser">{orderAddress.landmark}</p>
                            </div>
                            <div className="contactDetails">
                                <p id="contactHeading">Contact Number:</p>
                                <p id="phoneNoUser">
                                    {orderAddress.mobileNumber}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <hr className="quend" />
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

export default Payment;
