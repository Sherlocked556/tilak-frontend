import React, { useEffect, useState } from "react";
import Header from "../Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import "./orderSummary.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFromCart, fetchCart } from "../../actions/cart.action";
import AddNewAddressModal from "./AddNewAddresModal";
import { deleteAddress, fetchAddress } from "../../actions/address.action";
import CurrencyConverter from "./CurrencyConvert";

function OrderSummary() {
    const cart = useSelector((state) => state.cart);
    const { address } = useSelector((state) => state.address);
    const { currency } = useSelector((state) => state.currency);

    const [orderAddress, setOrderAddress] = useState();

    let userAddress = [];
    let totalPrice = 0;

    let cartItems = [];

    if (address[0]) {
        userAddress = address[0].address;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems.length === 0) {
            dispatch(fetchCart());
        }
        dispatch(fetchAddress());
    }, []);

    if (cart.cartItems.cartItems) {
        cartItems = cart.cartItems.cartItems;
        totalPrice = cart.cartItems.totalAmount;
    }
    // console.log(userAddress);

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
                    {userAddress &&
                        userAddress.map((address) => (
                            <div
                                className="userDetailAddressBox"
                                onClick={() => setOrderAddress(address)}
                                key={address._id}
                            >
                                <div className="customerNameBox">
                                    <p className="customerNameOrderSummary">
                                        Name:
                                    </p>
                                    <p className="customerFullName">
                                        {address.name}
                                    </p>
                                    {orderAddress &&
                                        orderAddress._id === address._id && (
                                            <AiOutlineCheckCircle id="addressTickIcon" />
                                        )}
                                    {(!orderAddress ||
                                        orderAddress._id !== address._id) && (
                                        <AiOutlineCheckCircle id="addressTickUnSelectedIcon" />
                                    )}
                                </div>
                                <div className="customerAddressBox">
                                    <p>{address.address}</p>
                                    <p>{address.locality}</p>
                                    <p>{address.pinCode}</p>
                                </div>
                                <div className="customerLandmarkBox">
                                    <p className="customerLandmarkDetail">
                                        Landmark:
                                    </p>
                                    <p className="customerLocationDetail">
                                        {address.landmark}
                                    </p>
                                </div>
                                <div className="phoneNoCustomerBox">
                                    <p className="customerContactHeading">
                                        Contact Number:
                                    </p>
                                    <p className="customerContactNoDetail">
                                        {address.mobileNumber}
                                    </p>
                                    <p
                                        className="editTheAddress"
                                        onClick={() =>
                                            dispatch(deleteAddress(address._id))
                                        }
                                    >
                                        Delete
                                    </p>
                                </div>
                            </div>
                        ))}

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
                    <div className="discountPrice">
                        <p id="discountName">Shipping Cost(in {currency}):</p>
                        {currency === "INR" && (
                            <p id="discountPriceValue">{50.0}</p>
                        )}

                        {currency !== "INR" && (
                            <p id="discountPriceValue">
                                <CurrencyConverter
                                    from={"INR"}
                                    to={currency}
                                    value={50.0 * 1.05}
                                    precision={2}
                                />
                            </p>
                        )}
                    </div>
                    <div
                        className="discountPrice"
                        // style={{ marginTop: "2.5em", marginBottom: "2em" }}
                    >
                        <p id="discountName">Total Amount(in {currency}):</p>
                        {currency === "INR" && (
                            <p id="discountPriceValue">{totalPrice}</p>
                        )}

                        {currency !== "INR" && (
                            <p id="discountPriceValue">
                                <CurrencyConverter
                                    from={"INR"}
                                    to={currency}
                                    value={totalPrice * 1.05}
                                    precision={2}
                                />
                            </p>
                        )}
                    </div>
                    <div className="bagTotalPrice1">
                        <p id="bagTotal1">Bag Total(in {currency}):</p>
                        {currency === "INR" && (
                            <p id="bagTotalValue1">{totalPrice + 50}</p>
                        )}

                        {currency !== "INR" && (
                            <p id="bagTotalValue1">
                                <CurrencyConverter
                                    from={"INR"}
                                    to={currency}
                                    value={(totalPrice + 50) * 1.05}
                                    precision={2}
                                />
                            </p>
                        )}
                    </div>

                    {!orderAddress && (
                        <p id="priceSummaryHeading">Select an Address</p>
                    )}

                    {orderAddress && cartItems.length > 0 && (
                        <Link
                            to={{
                                pathname: "/payment",
                                orderAddress: orderAddress,
                            }}
                        >
                            <button id="confirmPayButton">
                                Confirm and Pay
                            </button>

                            {(!cartItems || cartItems.length <= 0) && (
                                <p id="priceSummaryHeading">No Items in Cart</p>
                            )}
                        </Link>
                    )}
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
                                    <span id="price1">Rs. {item.price}/-</span>
                                )}

                                {currency !== "INR" && (
                                    <span id="price1">
                                        {currency}.
                                        <CurrencyConverter
                                            from={"INR"}
                                            to={currency}
                                            value={item.price * 1.05}
                                            precision={2}
                                        />
                                        /-
                                    </span>
                                )}
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
                            {/* <p className="editTheAddress">Delete</p> */}
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
