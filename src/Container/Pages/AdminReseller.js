import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button, Dropdown, Icon, Tab, Table } from "semantic-ui-react";
import {
    deleteReseller,
    fetchAllRequest,
    fetchAllReseller,
} from "../../actions/reseller.action";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import AdminAddResellerModal from "./AdminAddResellerModal";
import AdminProfile from "./AdminProfile";
import "./AdminReseller.css";
import AdminViewResellerModal from "./AdminViewResellerModal";
import { ResellerRequestTable } from "./ResellerRequestTable";

const ResellerTable = ({ resellers, loading }) => {
    const dispatch = useDispatch();

    console.log("from tab ", resellers);

    return (
        <Tab.Pane loading={loading}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>S. No.</Table.HeaderCell>
                        <Table.HeaderCell>Reseller ID</Table.HeaderCell>
                        <Table.HeaderCell>Reseller Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Code</Table.HeaderCell>
                        <Table.HeaderCell>Due Pay</Table.HeaderCell>
                        <Table.HeaderCell>Products Sold</Table.HeaderCell>
                        <Table.HeaderCell>View / Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {resellers &&
                        resellers
                            .slice()
                            .reverse()
                            .map((reseller, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{index}</Table.Cell>
                                    <Table.Cell>
                                        {reseller._id.substr(
                                            reseller._id.length - 5
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {reseller.userId.firstName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {reseller.userId.email}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {reseller.resellerCode}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {reseller.due
                                            ? reseller.due.points * 100
                                            : 0}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {reseller.orders.length}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <AdminViewResellerModal
                                            reseller={reseller}
                                        />

                                        <Button
                                            icon
                                            onClick={() =>
                                                dispatch(
                                                    deleteReseller(reseller._id)
                                                )
                                            }
                                        >
                                            <Icon name="delete" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                </Table.Body>
            </Table>
        </Tab.Pane>
    );
};

function AdminReseller() {
    const dispatch = useDispatch();
    let { adminResellers, loading, requests } = useSelector(
        (state) => state.reseller
    );

    useEffect(() => {
        dispatch(fetchAllReseller());
        dispatch(fetchAllRequest());
    }, []);

    const panes = [
        {
            menuItem: "Resellers",
            render: () => (
                <ResellerTable resellers={adminResellers} loading={loading} />
            ),
        },
        {
            menuItem: "Requests",
            render: () => (
                <ResellerRequestTable requests={requests} loading={loading} />
            ),
        },
    ];

    console.log(adminResellers);
    console.log("request", requests);

    return (
        <div>
            <Header></Header>
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
                    <hr id="AdminResellerLine2" />
                    <hr id="AdminResellerLine3" />
                    <hr id="AdminResellerLine4" />
                </div>
                <div className="categoryProductBtn">
                    <AdminAddResellerModal />
                    <p className="ResellerNumber">230 resellers</p>
                </div>
                <div className="SearchBilling"></div>
                <div className="AdminProductDetails">
                    {adminResellers && (
                        <Tab
                            panes={panes}
                            resellers={adminResellers}
                            requests={requests}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
            <hr className="endLine" />
            <Footer />
            <ToastContainer />
        </div>
    );
}

export default AdminReseller;
