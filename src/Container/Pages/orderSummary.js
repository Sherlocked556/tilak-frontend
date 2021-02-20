import React, { useEffect } from "react";
import Header from "../Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import "./orderSummary.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cart.action";
import AddNewAddressModal from "./AddNewAddresModal";

function OrderSummary() {
    const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems.length === 0) {
            dispatch(fetchCart());
        }
    }, []);

    let totalPrice = 0;

    for (let index = 0; index < cartItems.length; index++) {
        totalPrice +=
            cartItems[index].product.price * cartItems[index].quantity;
    }

    return (
        <div>
            <Header />
            <div className="paymentWay">
                <p className="mycartPayment">My cart</p>
                <hr className="mycartPaymentLine"></hr>
                <p className="orderPayment">Order details</p>
                <hr className="orderSummaryPageLine"></hr>
                <p className="orderSummaryfinalPayment">Payment</p>
            </div>

            <p className="orderSummaryHeadline">order summary...</p>

            <div className="selectDeliveryBox">
                <div className="deliveryAddressBox">
                    <p className="selectDeliveryHeading">
                        Select delivery address
                    </p>
                    <div className="userDetailAddressBox">
                        <div className="customerNameBox">
                            <p className="customerNameOrderSummary">Name:</p>
                            <p className="customerFullName">Mohit Gopal</p>
                            <AiOutlineCheckCircle id="addressTickIcon" />
                        </div>
                        <div className="customerAddressBox"></div>
                        <div className="customerLandmarkBox">
                            <p className="customerLandmarkDetail">Landmark:</p>
                            <p className="customerLocationDetail">Location</p>
                        </div>
                        <div className="phoneNoCustomerBox">
                            <p className="customerContactHeading">
                                Contact Number:
                            </p>
                            <p className="customerContactNoDetail">
                                9876543210
                            </p>
                            <p className="editTheAddress">Edit</p>
                        </div>
                    </div>
                    <div
                        className=""
                        style={{
                            marginRight: "auto",
                            marginLeft: "auto",
                            marginTop: "1em",
                        }}
                    >
                        <AddNewAddressModal />
                    </div>
                </div>

                <div className="priceOrderSummaryBox">
                    <p id="priceSummaryHeading">Price Summary</p>
                    <div className="discountPrice">
                        <p id="discountName">Discount:</p>
                        <p id="discountPriceValue">00.00</p>
                    </div>
                    <div className="bagTotalPrice">
                        <p id="bagTotal">Bag Total(in rupees):</p>
                        <p id="bagTotalValue">{totalPrice}</p>
                    </div>
                    <Link to="/payment">
                        <button id="confirmPayButton">Confirm and Pay</button>
                    </Link>
                </div>
            </div>

            <div className="orderSummaryCartBox">
                <p className="itemNoHeading">{cartItems.length} Items</p>
                {cartItems.map((item) => (
                    <div className="givenOrderNo1" key={item._id}>
                        <div className="imageoftheProduct1">
                            <img
                                style={{
                                    height: "100%",
                                    maxWidth: "100%",
                                }}
                                src={`http://localhost:2000/public/${item.product.productPictures[0].img}`}
                                alt="Product Image"
                            />
                        </div>
                        <div className="detailsoftheProduct1">
                            <p className="nameoftheProductGiven">
                                {item.product.name}
                            </p>
                            <p className="priceoftheGivenProduct">
                                Rs. {item.product.price}/-{" "}
                            </p>
                            <div className="tagsOfGivenProduct">
                                <p
                                    style={{
                                        color: "#2D2D2D",
                                        width: "2.928vw",
                                        height: "1.537vw",
                                    }}
                                >
                                    Tags:
                                </p>
                                <p
                                    style={{
                                        color: "#ADADAD",
                                        width: "22.548vw",
                                    }}
                                >
                                    choli, white, small
                                </p>
                            </div>
                            <div className="descriptionofGivenProduct">
                                <p
                                    style={{
                                        color: "#2D2D2D",
                                        height: "1.537vw",
                                    }}
                                >
                                    Description:
                                </p>
                                <p style={{ color: "#ADADAD" }}>
                                    Lorem ipsum dolor sit amet, consetetur{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
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
}
export default OrderSummary;
