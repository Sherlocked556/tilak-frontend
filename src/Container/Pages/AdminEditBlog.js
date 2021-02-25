import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import axios from "../../helpers/axios";
import TextEditor from "./TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updateBlog } from "../../actions/blog.action";

export default function AdminEditBlog(props) {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blogs);

    console.log(props);

    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (props.title) {
            setTitle(props.title);
            setContent(props.content);
            setDescription(props.description);
        }
    }, [props]);

    const handleEditorChange = (content, editor) => {
        setContent(content);
    };

    const handleBlogSubmit = (blogId) => {
        // console.log(content);
        dispatch(updateBlog({ title, content, blogId, description }));
    };

    console.log(description);

    return (
        <div>
            <div className="SmallBlogUp">
                <div className="headingPopUp">
                    <div className="adminClose" onClick={props.closeProduct}>
                        +
                    </div>
                    <p className="adminPopHeading">Edit Blog</p>
                </div>
                <div className="detailBlogFill" style={{ padding: "1em" }}>
                    <div className="productDetailsCol">
                        {blog && (
                            <Form loading={blog.loading}>
                                <Form.Input
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
                                    value={title}
                                />

                                <Form.Input
                                    type="text"
                                    label="Blog Description"
                                    placeholder="Enter Blog Title here"
                                    style={{
                                        marginBottom: "1em",
                                        marginRight: "1em",
                                    }}
                                    value={description}
                                    onChange={({ target }) =>
                                        setDescription(target.value)
                                    }
                                />

                                <Form.Field>
                                    <TextEditor
                                        onChange={handleEditorChange}
                                        value={content}
                                    />
                                </Form.Field>

                                <Button
                                    primary
                                    style={{ marginTop: "1em" }}
                                    onClick={() =>
                                        handleBlogSubmit(props.blogId)
                                    }
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
