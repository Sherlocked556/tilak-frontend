import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
// import Search from "../Search Button/Search";
import "../Search Button/Search.css";
import Footer from "../Footer/Footer";
import "./Shop.css";
import { TiHeartFullOutline } from "react-icons/ti";
import { BiCartAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchInventory } from "../../actions/inventory.action";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CurrencyConverter from "./CurrencyConvert";
import { Dimmer, Loader } from "semantic-ui-react";
import { FiSearch } from "react-icons/fi";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Shop = (props) => {
    const product = useSelector((state) => state.product);
    const cart = useSelector((state) => state.cart);
    const { currency } = useSelector((state) => state.currency);
    let { inventory } = useSelector((state) => state.inventory);
    let [search, setSearch] = useState("");
    const query = useQuery();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInventory());
    }, []);

    // useEffect(() => {
    //     if (inventory.length > 0) {
    // inventory = inventory.filter(
    //     (item) => item.name.search(search) > 0
    // );
    //         setSearch(search);
    //     }
    // }, [search, inventory]);

    const getProductPrice = (productId) => {
        let prod = product.products.filter((item) => item._id === productId)[0];
        return prod.basePrice;
    };

    if (inventory.length > 0 && search !== "") {
        inventory = inventory.filter((item) =>
            new RegExp(search, "i").test(item.name)
        );
    }

    if (query.get("cat") && inventory.length > 0) {
        // console.log(query.get("cat"));

        inventory = inventory.filter(
            (prod) => prod.category._id === query.get("cat")
        );
    }

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
                                <div className="product1">
                                    {/* {product.productPictures.map((picture) => ( */}
                                    <img
                                        src={`https://api.tilakshringar.com/public/${product.thumbnail}`}
                                        key={product.thumbnail}
                                        alt="HR"
                                    />
                                    {/* ))} */}
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
                            </Link>

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
                                    <p id="price1">
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
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="nullProducts">
                        {query.get("cat") && (
                            <h2>No Products with matching Type</h2>
                        )}

                        {!query.get("cat") && <h2>No Products</h2>}
                    </div>
                )}
            </div>
        );
    };

    console.log(product.loading);

    if (inventory.loading) {
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

                <div className="shop">
                    <div className="searchButton">
                        <input
                            type="search"
                            placeholder="Search ornament, dresses, handicrafts, etc..."
                            onChange={(e) => setSearch(e.target.value)}
                        ></input>
                        <FiSearch id="searchIcon" />
                    </div>
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
