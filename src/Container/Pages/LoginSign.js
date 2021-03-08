import React, { useState } from "react";
import Header from "../../Container/Top Nav Bar/Header";
import Index2 from "../../Container/Side Nav Bar/Index2";
import Footer from "../Footer/Footer";
import "./LoginSign.css";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../../actions";
import { ToastContainer } from "react-toastify";
import jwt from "jsonwebtoken";

const LoginSign = (props) => {
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const history = useHistory();

    const from = props.location.state || { from: { pathname: "/" } };

    if (redirect) {
        // return <Redirect to={from.from.pathname} />;
        window.location.replace(from.from.pathname);
        return null;
    }

    if (auth.user.accessToken) {
        setRedirect(true);
    }
    let user;

    if (
        localStorage.getItem("access-token") &&
        localStorage.getItem("access-token") !== ""
    ) {
        user = jwt.decode(localStorage.getItem("access-token"));
    }


    console.log(
        localStorage.getItem("access-token") &&
            localStorage.getItem("access-token") === ""
    );

    return (
        <div>
            <Header />
            <Index2 />
            <h2 className="headlineew">my profile...</h2>

            {localStorage.getItem("access-token") &&
                localStorage.getItem("access-token") !== "" &&
                user && (
                    <div className="loginOuterBox">
                        <div className="firstSignBox">
                            <p className="neworalready">Wanna Logout?</p>
                            <button
                                className="continueButton"
                                onClick={() => dispatch(logoutUser(user._id))}
                            >
                                CONTINUE
                            </button>
                        </div>
                    </div>
                )}

            {(!localStorage.getItem("access-token") ||
                localStorage.getItem("access-token") === "") && (
                <div className="loginOuterBox">
                    <div className="firstSignBox">
                        <p className="neworalready">
                            Are you new to the website?
                        </p>
                        <p className="filldetailHead">
                            Please fill in the details to order
                        </p>

                        <div className="form">
                            <Formik
                                initialValues={{
                                    fullName: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validate={(values) => {
                                    const errors = {};

                                    if (!values.email) {
                                        errors.email = "Email Address Required";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = "Invalid email address";
                                    }

                                    if (!values.fullName) {
                                        errors.fullName =
                                            "Full Name is Required";
                                    }

                                    if (!values.password) {
                                        errors.password =
                                            "Password is Required";
                                    } else if (values.password.length <= 6) {
                                        errors.password =
                                            "Length of password must be greater than 6";
                                    }

                                    if (!values.confirmPassword) {
                                        errors.confirmPassword =
                                            "Please Re-type Password";
                                    } else if (
                                        values.confirmPassword !==
                                        values.password
                                    ) {
                                        errors.confirmPassword =
                                            "Doesn't match with the Password";
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    dispatch(
                                        registerUser(
                                            values.fullName,
                                            values.email,
                                            values.password
                                        )
                                    );
                                    console.log(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form style={{ marginBottom: "1em" }}>
                                        <Field
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            className="fillouterBoxborder"
                                        />
                                        <ErrorMessage
                                            name="fullName"
                                            component="div"
                                        />
                                        <Field
                                            className="fillouterBoxborder"
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                        />
                                        <Field
                                            className="fillouterBoxborder"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                        />
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="fillouterBoxborder"
                                            placeholder="Re-enter Password"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                        />

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="continueButton"
                                        >
                                            CONTINUE
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        {/* <p className="orHeading">or</p> */}
                        {/* <label className="containerCheck">
                        Save this information for easy access
                        <input type="checkbox"></input>
                        <span className="checkMark"></span>
                    </label> */}
                        {/* <div className="SignGoogle">
                        <AiOutlineGooglePlus className="googleIcon" />
                        <p>Sign in with Google</p>
                    </div> */}
                    </div>
                    <p className="betweenOR">or</p>
                    <div className="firstLoginBox">
                        <p className="neworalready">Already have an account?</p>
                        <p className="filldetailHead">Please login</p>

                        <div className="form">
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                validate={(values) => {
                                    const errors = {};

                                    if (!values.email) {
                                        errors.email = "Email Address Required";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = "Invalid email address";
                                    }

                                    if (!values.password) {
                                        errors.password =
                                            "Password is Required";
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    dispatch(
                                        loginUser(
                                            values.email,
                                            values.password,
                                            history
                                        )
                                    );
                                    console.log(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form style={{ marginBottom: "1em" }}>
                                        <Field
                                            className="fillouterBoxborder"
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                        />
                                        <Field
                                            className="fillouterBoxborder"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                        />
                                        <p className="forgetPass">
                                            Forgot Password?
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="loginButton"
                                        >
                                            LOGIN
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            <ToastContainer />
        </div>
    );
};

export default LoginSign;
