import React, { useEffect } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import AdminProfile from "./AdminProfile";
import "./AdminBilling.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {} from "semantic-ui-react";
import { fetchAllAdminOrders } from "../../actions/order.action";
import dayjs from "dayjs";

function emptyOpen() {
    document.querySelector(".adminBillingPopUp").style.display = "flex";
}
function emptyClose() {
    document.querySelector(".adminBillingPopUp").style.display = "none";
}

const AdminBilling = () => {
    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllAdminOrders());
    }, []);

    console.log(orders.adminOrders);

    if (orders.adminOrders[0]) {
        console.log(
            dayjs(orders.adminOrders[0].createdAt).format("DD MMMM YYYY")
        );
    }

    return (
        <div>
            <Header />
            <h2 className="heading">my profile...</h2>
            <div className="Aboutttt">
                <AdminProfile />
            </div>
            <div className="adminBox">
                <div className="adminNav">
                    <h6 className="adminProducts">
                        <Link to="/Admin" style={{ color: "#4D4D4D" }}>
                            PRODUCTS
                        </Link>
                    </h6>
                    <h6 className="adminBilling">
                        <Link to="/AdminBilling" style={{ color: "#4D4D4D" }}>
                            BILLING
                        </Link>
                    </h6>
                    <h6 className="adminReseller">
                        <Link to="/AdminReseller" style={{ color: "#4D4D4D" }}>
                            RESELLERS
                        </Link>
                    </h6>
                    <h6 className="adminBlogs">
                        <Link to="/AdminBlogs" style={{ color: "#4D4D4D" }}>
                            BLOGS
                        </Link>
                    </h6>
                    <h6 className="adminInventory">
                        <Link to="/AdminInventory" style={{ color: "#4D4D4D" }}>
                            INVENTORY
                        </Link>
                    </h6>
                </div>
                <div className="productLine">
                    <hr id="billingLine1"></hr>
                    <hr id="billingLine2" />
                    <hr id="billingLine3" />
                </div>
                <div className="categoryProductBtn">
                    <button className="categoryBtn">DOWNLOAD LIST</button>
                    <button onClick={emptyOpen} className="productBtn">
                        EMPTY SECTION
                    </button>
                    {orders.adminOrders && (
                        <p className="productNumber">
                            {orders.adminOrders.length} products sold
                        </p>
                    )}
                </div>
                <div className="SearchBilling"></div>
                <div className="AdminProductDetails">
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "4.7vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "15.422vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "24.963vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "33.382vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "41.508vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "49.414vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "58.199vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <hr
                        style={{
                            border: "0.073vw solid #707070",
                            width: "0",
                            height: "45.388vw",
                            marginLeft: "67.350vw",
                            position: "absolute",
                            marginTop: "0",
                        }}
                    ></hr>
                    <div className="billingCols">
                        <p className="serialNo">S. No.</p>
                        <p className="orderIdBill">Ordered ID</p>
                        <p className="orderDateBill">Ordered Date</p>
                        <p className="orderStatusBill">Status</p>
                        <p className="orderQuantityBill">Quantities</p>
                        <p className="orderUserType">User Type</p>
                        <p className="orderNameBill">Name</p>
                        <p className="orderTotalAmount">Total Amount</p>
                        <p className="orderPaymentMethod">Payment Method</p>
                    </div>
                    <hr id="AdminLine"></hr>
                    <div className="AdminBillingOuterBox">
                        {orders.adminOrders &&
                            orders.adminOrders.map((order) => {
                                return (
                                    <div className="productDetailsAdminBilling">
                                        <p className="oneSerial">
                                            {order._id.substr(
                                                order._id.length - 5
                                            )}
                                        </p>
                                        <p className="oneId">
                                            {order.paymentData.orderId}
                                        </p>
                                        <p className="oneDate">
                                            {" "}
                                            {dayjs(order.createdAt).format(`DD
                                            MMMM YYYY`)}
                                        </p>
                                        <p className="oneStatus">
                                            {" "}
                                            {order.orderStatus[
                                                order.orderStatus.length - 1
                                            ]
                                                ? order.orderStatus[
                                                      order.orderStatus.length -
                                                          1
                                                  ].type
                                                : "ordered"}{" "}
                                            {/* {order.paymentStatus} */}
                                        </p>
                                        <p className="oneQuantity">
                                            {" "}
                                            {order.items.length}{" "}
                                        </p>
                                        <p className="oneUsertype">Customer</p>
                                        <p className="oneName">Mohit Gopal</p>
                                        <p className="oneTotal">
                                            {order.totalAmount}
                                        </p>
                                        <p className="onePayment">
                                            {order.paymentType}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <hr className="endLine" />

            <Footer />
            <div className="adminBillingPopUp">
                <div className="adminBillingSmallPopUp">
                    <p className="BillingsectionHeading">Billing section</p>
                    <p className="EmptysectionLine">
                        Are you sure you want to empty the section?
                    </p>
                    <div className="billingButtons">
                        <button
                            onClick={emptyClose}
                            className="billingButtonNo"
                        >
                            {" "}
                            No
                        </button>
                        <button className="billingButtonYes">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminBilling;
