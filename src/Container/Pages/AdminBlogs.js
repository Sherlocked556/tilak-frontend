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
import './AdminBlogs.css';
function openBlog() {
    document.querySelector(".AdminBlogPopUp").style.display = "flex";
}
function closeBlog() {
    document.querySelector(".AdminBlogPopUp").style.display = "none";
}

const AdminBlogs = () => {
    const { blogs } = useSelector((state) => state.blogs);
    const [toBeEdited, setToBeEdited] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogs());
    }, []);

    const handleBlogDelete = (blogId) => {
        dispatch(deleteBlog(blogId));
    };

    const openEditBlog = (blog) => {
        setToBeEdited(blog);
        document.querySelector(".AdminEditBlogPopUp").style.display = "flex";
    };
    const closeEditBlog = () => {
        document.querySelector(".AdminEditBlogPopUp").style.display = "none";
    };

    // console.log(toBeEdited);

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
                    <hr id="blogLine" />
                    <hr id="blogline1" />
                    <hr id="blog2" />
                </div>
                <div className="categoryProductBtn">
                    <button className="productBtn" onClick={openBlog}>
                        ADD BLOG
                    </button>{" "}
                    <p className="productNumber">{blogs.length} blogs</p>
                </div>
                {/* <div className="SearchBilling"></div> */}
                <div className="AdminProductDetails">
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Sr. No.</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Dated Added</Table.HeaderCell>
                                <Table.HeaderCell>Edit/Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {blogs &&
                                blogs.map((blog, index) => (
                                    <Table.Row key={blog._id}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{blog.title}</Table.Cell>
                                        <Table.Cell>
                                            {dayjs(blog.createdAt).format(`DD
                                            MMMM YYYY`)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <MdDelete
                                                id="deleteButton"
                                                onClick={() =>
                                                    handleBlogDelete(blog._id)
                                                }
                                            />
                                            <MdEdit
                                                id="editButton"
                                                onClick={() =>
                                                    openEditBlog(blog)
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
            <div className="AdminBlogPopUp">
                <AdminAddBlog closeProduct={closeBlog} />
            </div>

            <div className="AdminEditBlogPopUp">
                <AdminEditBlog
                    title={toBeEdited.title}
                    content={toBeEdited.content}
                    description={toBeEdited.description}
                    blogId={toBeEdited._id}
                    closeProduct={closeEditBlog}
                />
            </div>

            <ToastContainer />
        </div>
    );
};
export default AdminBlogs;
