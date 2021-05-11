import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";
import { addAddress } from "../../actions/address.action";

const AddNewAddressModal = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.address);

    const addNewAddress = (data) => {
        // console.log(data);

        dispatch(addAddress(data));
        setOpen(false);
    };

    const options = [
        {
            id: 0,
            value: "home",
        },
        {
            id: 1,
            value: "work",
        },
    ];

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button>Add Address</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon="archive" content="Add new Address" />
            <Formik
                initialValues={{
                    name: "",
                    mobileNumber: "",
                    pinCode: "",
                    locality: "",
                    address: "",
                    cityDistrictTown: "",
                    state: "",
                    landmark: "",
                    alternatePhone: "",
                    addressType: "",
                }}
                validate={(values) => {
                    const errors = {};

                    if (!values.name) {
                        errors.name = "Name is Required";
                    }

                    if (!values.mobileNumber) {
                        errors.mobileNumber = "Mobile Number is Required";
                    }

                    if (!values.pinCode) {
                        errors.pinCode = "Pin Code is required";
                    }

                    if (!values.locality) {
                        errors.locality = "Locality is Required";
                    }

                    if (!values.address) {
                        errors.address = "Address is Required";
                    }

                    if (!values.cityDistrictTown) {
                        errors.cityDistrictTown = "City is Required";
                    }

                    if (!values.state) {
                        errors.state = "State is Required";
                    }

                    if (!values.landmark) {
                        errors.landmark = "Landmark is Required";
                    }

                    if (values.alternatePhone === values.mobileNumber) {
                        errors.alternatePhone =
                            "Alternate Phone Number cannot same as primary Mobile Number";
                    }

                    if (!values.addressType) {
                        errors.addressType = "Address Type is Required";
                    }

                    return errors;
                }}
                onSubmit={(data) => addNewAddress(data)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    setFieldValue,
                    errors,
                }) => (
                    <>
                        <Form
                            loading={loading}
                            onSubmit={handleSubmit}
                            style={{ margin: "1.5em" }}
                        >
                            <Modal.Content>
                                {/* <Form.Group widths={2}> */}
                                <Form.Input
                                    label="Name"
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.name
                                            ? {
                                                  content: errors.name,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    name="mobileNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.mobileNumber
                                            ? {
                                                  content: errors.mobileNumber,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="Alternative Phone"
                                    placeholder="Alternative Phone"
                                    name="alternatePhone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.alternatePhone
                                            ? {
                                                  content:
                                                      errors.alternatePhone,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="PinCode"
                                    placeholder="PinCode"
                                    name="pinCode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.pinCode
                                            ? {
                                                  content: errors.pinCode,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="Full Address"
                                    placeholder="Full Address"
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.address
                                            ? {
                                                  content: errors.address,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="Locality"
                                    placeholder="Locality"
                                    name="locality"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.locality
                                            ? {
                                                  content: errors.locality,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="City"
                                    placeholder="City"
                                    name="cityDistrictTown"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.cityDistrictTown
                                            ? {
                                                  content:
                                                      errors.cityDistrictTown,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="State"
                                    placeholder="State"
                                    name="state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.state
                                            ? {
                                                  content: errors.state,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Input
                                    label="Landmark"
                                    placeholder="Landmark"
                                    name="landmark"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.landmark
                                            ? {
                                                  content: errors.landmark,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                />
                                <Form.Field
                                    label="Address Type"
                                    control="select"
                                    placeholder="Address Type"
                                    name="addressType"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}
                                    error={
                                        errors.addressType
                                            ? {
                                                  content: errors.addressType,
                                                  pointing: "above",
                                              }
                                            : false
                                    }
                                >
                                    <option>Select Address Type</option>
                                    {options.map((option) => (
                                        <option
                                            key={option.id}
                                            value={option.value}
                                        >
                                            {option.value}
                                        </option>
                                    ))}
                                </Form.Field>
                            </Modal.Content>
                            <Modal.Actions style={{ marginTop: "1em" }}>
                                <Button
                                    color="red"
                                    onClick={() => setOpen(false)}
                                >
                                    <Icon name="remove" /> No
                                </Button>
                                <Button
                                    color="green"
                                    type="submit"
                                    // onClick={() => setOpen(false)}
                                >
                                    <Icon name="checkmark" /> Yes
                                </Button>
                            </Modal.Actions>
                        </Form>
                    </>
                )}
            </Formik>
        </Modal>
    );
};

export default AddNewAddressModal;
