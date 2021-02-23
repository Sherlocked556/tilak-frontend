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
import axios from "../../helpers/axios";

export default function AdminEditProduct(props) {
    const { categories } = useSelector((state) => state.category);
    const { loading } = useSelector((state) => state.product);
    const { productDetails: product } = useSelector((state) => state.product);
    const { products } = useSelector((state) => state.product);

    console.log(products);

    const dispatch = useDispatch();

    const handleEditProduct = (values) => {
        if (values.areVariants) {
            let low = Number.POSITIVE_INFINITY;

            let tmp;

            for (let i = 0; i < values.variant.length; i++) {
                tmp = values.variant[i].price;
                if (tmp < low) low = tmp;
            }

            values.price = low;
        }
        values._id = product._id;
        values.availability = product.availability;
        values.createdBy = product.createdBy;

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
                                    price: product.price,
                                    quantity: product.quantity,
                                    category: product.category,
                                    description: product.description,
                                    prevProductImages: product.productPictures,
                                    productImages: [],
                                    variant: product.areVariants
                                        ? product.variants
                                        : [{ variantName: "", price: 0 }],
                                    areVariants: product.areVariants,
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
                                            {!values.areVariants && (
                                                <Form.Input
                                                    label="Product Price"
                                                    labelPosition="right"
                                                    type="number"
                                                    placeholder="Product Price"
                                                    value={values.price}
                                                    style={{
                                                        marginRight: "0",
                                                        marginTop: "0",
                                                        height: "2.6em",
                                                    }}
                                                    name="price"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <Label basic>₹</Label>
                                                    <input />
                                                    <Label>.00</Label>
                                                </Form.Input>
                                            )}
                                        </Form.Group>
                                        <Form.Group widths={2}>
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

                                            <Form.Field
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
                                            </Form.Field>
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
                                                                        label="Variant Name"
                                                                        placeholder="Variant Name"
                                                                        name={`variant[${index}].variantName`}
                                                                        value={
                                                                            variant.variantName
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />

                                                                    <Form.Input
                                                                        label="Variant Price"
                                                                        labelPosition="right"
                                                                        type="number"
                                                                        placeholder="Variant Price"
                                                                        value={
                                                                            variant.price
                                                                        }
                                                                        style={{
                                                                            marginRight:
                                                                                "0",
                                                                            marginTop:
                                                                                "0",
                                                                            height:
                                                                                "2.6em",
                                                                        }}
                                                                        name={`variant[${index}].price`}
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
                                                                                    variantName:
                                                                                        "",
                                                                                    price: 0,
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
