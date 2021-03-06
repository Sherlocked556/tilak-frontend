import React, { useEffect, useState } from "react";
import "./Header.css";
import DropDown from "./DropDown";
import { BsPersonPlus } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchCart } from "../../actions/cart.action";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";

const Div = styled.div`
margin-left:0;
@media (max-width:700px){
    .hamburg{
        margin-left:-4.571vw;
        transform: ${({ open }) =>
            open ? "translateX(0)" : "translateX(-100%)"};
        transition: transform 0.3s ease-in-out;
    }
`;
const StyledBurger = styled.div`
    margin-top: 1.529vw;
    width: 4.671vw;
    height: 3.829vw;
    top: ${({ open }) => (open ? "1.429vw" : "2.929vw")};
    left: ${({ open }) => (open ? "2.143vw" : "5.286vw")};
    justify-content: space-around;
    flex-flow: column nowrap;
    display: none;
    @media (max-width: 700px) {
        display: flex;
        position: sticky;
        position: -webkit-sticky;
        z-index: 1042;
    }
    div {
        z-index: 1041;
        background-color: ${({ open }) => (open ? "#7D7D7D" : "#ccc")};
        border-radius: 1.429vw;
        transform-origin: 0vw;
        transition: all 0.3s linear;
        &:nth-child(1) {
            transform: ${({ open }) => (open ? `rotate(45deg)` : `rotate(0)`)};
        }
        &:nth-child(2) {
            transform: ${({ open }) =>
                open ? `translateX(100%)` : `translateX(0)`};
            opacity: ${({ open }) => (open ? 0 : 1)};
        }
        &:nth-child(3) {
            transform: ${({ open }) => (open ? `rotate(-45deg)` : `rotate(0)`)};
        }
    }
`;

var quant = 12;

const Header = () => {
    const isLoggedIn = () => {
        if (localStorage.getItem("access-token")) {
            return true;
        } else return false;
    };

    const isAdmin = () => {
        if (isLoggedIn()) {
            let user = jwt.decode(localStorage.getItem("access-token"));

            if (user.role === "admin") {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const isReseller = () => {
        if (isLoggedIn()) {
            let user = jwt.decode(localStorage.getItem("access-token"));

            if (user.role === "reseller") {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const [open, setOpen] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if (cartItems.length <= 0) {
            fetchCart();
        }
    }, []);

    return (
        <>
            <div className="topheadd"></div>
            <Div className="navbar" open={open}>
                <StyledBurger open={open} onClick={() => setOpen(!open)}>
                    <div id="hamburgline1" />
                    <div id="hamburgline2" />
                    <div id="hamburgline3" />
                </StyledBurger>
                <div className="hamburg">
                    <Link to="/" style={{ color: "#4D4D4D" }}>
                        <ul className="left">
                            <img
                                src={require("../newLogo.png").default}
                                alt="HR"
                            />
                        </ul>
                    </Link>
                    <hr id="navlineee"></hr>
                    <ul className="mid">
                        <li>
                            <Link to="/shop" style={{ color: "#4D4D4D" }}>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" style={{ color: "#4D4D4D" }}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories" style={{ color: "#4D4D4D" }}>
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/query" style={{ color: "#4D4D4D" }}>
                                Query
                            </Link>
                        </li>
                        <li>
                            <Link to="/blogs" style={{ color: "#4D4D4D" }}>
                                Blogs
                            </Link>
                        </li>
                        {isAdmin() && (
                            <li>
                                <Link to="/admin" style={{ color: "#4D4D4D" }}>
                                    Admin
                                </Link>
                            </li>
                        )}
                        {isReseller() && (
                            <li>
                                <Link
                                    to="/resellerOrder"
                                    style={{ color: "#4D4D4D" }}
                                >
                                    Reseller
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="foot">
                        Tilak Shringar | <BiCopyright /> &nbsp; All rights
                        reserved 2020
                    </div>
                </div>
                <div className="right">
                    <div>
                        <DropDown />
                    </div>
                    <div className="cart">
                        <p className="cartname">
                            <Link to="/cart" style={{ color: "#4D4D4D" }}>
                                Cart
                            </Link>
                        </p>
                        {cartItems.cartItems && (
                            <p className="quantity" style={{ color: "white" }}>
                                <Link to="/cart" style={{ color: "white" }}>
                                    {cartItems.cartItems.length}
                                </Link>
                            </p>
                        )}
                    </div>
                    <div className="user">
                        {isLoggedIn() && (
                            <Link to="/myprofile">
                                {" "}
                                <img
                                    src={require("./Profile.png").default}
                                    alt=""
                                ></img>
                                {/* <BsPersonPlus className="icon"/> */}
                            </Link>
                        )}

                        {!isLoggedIn() && (
                            <Link to="/loginSign">
                                {" "}
                                <img
                                    src={require("./Profile.png").default}
                                    alt=""
                                ></img>
                                {/* <BsPersonPlus className="icon"/> */}
                            </Link>
                        )}
                    </div>
                </div>
            </Div>
        </>
    );
};

export default Header;
