import { FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
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
import {
    addProduct,
    GetProductDetailsById,
    updateProductById,
} from "../../actions/product.action";

export default function AdminEditProduct(props) {
    // const { categories } = useSelector((state) => state.category);
    const { loading } = useSelector((state) => state.product);
    const { productDetails: product } = useSelector((state) => state.product);
    const { products } = useSelector((state) => state.product);

    console.log("edit products", products);

    const dispatch = useDispatch();

    const handleEditProduct = (values) => {
        values._id = product._id;
        values.availability = product.availability;
        values.createdBy = product.createdBy;
        values.size = {
            sizeUnit: values.sizeUnit,
            sizeVariants: values.variant,
        };
        values.areSizes = values.areVariants;

        delete values.sizeUnit;
        delete values.variant;
        delete values.areVariants;

        console.log(values);

        dispatch(updateProductById(values));
    };

    console.log("productDetails", product);

    return (
        <div>
            <div className="SmallUp">
                <div className="headingPopUp">
                    <div className="adminClose" onClick={props.closeProduct}>
                        +
                    </div>
                    <p className="adminPopHeading">Edit Product</p>
                </div>
                <div className="detailFill" style={{ padding: "1em" }}>
                    <div className="productDetailsCol">
                        {product._id && (
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: product.name,
                                    basePrice: product.basePrice,
                                    quantity: product.quantity,
                                    category: product.category,
                                    description: product.description,
                                    prevProductImages: product.productPictures,
                                    productImages: [],
                                    variant: product.areSizes
                                        ? product.sizes.sizeVariants
                                        : [
                                              {
                                                  sizeValue: "",
                                                  addOnPrice: 0,
                                                  quantity: 0,
                                              },
                                          ],
                                    areVariants: product.areSizes,
                                    sizeUnit: product.sizes.sizeUnit,
                                }}
                                onSubmit={(data) => handleEditProduct(data)}
                            >
                                {({
                                    values,
                                    handleChange,
                                    handleSubmit,
                                    handleBlur,
                                    setFieldValue,
                                }) => (
                                    <Form
                                        loading={loading}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Group unstackable widths={2}>
                                            <Form.Input
                                                label="Product Name"
                                                placeholder="Product Name"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <Form.Input
                                                label="Product Base Price"
                                                labelPosition="right"
                                                type="number"
                                                placeholder="Product Base Price"
                                                value={values.basePrice}
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
                                        <Form.Group>
                                            {!values.areVariants && (
                                                <Form.Input
                                                    label="Quantity"
                                                    type="number"
                                                    name="quantity"
                                                    value={values.quantity}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <input />
                                                </Form.Input>
                                            )}

                                            {values.areVariants && (
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
                                                    value={values.sizeUnit}
                                                    name="sizeUnit"
                                                    onChange={(_, { value }) =>
                                                        setFieldValue(
                                                            "sizeUnit",
                                                            value
                                                        )
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
                                                value={values.category}
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
                                        </Form.Group>
                                        {values.areVariants && (
                                            <FieldArray
                                                name="variant"
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {values.variant.map(
                                                            (
                                                                variant,
                                                                index
                                                            ) => (
                                                                <Form.Group
                                                                    widths={2}
                                                                    key={index}
                                                                >
                                                                    <Form.Input
                                                                        label="Size Value"
                                                                        placeholder="Size Value"
                                                                        name={`variant[${index}].sizeValue`}
                                                                        value={
                                                                            variant.sizeValue
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />

                                                                    <Form.Input
                                                                        label="Quantity"
                                                                        placeholder="Quantity"
                                                                        name={`variant[${index}].quantity`}
                                                                        value={
                                                                            variant.quantity
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />

                                                                    <Form.Input
                                                                        label="Variant Add-on Price"
                                                                        labelPosition="right"
                                                                        type="number"
                                                                        placeholder="Variant Add-on Price"
                                                                        value={
                                                                            variant.addOnPrice
                                                                        }
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
                                            value={values.description}
                                            placeholder="Brief description of the Product..."
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        <Form.Field>
                                            <label>
                                                Previous Product Image
                                            </label>
                                            <ul>
                                                {values.prevProductImages &&
                                                    values.prevProductImages.map(
                                                        (image) => (
                                                            <li key={image._id}>
                                                                {image.img}
                                                                <span>
                                                                    <Button
                                                                        style={{
                                                                            marginLeft:
                                                                                "1em",
                                                                        }}
                                                                        onClick={() => {
                                                                            setFieldValue(
                                                                                "prevProductImages",
                                                                                values.prevProductImages.filter(
                                                                                    (
                                                                                        img
                                                                                    ) =>
                                                                                        String(
                                                                                            img._id
                                                                                        ) !==
                                                                                        String(
                                                                                            image._id
                                                                                        )
                                                                                )
                                                                            );
                                                                        }}
                                                                        type="button"
                                                                    >
                                                                        <Icon name="delete" />
                                                                    </Button>
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        </Form.Field>

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
                                                checked={values.areVariants}
                                                onClick={() =>
                                                    setFieldValue(
                                                        "areVariants",
                                                        !values.areVariants
                                                    )
                                                }
                                            />
                                        </Form.Field>

                                        <Button type="submit">Submit</Button>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
