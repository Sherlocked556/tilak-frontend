import { FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { addCategory, getAllProducts } from "../../actions";
import { addInventory, updateInventory } from "../../actions/inventory.action";

export default function AdminEditInventory(props) {
    const { categories } = useSelector((state) => state.category);
    const { products, loading: prodLoading } = useSelector(
        (state) => state.product
    );
    const { loading: invtLoading, inventoryDetails } = useSelector(
        (state) => state.inventory
    );

    const dispatch = useDispatch();

    const handleInventoryEdit = (data, inventoryId) => {
        dispatch(updateInventory(data, inventoryId));
    };

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    console.log(inventoryDetails);

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
                    <p className="adminPopHeading">Edit Inventory</p>
                </div>
                <div className="detailBlogFill" style={{ padding: "1em" }}>
                    <div className="productDetailsCol">
                        {inventoryDetails._id && (
                            <Formik
                                initialValues={{
                                    name: inventoryDetails.name,
                                    thumbnail: inventoryDetails.thumbnail,
                                    category: inventoryDetails.category._id,
                                    styles: inventoryDetails.styles,
                                }}
                                onSubmit={(data) =>
                                    handleInventoryEdit(
                                        data,
                                        inventoryDetails._id
                                    )
                                }
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
                                                value={values.name}
                                            />
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
                                                                    value={
                                                                        values
                                                                            .styles[
                                                                            index
                                                                        ]
                                                                            .styleName
                                                                    }
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    icon
                                                                    onClick={() =>
                                                                        styleHelpers.insert(
                                                                            index +
                                                                                1,
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
                                                                                            value={
                                                                                                values
                                                                                                    .styles[
                                                                                                    index
                                                                                                ]
                                                                                                    .items[
                                                                                                    idx
                                                                                                ]
                                                                                                    .styleValue
                                                                                            }
                                                                                        />

                                                                                        <Form.Dropdown
                                                                                            placeholder="Products"
                                                                                            label="Select Prod"
                                                                                            fluid
                                                                                            multiple
                                                                                            search
                                                                                            selection
                                                                                            options={
                                                                                                options
                                                                                            }
                                                                                            value={values.styles[
                                                                                                index
                                                                                            ].items[
                                                                                                idx
                                                                                            ].products
                                                                                                .map(
                                                                                                    (
                                                                                                        prod
                                                                                                    ) => {
                                                                                                        if (
                                                                                                            prod.product !==
                                                                                                            ""
                                                                                                        )
                                                                                                            return prod.product;
                                                                                                    }
                                                                                                )
                                                                                                .filter(
                                                                                                    (
                                                                                                        prod
                                                                                                    ) =>
                                                                                                        prod !==
                                                                                                        undefined
                                                                                                )}
                                                                                            loading={
                                                                                                prodLoading
                                                                                            }
                                                                                            onChange={(
                                                                                                _,
                                                                                                {
                                                                                                    value: selected,
                                                                                                }
                                                                                            ) => {
                                                                                                let prods = selected.map(
                                                                                                    (
                                                                                                        select
                                                                                                    ) => {
                                                                                                        return {
                                                                                                            product: select,
                                                                                                        };
                                                                                                    }
                                                                                                );

                                                                                                setFieldValue(
                                                                                                    `styles[${index}].items[${idx}].products`,
                                                                                                    prods
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                        <Button
                                                                                            type="button"
                                                                                            icon
                                                                                            onClick={() =>
                                                                                                itemHelpers.insert(
                                                                                                    index +
                                                                                                        1,
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
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <Icon name="add" />
                                                                                        </Button>
                                                                                        <Button
                                                                                            type="button"
                                                                                            icon
                                                                                            onClick={() =>
                                                                                                itemHelpers.remove(
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
