import React, { useEffect } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
import Search from "../Search Button/Search";
import Footer from "../Footer/Footer";
import "./Shop.css";
import { TiHeartFullOutline } from "react-icons/ti";
import { BiCartAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInventory } from "../../actions/inventory.action";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CurrencyConverter from "./CurrencyConvert";
import { Dimmer, Loader } from "semantic-ui-react";

const Shop = (props) => {
    const product = useSelector((state) => state.product);
    const cart = useSelector((state) => state.cart);
    const { currency } = useSelector((state) => state.currency);
    const { inventory } = useSelector((state) => state.inventory);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInventory());
    }, []);

    // const handleAddToCart = (product) => {
    //     dispatch(addToCart(product));
    //     console.log(product);
    // };

    const getProductPrice = (productId) => {
        let prod = product.products.filter((item) => item._id === productId)[0];

        console.log(prod);

        return prod.basePrice;
    };

    // if (inventory.length > 0) {
    //     console.log(
    //         getProductPrice(inventory[0].styles[0].items[0].products[0].product)
    //     );
    // }

    console.log(inventory);

    const renderProducts = () => {
        return (
            <div
                style={{
                    marginLeft: " 21.474vw",
                    display: " flex",
                    flexWrap: "wrap",
                }}
            >
                {inventory.length > 0 && product.products.length > 0 ? (
                    inventory.map((product) => (
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
                                    // to={`/${product.slug}/${product.styles[0].items[0].products[0].product}/p`}
                                    style={{
                                        display: "block",
                                    }}
                                    to={{
                                        pathname: `/${product._id}/${product.styles[0].items[0].products[0].product}/p`,
                                        inventory: product,
                                    }}
                                >
                                    {/* {product.productPictures.map((picture) => ( */}
                                    <img
                                        src={`http://localhost:2000/public/${product.thumbnail}`}
                                        key={product.thumbnail}
                                        alt="HR"
                                    />
                                    {/* ))} */}
                                </Link>
                                {/* <div
                                    style={{
                                        position: "absolute",
                                        display: "flex",
                                        left: "18.409vw",
                                        top: "0.366vw",
                                    }}
                                >
                                    <div className="ii2">
                                        <TiHeartFullOutline id="iii2" />
                                    </div>
                                    <div
                                        className="ii1"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <BiCartAlt id="iii1" />
                                    </div>
                                </div> */}
                            </div>
                            <div className="p1info">
                                <Link
                                    to={`/${product._id}/${product.styles[0].items[0].products[0].product}/p`}
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
                                    <h2 id="price1">
                                        Rs.{" "}
                                        {getProductPrice(
                                            product.styles[0].items[0]
                                                .products[0].product
                                        )}
                                        /-
                                    </h2>
                                )}

                                {currency !== "INR" && (
                                    <h2 id="price1">
                                        {currency}.
                                        <CurrencyConverter
                                            from={"INR"}
                                            to={currency}
                                            value={
                                                getProductPrice(
                                                    product.styles[0].items[0]
                                                        .products[0].product
                                                ) * 1.05
                                            }
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
