import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "semantic-ui-react";
import { addCategory } from "../../actions";
import axios from "../../helpers/axios";

export default function AdminAddCategory(props) {
    const [name, setName] = useState("");
    const [categoryImg, setCategoryImg] = useState("");

    const dispatch = useDispatch();

    const handleBlogSubmit = () => {
        dispatch(addCategory(name, categoryImg));
    };

    return (
        <div>
            <div className="SmallBlogUp">
                <div className="headingPopUp">
                    <div className="adminClose" onClick={props.closeProduct}>
                        +
                    </div>
                    <p className="adminPopHeading">Add Category</p>
                </div>
                <div className="detailBlogFill" style={{ padding: "1em" }}>
                    <div className="productDetailsCol">
                        <Input
                            type="text"
                            label="Category Name"
                            placeholder="Enter Category Name here"
                            style={{
                                marginBottom: "2em",
                                marginRight: "1em",
                            }}
                            onChange={({ target }) => setName(target.value)}
                        />

                        <Input
                            type="file"
                            label="Category Image"
                            name="categoryImg"
                            onChange={({ target }) =>
                                setCategoryImg(target.files[0])
                            }
                        />

                        <Button
                            primary
                            style={{ marginTop: "1em" }}
                            onClick={handleBlogSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
