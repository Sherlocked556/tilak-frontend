import { FieldArray, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    Button,
    Label,
    Select,
    TextArea,
    Checkbox,
    Icon,
} from "semantic-ui-react";
import { addProduct } from "../../actions/product.action";
import axios from "../../helpers/axios";
import '../scrollToTop'
import ScrollToTop from "../scrollToTop";
export default function AdminAddProduct(props) {
    // const { categories } = useSelector((state) => state.category);
    const { loading } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [isVariant, setIsVarient] = useState(false);

    console.log(isVariant);

    return (
        
            <div className="SmallUp">
                <div className="headingPopUp">
                    <div className="adminClose" onClick={props.closeProduct}>
                        +
                    </div>
                    <p className="adminPopHeading">Add Product</p>
                </div>
                <div className="detailFill" style={{ padding: "1em" }}>
                    <div className="productDetailsCol">
                        <Formik
                            initialValues={{
                                name: "",
                                basePrice: 0,
                                quantity: 0,
                                category: "",
                                description: "",
                                productImages: [],
                                variant: [
                                    {
                                        sizeValue: "",
                                        addOnPrice: 0,
                                        quantity: 0,
                                    },
                                ],
                                sizeUnit: "",
                            }}
                            onSubmit={
                                (data) => dispatch(addProduct(data, isVariant))
                                // console.log(data)
                            }
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                handleBlur,
                                setFieldValue,
                            }) => (
                                <Form loading={loading} onSubmit={handleSubmit}>
                                    <Form.Group unstackable widths={2}>
                                        <Form.Input
                                            label="Product Name"
                                            placeholder="Product Name"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Input
                                            label="Product Base Price"
                                            labelPosition="right"
                                            type="number"
                                            placeholder="Product Price"
                                            style={{
                                                marginRight: "0",
                                                marginTop: "0",
                                                height: "2.6em",
                                            }}
                                            name="basePrice"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <Label basic>₹</Label>
                                            <input />
                                            <Label>.00</Label>
                                        </Form.Input>
                                    </Form.Group>
                                    {/* <Form.Group widths={1}> */}
                                    {!isVariant && (
                                        <Form.Input
                                            label="Quantity"
                                            type="number"
                                            name="quantity"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <input />
                                        </Form.Input>
                                    )}
                                    {isVariant && (
                                        <Form.Select
                                            label="Size Unit"
                                            placeholder="Select Size Unit"
                                            options={[
                                                {
                                                    text: "Inch",
                                                    value: "inch",
                                                },
                                                {
                                                    text: "Feet",
                                                    value: "feet",
                                                },
                                            ]}
                                            name="sizeUnit"
                                            onChange={(_, { value }) =>
                                                setFieldValue("sizeUnit", value)
                                            }
                                            onBlur={handleBlur}
                                        />
                                    )}

                                    {/* <Form.Field
                                            label="Category"
                                            control="select"
                                            placeholder="Category"
                                            name="category"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option>Select Category</option>
                                            {categories.map((option) => (
                                                <option
                                                    key={option._id}
                                                    value={option._id}
                                                >
                                                    {option.name}
                                                </option>
                                            ))}
                                        </Form.Field> */}
                                    {/* </Form.Group> */}
                                    {isVariant && (
                                        <FieldArray
                                            name="variant"
                                            render={(arrayHelpers) => (
                                                <div>
                                                    {values.variant.map(
                                                        (variant, index) => (
                                                            <Form.Group
                                                                widths={2}
                                                                key={index}
                                                            >
                                                                <Form.Input
                                                                    label="Size Value"
                                                                    placeholder="Size Value"
                                                                    name={`variant[${index}].sizeValue`}
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                />

                                                                <Form.Input
                                                                    label="Quantity"
                                                                    placeholder="Quantity"
                                                                    name={`variant[${index}].quantity`}
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                />

                                                                <Form.Input
                                                                    label="Variant Add-On Price"
                                                                    labelPosition="right"
                                                                    type="number"
                                                                    placeholder="Variant Add-On Price"
                                                                    style={{
                                                                        marginRight:
                                                                            "0",
                                                                        marginTop:
                                                                            "0",
                                                                        height:
                                                                            "2.6em",
                                                                    }}
                                                                    name={`variant[${index}].addOnPrice`}
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                >
                                                                    <Label
                                                                        basic
                                                                    >
                                                                        ₹
                                                                    </Label>
                                                                    <input />
                                                                    <Label>
                                                                        .00
                                                                    </Label>
                                                                </Form.Input>
                                                                <Button
                                                                    type="button"
                                                                    icon
                                                                    onClick={() =>
                                                                        arrayHelpers.insert(
                                                                            index +
                                                                                1,
                                                                            {
                                                                                sizeValue:
                                                                                    "",
                                                                                addOnPrice: 0,
                                                                                quantity: 0,
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    <Icon name="add" />
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    icon
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <Icon name="minus" />
                                                                </Button>
                                                            </Form.Group>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        />
                                    )}
                                    <Form.Field
                                        control={TextArea}
                                        label="Product Description"
                                        placeholder="Brief description of the Product..."
                                        name="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <Form.Field>
                                        <label>Product Images</label>

                                        <input
                                            type="file"
                                            id="productImages"
                                            multiple
                                            name="productImages"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    "productImages",
                                                    values.productImages.concat(
                                                        ...e.target.files
                                                    )
                                                );
                                            }}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <Checkbox
                                            label="Add product variants"
                                            onClick={() =>
                                                setIsVarient(!isVariant)
                                            }
                                        />
                                    </Form.Field>

                                    <Button type="submit">Submit</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
    );
}
