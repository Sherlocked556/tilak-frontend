import React, { useEffect } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
import Footer from "../Footer/Footer";
import "./Address.css";
import "./orderSummary.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Aboutme from "./Aboutme";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, fetchAddress } from "../../actions/address.action";
import AddNewAddressModal from "./AddNewAddresModal";

const Address = () => {
    const { address } = useSelector((state) => state.address);
    const dispatch = useDispatch();
    // const [orderAddress, setOrderAddress] = useState();

    useEffect(() => {
        dispatch(fetchAddress());
    }, []);

    let userAddress = [];

    if (address[0]) {
        userAddress = address[0].address;
    }

    return (
        <div>
            <Header />
            <Index2 />

            <h2 className="headlineew">my profile...</h2>
            <div className="Aaboutme">
                <Aboutme />
            </div>
            <div className="addressBox">
                <div className="boxNav">
                    <h6 className="myProfile">
                        <Link to="/myprofile" style={{ color: "#4D4D4D" }}>
                            MY PROFILE
                        </Link>
                    </h6>
                    <h6 className="myOrders">
                        <Link to="/profile" style={{ color: "#4D4D4D" }}>
                            MY ORDERS
                        </Link>
                    </h6>
                    <h6 className="myAddress">
                        <Link to="/address" style={{ color: "#4D4D4D" }}>
                            MY ADDRESS
                        </Link>
                    </h6>
                </div>
                <div className="forline">
                    <hr id="line001"></hr>
                    <hr id="line002"></hr>
                    <hr id="line003"></hr>
                </div>
                {userAddress &&
                    userAddress.map((address) => (
                        <div className="addressNo" key={address._id}>
                            <div className="customerNameBox">
                                <p className="customerNameOrderSummary">
                                    Name:
                                </p>
                                <p className="customerFullName">
                                    {address.name}
                                </p>
                            </div>
                            <div className="customerAddressBox">
                                <p>{address.address}</p>
                                <p>{address.locality}</p>
                                <p>{address.pinCode}</p>
                            </div>
                            <div className="customerLandmarkBox">
                                <p className="customerLandmarkDetail">
                                    Landmark:
                                </p>
                                <p className="customerLocationDetail">
                                    {address.landmark}
                                </p>
                            </div>
                            <div className="phoneNoCustomerBox">
                                <p className="customerContactHeading">
                                    Contact Number:
                                </p>
                                <p className="customerContactNoDetail">
                                    {address.mobileNumber}
                                </p>
                                <p
                                    className="editTheAddress"
                                    onClick={() =>
                                        dispatch(deleteAddress(address._id))
                                    }
                                >
                                    Delete
                                </p>
                            </div>
                        </div>
                    ))}

                <div
                    className=""
                    style={{
                        marginRight: "auto",
                        marginLeft: "auto",
                        marginTop: "1em",
                        marginBottom: "2em",
                    }}
                >
                    <AddNewAddressModal />
                </div>
            </div>

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
        </div>
    );
};
export default Address;
