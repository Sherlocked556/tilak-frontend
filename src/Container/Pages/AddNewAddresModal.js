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
        console.log(data);

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
                onSubmit={(data) => addNewAddress(data)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    setFieldValue,
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
                                />
                                <Form.Input
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    name="mobileNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Input
                                    label="Alternative Phone"
                                    placeholder="Alternative Phone"
                                    name="alternatePhone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Input
                                    label="PinCode"
                                    placeholder="PinCode"
                                    name="pinCode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Input
                                    label="Full Address"
                                    placeholder="Full Address"
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Input
                                    label="Locality"
                                    placeholder="Locality"
                                    name="locality"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Input
                                    label="City"
                                    placeholder="City"
                                    name="cityDistrictTown"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Input
                                    label="State"
                                    placeholder="State"
                                    name="state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Input
                                    label="Landmark"
                                    placeholder="Landmark"
                                    name="landmark"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Field
                                    label="Address Type"
                                    control="select"
                                    placeholder="Address Type"
                                    name="addressType"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}
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
