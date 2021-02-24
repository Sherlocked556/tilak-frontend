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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CurrencyConverter from "./CurrencyConvert";
import { Dimmer, Loader } from "semantic-ui-react";

const Shop = (props) => {
    const product = useSelector((state) => state.product);
    const cart = useSelector((state) => state.cart);
    const { currency } = useSelector((state) => state.currency);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        console.log(product);
    };

    console.log(product);

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
                                            src={`https://api.tilakshringar.com/public/${picture.img}`}
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
                                {currency === "INR" && (
                                    <h2 id="price1">Rs. {product.price}/-</h2>
                                )}

                                {currency !== "INR" && (
                                    <h2 id="price1">
                                        {currency}.
                                        <CurrencyConverter
                                            from={"INR"}
                                            to={currency}
                                            value={product.price * 1.05}
                                            precision={2}
                                        />
                                        /-
                                    </h2>
                                )}
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

    console.log(product.loading);

    if (product.loading) {
        return (
            <Dimmer active={product.loading}>
                <Loader />
            </Dimmer>
        );
    } else {
        return (
            <div>
                <Header />
                <Index2 />
                <Dimmer active={cart.loading}>
                    <Loader />
                </Dimmer>
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
                <ToastContainer />
            </div>
        );
    }
};

export default Shop;
