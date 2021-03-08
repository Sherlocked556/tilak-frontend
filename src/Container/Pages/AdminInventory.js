import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import AdminProfile from "./AdminProfile";
import "./AdminBilling.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdminOrders } from "../../actions/order.action";
import dayjs from "dayjs";
import { deleteBlog, fetchBlogs } from "../../actions/blog.action";
import { Table } from "semantic-ui-react";
import { MdDelete, MdEdit } from "react-icons/md";
import AdminAddBlog from "./AdminAddBlog";
import AdminEditBlog from "./AdminEditBlog";
import { ToastContainer } from "react-toastify";
import AdminAddInventory from "./AdminAddInventory";
import {
    deleteInventory,
    fetchInventory,
    fetchOneInventory,
} from "../../actions/inventory.action";
import AdminEditInventory from "./AdminEditInventory";

function openAddInventory() {
    document.querySelector(".AdminInventoryPopUp").style.display = "flex";
}
function closeAddInventory() {
    document.querySelector(".AdminInventoryPopUp").style.display = "none";
}

const AdminInventory = () => {
    const { inventory } = useSelector((state) => state.inventory);
    const [toBeEdited, setToBeEdited] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInventory());
    }, []);

    const handleInventoryDelete = (inventoryId) => {
        dispatch(deleteInventory(inventoryId));
    };

    const openEditInventory = (inventory) => {
        dispatch(fetchOneInventory(inventory._id));

        document.querySelector(".AdminEditInventoryPopUp").style.display =
            "flex";
    };
    const closeEditInventory = () => {
        document.querySelector(".AdminEditInventoryPopUp").style.display =
            "none";
    };

    console.log(toBeEdited);

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
                    <hr id="inventoryLine" />
                    <hr id="inventoryline1" />
                    <hr id="inventory2" />
                </div>
                <div className="categoryProductBtn">
                    <button className="productBtn" onClick={openAddInventory}>
                        ADD INVENTORY
                    </button>{" "}
                    <p className="productNumber">{inventory.length} items</p>
                </div>
                <div className="SearchBilling"></div>
                <div className="AdminProductDetails">
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Sr. No.</Table.HeaderCell>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Dated Added</Table.HeaderCell>
                                <Table.HeaderCell>Edit/Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {inventory &&
                                inventory.map((item, index) => (
                                    <Table.Row key={item._id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>
                                            {item.category.name}
                                        </Table.Cell>
                                        <Table.Cell>{item.name}</Table.Cell>
                                        <Table.Cell>
                                            {dayjs(item.createdAt).format(`DD
                                            MMMM YYYY`)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <MdDelete
                                                id="deleteButton"
                                                onClick={() =>
                                                    handleInventoryDelete(
                                                        item._id
                                                    )
                                                }
                                            />
                                            <MdEdit
                                                id="editButton"
                                                onClick={() =>
                                                    openEditInventory(item)
                                                }
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
            <div className="AdminInventoryPopUp">
                <AdminAddInventory closeProduct={closeAddInventory} />
            </div>

            <div className="AdminEditInventoryPopUp">
                <AdminEditInventory closeProduct={closeEditInventory} />
            </div>

            <ToastContainer />
        </div>
    );
};
export default AdminInventory;
