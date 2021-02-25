import React, { Component, Fragment } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "../../helpers/axios";

class TextEditor extends Component {
    render() {
        const { value, onChange } = this.props; // <- Dont mind this, just handling objects from props because Im using this as a shared component.

        const custom_config = {
            extraPlugins: [MyCustomUploadAdapterPlugin],
            toolbar: {
                items: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "blockQuote",
                    "insertTable",
                    "|",
                    "imageUpload",
                    "undo",
                    "redo",
                ],
            },
            table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
            },
        };

        return (
            <CKEditor
                required
                editor={ClassicEditor}
                config={custom_config}
                data={value}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        );
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}

class MyUploadAdapter {
    constructor(props) {
        this.loader = props;
    }

    upload() {
        return this.loader.file.then((uploadedFile) => {
            return new Promise((resolve, reject) => {
                const data = new FormData();
                data.append("file", uploadedFile);

                axios
                    .post("blog/uploadImg", data, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        if (response.data.url) {
                            console.log(response.data.url);

                            resolve({
                                default: response.data.url,
                            });
                        } else {
                            reject(response.data.error);
                        }
                    })
                    .catch((response) => {
                        reject("Upload failed");
                    });
            });
        });
    }

    abort() {}
}

export default TextEditor;
