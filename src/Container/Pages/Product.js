import React, { useEffect, useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
import Search from "../Search Button/Search";
import Footer from "../Footer/Footer";
import "./Product.css";
import { TiHeartFullOutline } from "react-icons/ti";
import { BiCartAlt } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetProductDetailsById } from "../../actions";
import { addToCart } from "../../actions";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CurrencyConverter from "./CurrencyConvert";
import {
    fetchInventory,
    fetchOneInventory,
} from "../../actions/inventory.action";
import { Button } from "semantic-ui-react";

const Product = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const [viewImage, setViewImage] = useState(null);
    const { currency } = useSelector((state) => state.currency);
    const { inventoryDetails } = useSelector((state) => state.inventory);
    const [prodSize, setProdSize] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const { productId } = props.match.params;
        const inventoryId = props.location.pathname.split("/")[1];

        const payload = {
            params: {
                productId,
            },
        };
        dispatch(GetProductDetailsById(payload));
        dispatch(fetchOneInventory(inventoryId));
    }, []);

    useEffect(() => {
        // window.location.reload();
        if (product.productDetails._id) {
            setViewImage({
                image: product.productDetails.productPictures[0],
                index: 0,
            });
        }
    }, [product]);

    const handleAddToCart = (product, index) => {
        dispatch(addToCart(product, index));
    };

    const getProductName = (productId) => {
        // console.log(product.products);

        let prod = product.products.filter((item) => item._id === productId)[0];
        if (prod) {
            // console.log(prod);

            return prod.name;
        } else {
            return "";
        }
    };

    const handleStyleChange = (productId, inventoryId) => {
        history.push(`/${inventoryId}/${productId}/p`);
        window.location.reload();
    };

    // console.log(inventoryDetails);

    let prodDetails = {
        name: "",
        styleName: "",
        styleValue: "",
        sizeUnit: "",
        price: 0,
    };

    if (inventoryDetails._id && product.productDetails._id) {
        inventoryDetails.styles.forEach((style) => {
            // console.log(style);
            style.items.forEach((item) => {
                item.products.forEach((prod) => {
                    if (prod.product === product.productDetails._id) {
                        prodDetails.styleName = style.styleName;
                        prodDetails.styleValue = item.styleValue;
                    }
                });
            });
        });

        if (product.productDetails.areSizes) {
            prodDetails.price =
                product.productDetails.basePrice +
                product.productDetails.sizes.sizeVariants[prodSize].addOnPrice;
            prodDetails.sizeUnit = product.productDetails.sizes.sizeUnit;
        } else {
            prodDetails.price = product.productDetails.basePrice;
        }
    }

    console.log(prodDetails);

    return (
        <div>
            <Header />
            <Index2 />
            <div className="shop">
                <Search />
            </div>
            <h3 className="productheadlineee">the product...</h3>
            {product.productDetails._id && (
                <div className="productss">
                    <div className="productpic">
                        {!viewImage && (
                            <img
                                className="ppic"
                                src={`https://api.tilakshringar.com/public/${product.productDetails.productPictures[0].img}`}
                                alt="HR"
                            ></img>
                        )}

                        {viewImage && (
                            <img
                                className="ppic"
                                src={`https://api.tilakshringar.com/public/${viewImage.image.img}`}
                                alt="HR"
                            ></img>
                        )}

                        <div className="productSimilar">
                            <div className="leftSlide">
                                <IoIosArrowBack
                                    id="Arrow"
                                    onClick={() => {
                                        if (
                                            viewImage.index ===
                                            product.productDetails
                                                .productPictures.length -
                                                1
                                        ) {
                                            setViewImage({
                                                image:
                                                    product.productDetails
                                                        .productPictures[0],
                                                index: 0,
                                            });
                                        } else {
                                            setViewImage({
                                                image:
                                                    product.productDetails
                                                        .productPictures[
                                                        viewImage.index + 1
                                                    ],
                                                index: viewImage.index + 1,
                                            });
                                        }
                                    }}
                                />
                            </div>
                            {product.productDetails.productPictures &&
                                product.productDetails.productPictures.map(
                                    (image, index) => (
                                        <div
                                            className="similarImage1"
                                            key={index + 1}
                                            onClick={() =>
                                                setViewImage({ image, index })
                                            }
                                        >
                                            <img
                                                src={`https://api.tilakshringar.com/public/${image.img}`}
                                                height="100"
                                                width="100"
                                            />
                                        </div>
                                    )
                                )}

                            <div className="rightSlide">
                                <IoIosArrowForward
                                    id="Arrow"
                                    onClick={() => {
                                        if (viewImage.index === 0) {
                                            setViewImage({
                                                image:
                                                    product.productDetails
                                                        .productPictures[
                                                        product.productDetails
                                                            .productPictures
                                                            .length - 1
                                                    ],
                                                index:
                                                    product.productDetails
                                                        .productPictures
                                                        .length - 1,
                                            });
                                        } else {
                                            setViewImage({
                                                image:
                                                    product.productDetails
                                                        .productPictures[
                                                        viewImage.index - 1
                                                    ],
                                                index: viewImage.index - 1,
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="productdes" style={{ marginLeft: "150px" }}>
                        <p>
                            {product.productDetails.name +
                                " (" +
                                prodDetails.styleName +
                                " : " +
                                prodDetails.styleValue +
                                ")"}
                        </p>
                        {/* <div className="icon2">
                            <TiHeartFullOutline id="iconn2" />
                        </div> */}
                        <div className="icon1">
                            {product.productDetails.areSizes && (
                                <BiCartAlt
                                    id="iconn1"
                                    onClick={() => {
                                        handleAddToCart(
                                            product.productDetails,
                                            prodSize
                                        );
                                    }}
                                />
                            )}
                            {!product.productDetails.areSizes && (
                                <BiCartAlt
                                    id="iconn1"
                                    onClick={() => {
                                        handleAddToCart(
                                            product.productDetails,
                                            prodSize
                                        );
                                        // props.history.push("/cart");
                                    }}
                                />
                            )}
                        </div>
                        <div style={{ display: "flex" }}>
                            {currency === "INR" && (
                                <span className="cost">
                                    Rs.{" "}
                                    {product.productDetails.areSizes
                                        ? prodDetails.price
                                        : product.productDetails.basePrice}
                                    /-
                                </span>
                            )}

                            {currency !== "INR" && (
                                <span className="cost">
                                    {currency}.
                                    <CurrencyConverter
                                        from={"INR"}
                                        to={currency}
                                        value={
                                            (product.productDetails.areSizes
                                                ? prodDetails.price
                                                : product.productDetails
                                                      .basePrice) * 1.05
                                        }
                                        precision={2}
                                    />
                                    /-
                                </span>
                            )}

                            {/* <span className="cost">
                                Rs. {product.productDetails.price}/-
                            </span> */}
                            <AiFillStar
                                style={{
                                    marginTop: "3.29vw",
                                    height: "1.830vw",
                                    width: "1.684vw",
                                    color: "#FFFF00",
                                    marginLeft: "1.245vw",
                                }}
                            />
                            <p
                                style={{
                                    marginTop: "2.928vw",
                                    font:
                                        "normal normal normal 1.757vw/2.562vw Poppins",
                                    marginLeft: "0.512vw",
                                }}
                            >
                                0.0
                            </p>
                        </div>
                        <span className="tags">Tags:</span>
                        <p>choli, white, small,</p>
                        <div className="descriptions">
                            <span>Description:</span>
                            <p>{product.productDetails.description}</p>
                        </div>
                        {product.productDetails.areSizes && (
                            <div className="">
                                <span>Sizes:</span>
                                <Button.Group basic>
                                    {product.productDetails.sizes.sizeVariants.map(
                                        (size, index) => (
                                            <Button
                                                key={index}
                                                onClick={() =>
                                                    setProdSize(index)
                                                }
                                                active={prodSize === index}
                                            >
                                                {size.sizeValue}
                                            </Button>
                                        )
                                    )}
                                </Button.Group>
                            </div>
                        )}

                        {inventoryDetails.styles &&
                            inventoryDetails.styles.map((style) => (
                                <div className="tags" key={style._id}>
                                    <span>{style.styleName}:</span>
                                    {style.items.map((item) => (
                                        <div className="" key={item._id}>
                                            <span> {item.styleValue} </span>
                                            {
                                                <Button.Group basic>
                                                    {item.products.length > 0 &&
                                                        item.products.map(
                                                            (prod, index) => (
                                                                <Button
                                                                    key={index}
                                                                    onClick={() =>
                                                                        handleStyleChange(
                                                                            prod.product,
                                                                            inventoryDetails._id
                                                                        )
                                                                    }
                                                                >
                                                                    {getProductName(
                                                                        prod.product
                                                                    )}
                                                                </Button>
                                                            )
                                                        )}
                                                </Button.Group>
                                            }
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* <div id="reviewBox">
                <div className="reviewsHeading"> Reviews:</div>
                <div className="fiveStar">
                    <AiFillStar id="starReview" />
                    <AiFillStar id="starReview" />
                    <AiFillStar id="starReview" />
                    <AiFillStar id="starReview" />{" "}
                    <AiFillStar id="starReview" />
                </div>
                <div className="writeBox">
                    <div className="writeReview">
                        <textarea
                            className="commentBox"
                            maxLength="200"
                            placeholder="Choose a rating and start writing a review..."
                        ></textarea>
                        <div className="attachmentLimit">
                            <MdAttachFile
                                style={{
                                    height: "1.611vw",
                                    width: "1.318vw",
                                    opacity: "0.7",
                                    marginLeft: "2.050vw",
                                    cursor: "pointer",
                                }}
                            />
                            <div className="Limit">0/200</div>
                        </div>
                    </div>
                    <button
                        className="sendReview"
                        style={{ borderRadius: "0", color: "white" }}
                    >
                        Send
                    </button>
                </div>
                <div className="showReview">
                    <div className="userNameReview">
                        <div className="roundCircle">
                            <img src="https://images.unsplash.com/photo-1606247193592-53da505571f8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                        </div>
                        <div className="personName">Person 1</div>
                        <div className="reviewNo">4</div>
                        <AiFillStar
                            style={{
                                height: "1.245vw",
                                width: "1.245vw",
                                marginLeft: "0.293vw",
                                marginTop: "0.220vw",
                                color: "#ffff00",
                            }}
                        />
                    </div>
                    <p className="reviewShow">
                        I find this product pretty amazing and it was all what I
                        was looking for.
                    </p>
                    <div className="reviewImage">
                        <img src="https://images.unsplash.com/photo-1607359390930-206a99777fa1?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                    </div>
                </div>
                <div className="showReview">
                    <div className="userNameReview">
                        <div className="roundCircle">
                            <img src="https://images.unsplash.com/photo-1606247193592-53da505571f8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                        </div>
                        <div className="personName">Person 2</div>
                        <div className="reviewNo">5</div>
                        <AiFillStar
                            style={{
                                height: "1.245vw",
                                width: "1.245vw",
                                marginLeft: "0.293vw",
                                marginTop: "0.220vw",
                                color: "#ffff00",
                            }}
                        />
                    </div>
                    <p className="reviewShow">
                        I find this product pretty amazing and it was all what I
                        was looking for.
                    </p>
                    <div className="reviewImage">
                        <img src="https://images.unsplash.com/photo-1607161744726-e96856cfcf4f?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                    </div>
                </div>
                <div className="showReview">
                    <div className="userNameReview">
                        <div className="roundCircle">
                            <img src="https://images.unsplash.com/photo-1606247193592-53da505571f8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8dG93SlpGc2twR2d8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                        </div>
                        <div className="personName">Person 3</div>
                        <div className="reviewNo">5</div>
                        <AiFillStar
                            style={{
                                height: "1.245vw",
                                width: "1.245vw",
                                marginLeft: "0.293vw",
                                marginTop: "0.220vw",
                                color: "#ffff00",
                            }}
                        />
                    </div>
                    <p className="reviewShow">
                        I find this product pretty amazing and it was all what I
                        was looking for.
                    </p>
                    <div className="reviewImage">
                        <img src="https://images.unsplash.com/photo-1595370773791-ccbbfd695ce5?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                    </div>
                </div>
                <button className="productLoadMore">Load More</button>
            </div> */}
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
            <ToastContainer />
        </div>
    );
};

export default Product;
