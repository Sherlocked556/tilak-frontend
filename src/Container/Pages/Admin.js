import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Footer from "../Footer/Footer";
import AdminProfile from "./AdminProfile";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiOutlineCheckSquare } from "react-icons/ai";
import "./Admin.css";
import AdminAddProduct from "./AdminAddProduct";
import AdminAddBlog from "./AdminAddBlog";
import axios from "../../helpers/axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProductById,
    getAllProducts,
    GetProductDetailsById,
    updateProducts,
} from "../../actions";
import AdminAddCategory from "./AdminAddCategory";
import AdminEditProduct from "./AdminEditProduct";
import { ToastContainer } from "react-toastify";
import { Dimmer, Loader, Table } from "semantic-ui-react";
import dayjs from "dayjs";

function openProduct() {
    document.querySelector(".AdminPopUp").style.display = "flex";
}
function closeProduct() {
    document.querySelector(".AdminPopUp").style.display = "none";
}

function openCategory() {
    document.querySelector(".AdminCategoryPopUp").style.display = "flex";
}
function closeCategory() {
    document.querySelector(".AdminCategoryPopUp").style.display = "none";
}

const Admin = () => {
    const dispatch = useDispatch();
    let { products } = useSelector((state) => state.product);
    const { productDetails, loading } = useSelector((state) => state.product);

    const [updateList, setUpdateList] = useState([]);
    const [toBeEdited, setToBeEdited] = useState({});
    // const [productList, setProductList] = useState([]);

    // const handleProductDelete = async (id) => {
    //     dispatch(deleteProductById(id));
    // };

    const openEditProduct = (product) => {
        setToBeEdited(product);
        dispatch(GetProductDetailsById({ params: { productId: product._id } }));

        document.querySelector(".AdminEditPopUp").style.display = "flex";
    };
    const closeEditProduct = () => {
        document.querySelector(".AdminEditPopUp").style.display = "none";
    };

    const handleQuantityUpdate = (id, inc) => {
        if (updateList.find((item) => item._id === id)) {
            setUpdateList(
                updateList.map((item) => {
                    if (item._id === id) {
                        return {
                            ...item,
                            quantity:
                                inc === true
                                    ? item.quantity + 1
                                    : item.quantity - 1,
                        };
                    } else {
                        return item;
                    }
                })
            );
        } else {
            setUpdateList(
                products.map((item) => {
                    if (item._id === id) {
                        return {
                            ...item,
                            quantity:
                                inc === true
                                    ? item.quantity + 1
                                    : item.quantity - 1,
                        };
                    } else {
                        return item;
                    }
                })
            );
        }
    };

    const handleAvailableUpdate = (id, isAvail) => {
        if (updateList.find((item) => item._id === id)) {
            setUpdateList(
                updateList.map((item) => {
                    if (item._id === id) {
                        return {
                            ...item,
                            availability: isAvail,
                        };
                    } else {
                        return item;
                    }
                })
            );
        } else {
            setUpdateList(
                products.map((item) => {
                    if (item._id === id) {
                        return {
                            ...item,
                            availability: isAvail,
                        };
                    } else {
                        return item;
                    }
                })
            );
        }
    };

    const handleProductUpdate = () => {
        dispatch(updateProducts(updateList));
    };

    useEffect(() => {
        // getAllProducts();

        dispatch(getAllProducts());
    }, []);

    console.log(updateList);

    if (updateList.length > 0) {
        products = updateList;
    }

    if (loading && !toBeEdited) {
        return (
            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
        );
    } else {
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
                            <Link
                                to="/AdminBilling"
                                style={{ color: "#4D4D4D" }}
                            >
                                BILLING
                            </Link>
                        </h6>
                        <h6 className="adminReseller">
                            <Link
                                to="/AdminReseller"
                                style={{ color: "#4D4D4D" }}
                            >
                                RESELLERS
                            </Link>
                        </h6>
                        <h6 className="adminBlogs">
                            <Link to="/AdminBlogs" style={{ color: "#4D4D4D" }}>
                                BLOGS
                            </Link>
                        </h6>
                        <h6 className="adminInventory">
                            <Link
                                to="/AdminInventory"
                                style={{ color: "#4D4D4D" }}
                            >
                                INVENTORY
                            </Link>
                        </h6>
                    </div>
                    <div className="productLine">
                        <hr id="adminLine2" />
                        <hr id="adminLine" />
                    </div>
                    <div className="categoryProductBtn">
                        <button className="categoryBtn" onClick={openCategory}>
                            ADD CATEGORY
                        </button>
                        <button className="productBtn" onClick={openProduct}>
                            ADD PRODUCT
                        </button>

                        {products && (
                            <p className="productNumber">
                                {products.length} products in total
                            </p>
                        )}
                    </div>
                    <div className="SearchDrop"></div>
                    <div className="categoryProductBtn">
                        <button
                            className="productBtn"
                            onClick={handleProductUpdate}
                        >
                            APPLY CHANGES
                        </button>
                    </div>
                    <div
                        className="AdminProductDetails"
                        style={{ overflowY: "scroll" }}
                    >
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Sr. No.</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Product ID
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Quantity
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Dated Added
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Edit</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {products &&
                                    products.length > 0 &&
                                    products.map((product, index) => (
                                        <Table.Row key={product._id}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>
                                                {product._id.substr(
                                                    product._id.length - 5
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {product.name}
                                            </Table.Cell>
                                            {product.areSizes && (
                                                <Table.Cell>Multi</Table.Cell>
                                            )}
                                            {!product.areSizes && (
                                                <Table.Cell>
                                                    <FiMinusCircle
                                                        id="minusIcon"
                                                        onClick={() =>
                                                            handleQuantityUpdate(
                                                                product._id,
                                                                false
                                                            )
                                                        }
                                                    />
                                                    <span className="quantityNo">
                                                        {product.quantity}
                                                    </span>
                                                    <FiPlusCircle
                                                        id="plusIcon"
                                                        onClick={() =>
                                                            handleQuantityUpdate(
                                                                product._id,
                                                                true
                                                            )
                                                        }
                                                    />
                                                </Table.Cell>
                                            )}
                                            <Table.Cell>
                                                <span>
                                                    <AiOutlineCloseSquare
                                                        id="closeSquare"
                                                        onClick={() =>
                                                            handleAvailableUpdate(
                                                                product._id,
                                                                false
                                                            )
                                                        }
                                                    />
                                                    <AiOutlineCheckSquare
                                                        id="checkSquare"
                                                        onClick={() =>
                                                            handleAvailableUpdate(
                                                                product._id,
                                                                true
                                                            )
                                                        }
                                                    />
                                                </span>
                                                <p className="StatusAva">
                                                    {product.availability
                                                        ? "Available"
                                                        : "Unavailable"}
                                                </p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {product.createdAt
                                                    ? dayjs(product.createdAt)
                                                          .format(`DD
                                          MMMM YYYY`)
                                                    : ""}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <MdEdit
                                                    id="editButton"
                                                    onClick={() =>
                                                        openEditProduct(product)
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
                <div className="AdminPopUp">
                    <AdminAddProduct closeProduct={closeProduct} />
                </div>

                <div className="AdminCategoryPopUp">
                    <AdminAddCategory closeProduct={closeCategory} />
                </div>
                <div className="AdminEditPopUp">
                    <AdminEditProduct
                        closeProduct={closeEditProduct}
                        product={toBeEdited}
                    />
                </div>

                <ToastContainer />
            </div>
        );
    }
};
export default Admin;
