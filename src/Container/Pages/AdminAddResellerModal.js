import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";
import { createReseller } from "../../actions/reseller.action";

function AdminAddResellerModal() {
    const [resellerEmail, setResellerEmail] = useState("");
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    // console.log(resellerEmail);

    const handleSubmit = () => {
        setOpen(false);
        dispatch(createReseller(resellerEmail));
    };

    return (
        <Modal
            open={open}
            trigger={<button className="categoryBtn">ADD A RESELLER</button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header content="Add Reseller" />
            <Modal.Content>
                <Form>
                    <Form.Input
                        label="Enter Reseller's Email ID"
                        type="email"
                        placeholder="Enter Reseller's Email ID"
                        onChange={(e) => setResellerEmail(e.target.value)}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => handleSubmit()}>
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default AdminAddResellerModal;
