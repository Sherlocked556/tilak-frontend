import React, { useEffect } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import ResellerProfile from "./ResellerProfile";
import "./ResellerEarning.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
    createResellerRequest,
    fetchRequestByReseller,
    fetchResellerById,
} from "../../actions/reseller.action";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";

const ResellerEarning = () => {
    const dispatch = useDispatch();
    const { resellerRequests, resellerDetails } = useSelector(
        (state) => state.reseller
    );

    useEffect(() => {
        let user = jwt.decode(localStorage.getItem("access-token"));

        dispatch(fetchRequestByReseller(user._id));

        dispatch(fetchResellerById(user._id));
    }, []);

    const handleCreateRequest = (resellerId) => {
        dispatch(createResellerRequest(resellerId));
    };

    console.log("resellerRequest", resellerRequests, resellerDetails);

    return (
        <div>
            <Header></Header>
            <h2 className="heading">my profile...</h2>
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
                    <hr id="EarningLine1"></hr>
                    <hr id="billingLine2" />
                    <hr id="billingLine3" />
                </div>
                <div className="categoryResellerBtn">
                    <p className="CouponCode">
                        Your earnings being a reseller to Tilak Shringar.
                    </p>
                    {resellerDetails && (
                        <>
                            <p className="CouponCodeValue">
                                Coupon URL:{" "}
                                {`http://localhost:3000/?reseller=${resellerDetails.resellerCode}`}
                            </p>
                            <p className="CouponCodeValue">
                                Coupon Code: {resellerDetails.resellerCode}
                            </p>
                        </>
                    )}
                </div>
                <div className="SearchDrop"></div>
                <div className="earningOuterBox">
                    <p className="earningSummaryHeading">SUMMARY</p>
                    {resellerDetails && resellerDetails.orders && (
                        <p className="earningOrderComplete">
                            Orders completed till date:{" "}
                            {resellerDetails.orders.length}
                        </p>
                    )}
                    <p className="TotalEarnings">
                        Total earnings: Rs {resellerDetails.totalPoints}
                    </p>
                    <div className="newEarningOuterBox">
                        <div className="newEarningInnerBox">
                            <p className="CostNewEarning">
                                New earnings: Rs{" "}
                                {resellerDetails.requestableAmount}
                            </p>
                            <button
                                className="sendRequestButton"
                                onClick={() =>
                                    handleCreateRequest(resellerDetails._id)
                                }
                            >
                                SEND REQUEST
                            </button>
                        </div>
                        {/* <AiOutlineCloseSquare id="earningCrossIcon" />
                        <AiOutlineCheckSquare id="earningCheckIcon" /> */}
                    </div>
                    <p className="Previouspayments">Previous payments:</p>
                    <div className="dataRecievedBox">
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>S. No.</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Date recieved
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Earnings
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {resellerRequests &&
                                    resellerRequests.length > 0 &&
                                    resellerRequests.map((request, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>
                                                {dayjs(request.date).format(`DD
                                            MMMM YYYY`)}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {request.status}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {request.amount}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table>
                    </div>
                    <p className="RequestAdmin">
                        Kindly request admin for due payments
                    </p>
                </div>
            </div>
            <hr className="endLine" />
            <Footer />
            <ToastContainer />
        </div>
    );
};
export default ResellerEarning;
