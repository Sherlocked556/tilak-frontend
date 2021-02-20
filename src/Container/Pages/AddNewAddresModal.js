import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";

const AddNewAddressModal = () => {
    const [open, setOpen] = useState(false);

    const addAddress = (values) => {
        console.log(values);
    };

    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button>Add Address</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon="archive" content="Add new Address" />
            <Modal.Content>
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
                    onSubmit={(data) => addAddress(data)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        setFieldValue,
                    }) => (
                        <Form onSubmit={handleSubmit}>
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
                                label="Locality"
                                placeholder="Locality"
                                name="locality"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Input
                                label="City"
                                placeholder="City"
                                name="cityTownAddress"
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
                            <Form.Input
                                label="Address Type"
                                placeholder="Address Type"
                                name="addressType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {/* </Form.Group> */}
                        </Form>
                    )}
                </Formik>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => setOpen(false)}>
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AddNewAddressModal;
