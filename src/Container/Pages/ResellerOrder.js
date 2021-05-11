import React, { useEffect } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import ResellerProfile from "./ResellerProfile";
import "./ResellerOrder.css";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { Button, Icon, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResellerById } from "../../actions/reseller.action";
import dayjs from "dayjs";
import AdminViewOrderDetails from "./AdminViewOrderDetails";
import { ToastContainer } from "react-toastify";

function ResellerOrder() {
    const { resellerDetails } = useSelector((state) => state.reseller);
    const dispatch = useDispatch();

    useEffect(() => {
        let user = jwt.decode(localStorage.getItem("access-token"));

        if (user.role === "reseller") {
            dispatch(fetchResellerById(user._id));
        }
    }, []);

    // console.log("resellerDetails", resellerDetails);

    return (
        <div>
            <Header></Header>
            <h2 className="heading">my resells...</h2>
            {/* <div className="Aboutttt">
                <ResellerProfile />
            </div> */}
            <div className="adminBox">
                <div className="adminNav">
                    <h6 className="ResllerOrder">
                        <Link to="/ResellerOrder" style={{ color: "#4D4D4D" }}>
                            ORDERS
                        </Link>
                    </h6>
                    <h6 className="ResellerEarning">
                        <Link
                            to="/ResellerEarning"
                            style={{ color: "#4D4D4D" }}
                        >
                            EARNINGS
                        </Link>
                    </h6>
                    {/* <h6 className="ResellerNotification">
                        <Link
                            to="/ResellerNotification"
                            style={{ color: "#4D4D4D" }}
                        >
                            NOTIFICATIONS
                        </Link>
                    </h6> */}
                </div>
                <div className="productLine">
                    <hr id="ResellerOrderLine2" />
                    <hr id="adminLine" />
                </div>
                <div className="categoryResellerBtn">
                    <p className="CouponCode">
                        List of orders who applied your coupon code. For any
                        query contact the Admin.
                    </p>
                    {resellerDetails && (
                        <>
                            <p className="CouponCodeValue">
                                Coupon URL:{" "}
                                {`https://tilakshringar.com/?reseller=${resellerDetails.resellerCode}`}
                            </p>
                            <p className="CouponCodeValue">
                                Coupon Code: {resellerDetails.resellerCode}
                            </p>
                        </>
                    )}
                </div>
                <div className="SearchDrop"></div>
                <div className="AdminProductDetails">
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Sr. No.</Table.HeaderCell>
                                <Table.HeaderCell>Ordered ID</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Ordered Date
                                </Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>User Name</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Phone Number
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Total Amount
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Payment Method
                                </Table.HeaderCell>
                                <Table.HeaderCell>Requested</Table.HeaderCell>
                                <Table.HeaderCell>Claimed</Table.HeaderCell>
                                <Table.HeaderCell>View</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {resellerDetails &&
                                resellerDetails.orders &&
                                resellerDetails.orders.length > 0 &&
                                resellerDetails.orders
                                    .slice()
                                    .reverse()
                                    .map((order, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>
                                                {
                                                    order.orderId.paymentData
                                                        .orderId
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {dayjs(order.orderId.createdAt)
                                                    .format(`DD
                                            MMMM YYYY`)}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {order.orderId.paymentStatus}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {
                                                    order.orderId.billingAddress
                                                        .name
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {
                                                    order.orderId.billingAddress
                                                        .mobileNumber
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {order.orderId.paymentData
                                                    .currency +
                                                    " " +
                                                    order.orderId.totalAmount}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {order.orderId.paymentType}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {order.requested ? "Yes" : "No"}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {order.claimed ? "Yes" : "No"}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <AdminViewOrderDetails
                                                    order={order.orderId}
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <hr className="endLine" />
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default ResellerOrder;
