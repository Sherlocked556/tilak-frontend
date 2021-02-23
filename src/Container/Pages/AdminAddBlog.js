import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import axios from "../../helpers/axios";
import TextEditor from "./TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../actions/blog.action";

export default function AdminAddBlog(props) {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blogs);

    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [content, setContent] = useState("");

    const handleEditorChange = (content, editor) => {
        setContent(content);
    };

    const handleBlogSubmit = () => {
        dispatch(addBlog({ title, coverImg, content }));
    };

    console.log(blog);

    return (
        <div>
            <div className="SmallBlogUp">
                <div className="headingPopUp">
                    <div className="adminClose" onClick={props.closeProduct}>
                        +
                    </div>
                    <p className="adminPopHeading">Add Blog</p>
                </div>
                <div className="detailBlogFill" style={{ padding: "1em" }}>
                    <div className="productDetailsCol">
                        {blog && (
                            <Form loading={blog.loading}>
                                <Input
                                    type="text"
                                    label="Blog Title"
                                    placeholder="Enter Blog Title here"
                                    style={{
                                        marginBottom: "2em",
                                        marginRight: "1em",
                                    }}
                                    onChange={({ target }) =>
                                        setTitle(target.value)
                                    }
                                />

                                <Input
                                    type="file"
                                    label="Cover Image"
                                    name="coverImg"
                                    onChange={({ target }) =>
                                        setCoverImg(target.files[0])
                                    }
                                />

                                <TextEditor onChange={handleEditorChange} />

                                <Button
                                    primary
                                    style={{ marginTop: "1em" }}
                                    onClick={handleBlogSubmit}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
