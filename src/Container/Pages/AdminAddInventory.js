import { FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { addCategory, getAllProducts } from "../../actions";
import { addInventory } from "../../actions/inventory.action";

export default function AdminAddInventory(props) {
    const { categories } = useSelector((state) => state.category);
    const { products, loading: prodLoading } = useSelector(
        (state) => state.product
    );
    const { loading: invtLoading } = useSelector((state) => state.inventory);

    const dispatch = useDispatch();

    const handleInventorySubmit = (data) => {
        // console.log(data);
        dispatch(addInventory(data));
    };

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    console.log(products);

    let options = [];

    if (products.length > 0) {
        options = products.map((prod) => {
            return {
                key: prod._id,
                text: prod.name,
                value: prod._id,
            };
        });
    }

    return (
        <div>
            <div className="SmallBlogUp">
                <div className="headingPopUp">
                    <div className="adminClose" onClick={props.closeProduct}>
                        +
                    </div>
                    <p className="adminPopHeading">Add Inventory</p>
                </div>
                <div className="detailBlogFill" style={{ padding: "1em" }}>
                    <div className="productDetailsCol">
                        <Formik
                            initialValues={{
                                name: "",
                                thumbnail: "",
                                category: "",
                                styles: [
                                    {
                                        styleName: "",
                                        items: [
                                            {
                                                styleValue: "",
                                                products: [
                                                    {
                                                        product: "",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            }}
                            onSubmit={(data) => handleInventorySubmit(data)}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                handleBlur,
                                setFieldValue,
                            }) => (
                                <Form
                                    onSubmit={handleSubmit}
                                    loading={invtLoading}
                                >
                                    <Form.Group widths={2}>
                                        <Form.Input
                                            type="text"
                                            label="Inventory Name"
                                            placeholder="Enter Inventory Name here"
                                            name="name"
                                            onChange={handleChange}
                                        />
                                        <Form.Field
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
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Input
                                        type="file"
                                        label="Inventory Image"
                                        name="thumbnail"
                                        onChange={(e) => {
                                            setFieldValue(
                                                "thumbnail",
                                                e.target.files[0]
                                            );
                                        }}
                                    />

                                    <FieldArray
                                        name="styles"
                                        render={(styleHelpers) => (
                                            <div>
                                                {values.styles.map(
                                                    (style, index) => (
                                                        <div key={index}>
                                                            {/* <Form.Group> */}
                                                            <Form.Input
                                                                label="Style Name"
                                                                placeholder="Style Name"
                                                                label="Style Name"
                                                                name={`styles[${index}].styleName`}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                            <Button
                                                                type="button"
                                                                icon
                                                                onClick={() =>
                                                                    styleHelpers.insert(
                                                                        values
                                                                            .styles
                                                                            .length,
                                                                        {
                                                                            styleName:
                                                                                "",
                                                                            items: [
                                                                                {
                                                                                    styleValue:
                                                                                        "",
                                                                                    products: [
                                                                                        {
                                                                                            product:
                                                                                                "",
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
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
                                                                    styleHelpers.remove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Icon name="minus" />
                                                            </Button>

                                                            {/* </Form.Group> */}

                                                            {/* <Form.Group> */}
                                                            <FieldArray
                                                                name={`styles[${index}].items`}
                                                                label="Style Items"
                                                                render={(
                                                                    itemHelpers
                                                                ) => (
                                                                    <div>
                                                                        {values.styles[
                                                                            index
                                                                        ].items.map(
                                                                            (
                                                                                item,
                                                                                idx
                                                                            ) => (
                                                                                <Form.Group
                                                                                    widths="equal"
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                >
                                                                                    <Form.Input
                                                                                        label="Style Value"
                                                                                        placeholder="Style Value"
                                                                                        label="Style Value"
                                                                                        name={`styles[${index}].items[${idx}].styleValue`}
                                                                                        onChange={
                                                                                            handleChange
                                                                                        }
                                                                                    />

                                                                                    <Form.Dropdown
                                                                                        placeholder="Products"
                                                                                        label="Select Prod"
                                                                                        fluid
                                                                                        search
                                                                                        selection
                                                                                        options={
                                                                                            options
                                                                                        }
                                                                                        loading={
                                                                                            prodLoading
                                                                                        }
                                                                                        onChange={(
                                                                                            _,
                                                                                            {
                                                                                                value: selected,
                                                                                            }
                                                                                        ) => {
                                                                                            setFieldValue(
                                                                                                `styles[${index}].items[${idx}].products`,
                                                                                                [
                                                                                                    {
                                                                                                        product: selected,
                                                                                                    },
                                                                                                ]
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                    <Button
                                                                                        type="button"
                                                                                        icon
                                                                                        onClick={() => {
                                                                                            // console.log(
                                                                                            //     values
                                                                                            //         .styles[
                                                                                            //         index
                                                                                            //     ]
                                                                                            //         .items
                                                                                            //         .length,
                                                                                            //     "Addition Index"
                                                                                            // );

                                                                                            return itemHelpers.insert(
                                                                                                values
                                                                                                    .styles[
                                                                                                    index
                                                                                                ]
                                                                                                    .items
                                                                                                    .length,
                                                                                                {
                                                                                                    styleValue:
                                                                                                        "",
                                                                                                    products: [
                                                                                                        {
                                                                                                            product:
                                                                                                                "",
                                                                                                        },
                                                                                                    ],
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <Icon name="add" />
                                                                                    </Button>
                                                                                    <Button
                                                                                        type="button"
                                                                                        icon
                                                                                        onClick={() => {
                                                                                            // console.log(
                                                                                            //     idx,
                                                                                            //     "Deletion Index"
                                                                                            // );

                                                                                            return itemHelpers.remove(
                                                                                                idx
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <Icon name="minus" />
                                                                                    </Button>
                                                                                </Form.Group>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                            />
                                                            {/* </Form.Group> */}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    />

                                    <Form.Button type="submit">
                                        Submit
                                    </Form.Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
