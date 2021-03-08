import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearFromCart, fetchCart } from "../../actions/cart.action";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import "./Cart.css";
import CurrencyConverter from "./CurrencyConvert";

const Cart = (props) => {
    const cart = useSelector((state) => state.cart);
    const { currency } = useSelector((state) => state.currency);

    const { cartItems } = cart.cartItems;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, []);

    let totalPrice = 0;

    if (cartItems) {
        totalPrice = cart.cartItems.totalAmount;
    }

    console.log(cartItems);

    return (
        <div>
            <Header />
            <div className="paymentWay">
                <p className="mycartPayment">My cart</p>
                <hr className="mycartLineTo"></hr>
                <p className="orderPaymentChange">Order details</p>
                <hr className="orderSummaryPageLine"></hr>
                <p className="orderSummaryfinalPayment">Payment</p>
            </div>
            <p className="myCartHeadline">my cart...</p>
            <div className="myCartMainBox">
                <div className="CartBox">
                    {cartItems && (
                        <p className="itemNoHeading">
                            {cartItems.length} Items
                        </p>
                    )}

                    {cartItems &&
                        cartItems.map((item) => (
                            <div className="givenOrderNo1" key={item._id}>
                                <div className="imageoftheProduct1">
                                    <img
                                        style={{
                                            height: "100%",
                                            maxWidth: "100%",
                                        }}
                                        src={`https://api.tilakshringar.com/public/${item.product.productPictures[0].img}`}
                                        alt="Product Image"
                                    />
                                </div>
                                <div className="detailsoftheProduct1">
                                    <p className="nameoftheProductGiven">
                                        {item.product.name}
                                        <span
                                            className="editTheAddress"
                                            style={{ float: "right" }}
                                            onClick={() =>
                                                dispatch(clearFromCart(item))
                                            }
                                        >
                                            {" "}
                                            Delete{" "}
                                        </span>
                                    </p>
                                    <p className="priceoftheGivenProduct">
                                        {currency === "INR" && (
                                            <span id="price1">
                                                Rs. {item.price}/-
                                            </span>
                                        )}

                                        {currency !== "INR" && (
                                            <h2 id="price1">
                                                {currency}.
                                                <CurrencyConverter
                                                    from={"INR"}
                                                    to={currency}
                                                    value={item.price * 1.05}
                                                    precision={2}
                                                />
                                                /-
                                            </h2>
                                        )}
                                    </p>

                                    {item.product.areSizes && (
                                        <div className="tagsOfGivenProduct">
                                            <p
                                                style={{
                                                    color: "#2D2D2D",
                                                    width: "2.928vw",
                                                    height: "1.537vw",
                                                }}
                                            >
                                                Size:
                                            </p>
                                            <p
                                                style={{
                                                    color: "#ADADAD",
                                                    width: "22.548vw",
                                                }}
                                            >
                                                <span>
                                                    {item.size.sizeValue}
                                                </span>
                                                <span>
                                                    {" " + item.size.sizeUnit}
                                                </span>
                                            </p>
                                        </div>
                                    )}

                                    <div className="descriptionofGivenProduct">
                                        <p
                                            style={{
                                                color: "#2D2D2D",
                                                height: "1.537vw",
                                            }}
                                        >
                                            Quantity:
                                        </p>
                                        <p style={{ color: "#ADADAD" }}>
                                            {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="referenceCodeBox">
                    <p className="ReferenceCodeHeading">Reference Code</p>
                    <div className="RefCodeBoxWithButton">
                        <input
                            className="RefCodeInput"
                            type="text"
                            placeholder="Enter Here"
                        ></input>
                        <button className="RefButton">APPLY</button>
                    </div>
                    <div className="DiscountBox">
                        <p className="DiscountHeading">Discount:</p>
                        <p className="discountMoney">00.00</p>
                    </div>
                    <div className="bagTotalPrice">
                        <p id="bagTotal">Bag Total(in {currency}):</p>
                        {currency === "INR" && (
                            <p id="bagTotalValue">{totalPrice}</p>
                        )}

                        {currency !== "INR" && (
                            <p id="bagTotalValue">
                                <CurrencyConverter
                                    from={"INR"}
                                    to={currency}
                                    value={totalPrice * 1.05}
                                    precision={2}
                                />
                            </p>
                        )}
                    </div>
                    <Link to="/orderSummary">
                        <button className="RefProceedButton">Proceed</button>
                    </Link>
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

export default Cart;
