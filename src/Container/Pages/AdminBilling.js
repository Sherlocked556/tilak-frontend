import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import AdminProfile from "./AdminProfile";
import "./AdminBilling.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Button, Icon, Table } from "semantic-ui-react";
import { fetchAllAdminOrders } from "../../actions/order.action";
import dayjs from "dayjs";

function emptyOpen() {
    document.querySelector(".adminBillingPopUp").style.display = "flex";
}
function emptyClose() {
    document.querySelector(".adminBillingPopUp").style.display = "none";
}

const OrderRow = ({ items }) => {
    // console.log(items);

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    {/* <Table.HeaderCell /> */}
                    <Table.HeaderCell>S. No.</Table.HeaderCell>
                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Size</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item._id}>
                        <Table.Cell>
                            {item._id.substr(item._id.length - 5)}
                        </Table.Cell>
                        <Table.Cell> {item.productId.name} </Table.Cell>
                        <Table.Cell> {item.payablePrice} </Table.Cell>
                        <Table.Cell> {item.purchasedQty} </Table.Cell>

                        {item.purchasedSize !== undefined && (
                            <Table.Cell>
                                {" "}
                                {item.purchasedSize.sizeValue +
                                    " " +
                                    item.purchasedSize.sizeUnit}{" "}
                            </Table.Cell>
                        )}
                        {item.purchasedSize === undefined && (
                            <Table.Cell> Null </Table.Cell>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

const AdminBilling = () => {
    const orders = useSelector((state) => state.orders);
    const [showDetails, setShowDetails] = useState(false);
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
                <div
                    className="AdminProductDetails"
                    style={{ overflowY: "scroll" }}
                >
                    <Table selectable>
                        <Table.Header>
                            <Table.Row>
                                {/* <Table.HeaderCell /> */}
                                <Table.HeaderCell>S. No.</Table.HeaderCell>
                                <Table.HeaderCell>Ordered ID</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Ordered Date
                                </Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Quantities</Table.HeaderCell>
                                <Table.HeaderCell>User Type</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Total Amount
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Payment Method
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Accordion
                            fluid={true}
                            as={Table.Body}
                            panels={orders.adminOrders.map((order) => {
                                return {
                                    key: order._id,
                                    class: "tr",
                                    title: {
                                        as: Table.Row,
                                        className: "",
                                        children: [
                                            <Table.Cell key={`id_${order._id}`}>
                                                {order._id.substr(
                                                    order._id.length - 5
                                                )}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`order_id_${order._id}`}
                                            >
                                                {order.paymentData.orderId}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`order_date_${order._id}`}
                                            >
                                                {dayjs(order.createdAt)
                                                    .format(`DD
                                            MMMM YYYY`)}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`order_status_${order._id}`}
                                            >
                                                {order.orderStatus[
                                                    order.orderStatus.length - 1
                                                ]
                                                    ? order.orderStatus[
                                                          order.orderStatus
                                                              .length - 1
                                                      ].type
                                                    : "ordered"}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`item_length_${order._id}`}
                                            >
                                                {order.items.length}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`user_role_${order._id}`}
                                            >
                                                {order.user.role}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`username_${order._id}`}
                                            >
                                                {order.user.firstName}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`total_amount_${order._id}`}
                                            >
                                                {order.totalAmount}
                                            </Table.Cell>,
                                            <Table.Cell
                                                key={`payment_type_${order._id}`}
                                            >
                                                {order.paymentType}
                                            </Table.Cell>,
                                        ],
                                    },
                                    content: {
                                        key: order._id,
                                        class: "tr",
                                        children: (
                                            <OrderRow items={order.items} />
                                        ),
                                    },
                                };
                            })}
                        />
                    </Table>
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
