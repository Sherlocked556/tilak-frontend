import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
import Footer from "../Footer/Footer";
import Search from "../Search Button/Search";
import "./Blog.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "../../helpers/axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Blogs() {
    let [blogs, setBlogs] = useState([]);
    let [openedBlog, setOpenedBlog] = useState(null);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/blog/all");

            if (response.data) {
                console.log("hello");
                setBlogs([...blogs, ...response.data]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const open = (blog) => {
        setOpenedBlog(blog);

        document.querySelector(".popUp").style.display = "flex";
    };
    const close = () => {
        document.querySelector(".popUp").style.display = "none";
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    console.log(blogs);

    return (
        <div>
            <Header />
            <Index2 />
            <div className="shop">
                <Search />
            </div>
            <h2 className="blogHeadline">our blogs...</h2>
            <div className="category_card1">
                
                    {blogs &&
                        blogs.map((blog, index) => (
                            <div className="carrd" key={blog._id}>
                                <div className="imagee">
                                    <img
                                        src={`http://localhost:2000/public/${blog.coverImg}`}
                                        alt="HR"
                                    />
                                </div>
                                <div className="contentt">
                                    <h1>{blog.title}</h1>
                                    <p>{blog.description}</p>
                                    <button
                                        id="button"
                                        onClick={() => open({ blog, index })}
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                
               
            </div>
            <button className="loadMoreButton">Load More</button>

            <hr id="linee"></hr>
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
            <div className="popUp">
                {openedBlog && (
                    <div className="popUpcontent">
                        <div>
                            <div className="headerPopup">
                                <div className="headerTop">
                                    <div className="close" onClick={close}>
                                        +
                                    </div>
                                    <div className="previousNext">
                                        <span
                                            className="previousButton"
                                            onClick={() => {
                                                if (openedBlog.index > 0) {
                                                    setOpenedBlog({
                                                        blog:
                                                            blogs[
                                                                openedBlog.index -
                                                                    1
                                                            ],
                                                        index:
                                                            openedBlog.index -
                                                            1,
                                                    });
                                                }
                                            }}
                                        >
                                            <IoIosArrowBack id="backArrow" />
                                            <p>Previous</p>
                                        </span>
                                        <div className="blogLogo">LOGO</div>
                                        <span
                                            className="nextButton"
                                            onClick={() => {
                                                if (
                                                    openedBlog.index <
                                                    blogs.length - 1
                                                ) {
                                                    setOpenedBlog({
                                                        blog:
                                                            blogs[
                                                                openedBlog.index +
                                                                    1
                                                            ],
                                                        index:
                                                            openedBlog.index +
                                                            1,
                                                    });
                                                }
                                            }}
                                        >
                                            <p>Next</p>
                                            <IoIosArrowForward id="backArrow" />
                                        </span>
                                    </div>
                                </div>
                                <hr id="blogline"></hr>
                                <div className="articleName">
                                    {openedBlog.blog.title}
                                </div>
                                <div className="blogDress">
                                    <p id="dressName">
                                        {openedBlog.blog.description}
                                    </p>
                                    <p id="dressDate">
                                        {dayjs(openedBlog.blog.createdAt)
                                            .format(`DD
                                            MMMM YYYY`)}{" "}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="
                            "
                                style={{
                                    paddingRight: "4em",
                                    marginRight: "4em",
                                    paddingLeft: "0",
                                    marginLeft: "4em",
                                }}
                            >
                                <div
                                    className=""
                                    dangerouslySetInnerHTML={{
                                        __html: openedBlog.blog.content,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    // }
}
export default Blogs;
