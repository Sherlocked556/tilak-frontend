import React from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
import Search from "../Search Button/Search";
import Footer from "../Footer/Footer";
import "./Shop.css";
import { TiHeartFullOutline } from "react-icons/ti";
import { BiCartAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions";

const Shop = (props) => {
    const product = useSelector((state) => state.product);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        console.log(product);
    };

    console.log(cart);

    const renderProducts = () => {
        return (
            <div
                style={{
                    marginLeft: " 21.474vw",
                    display: " flex",
                    flexWrap: "wrap",
                }}
            >
                {product.products.length > 0 ? (
                    product.products.map((product) => (
                        <div
                            style={{
                                display: "grid",
                                height: "30vw",
                                width: "24.158vw",
                                marginLeft: "1vw",
                                marginBottom: " 3.5vw",
                            }}
                            key={product._id}
                        >
                            <div className="product1">
                                <Link
                                    to={`/${product.slug}/${product._id}/p`}
                                    style={{
                                        display: "block",
                                    }}
                                >
                                    {product.productPictures.map((picture) => (
                                        <img
                                            src={`http://localhost:2000/public/${picture.img}`}
                                            key={picture.img}
                                            alt="HR"
                                        />
                                    ))}
                                </Link>
                                <div
                                    style={{
                                        position: "absolute",
                                        display: "flex",
                                        left: "18.409vw",
                                        top: "0.366vw",
                                    }}
                                >
                                    {/* <div className="ii2">
                                        <TiHeartFullOutline id="iii2" />
                                    </div> */}
                                    <div
                                        className="ii1"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <BiCartAlt id="iii1" />
                                    </div>
                                </div>
                            </div>
                            <div className="p1info">
                                <Link
                                    to={`/${product.slug}/${product._id}/p`}
                                    style={{
                                        display: "block",
                                    }}
                                >
                                    <p
                                        style={{ color: "#4D4D4D" }}
                                        id="product1i"
                                    >
                                        {product.name}
                                    </p>
                                </Link>
                                <h2 id="price1">Rs. {product.price}/-</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="nullProducts">
                        <h2>No Products</h2>
                    </div>
                )}
            </div>
        );
    };
    return (
        <div>
            <Header />
            <Index2 />
            <div className="shop">
                <Search />
            </div>
            <h2 className="shopheadlinee">our products...</h2>
            {renderProducts()}
            <div className="cards">
                <div className="rrcard3">
                    <span>
                        <Link to="/categories" style={{ color: "#4D4D4D" }}>
                            CATEGORIES
                        </Link>
                    </span>
                </div>
                <div className="rrcard4">
                    <span>
                        <Link to="/query" style={{ color: "#4D4D4D" }}>
                            QUERY
                        </Link>
                    </span>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
