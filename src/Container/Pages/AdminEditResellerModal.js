import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";
import { updateReseller } from "../../actions/reseller.action";

function AdminEditResellerModal({ resellerId }) {
    const [resellerPercent, setResellerPercent] = useState(0);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    // // console.log(resellerEmail);

    const handleSubmit = () => {
        setOpen(false);
        dispatch(
            updateReseller({
                resellerId,
                percent: resellerPercent / 100,
            })
        );
    };

    return (
        <Modal
            open={open}
            trigger={
                <Button icon>
                    <Icon name="edit" />
                </Button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header content="Add Reseller" />
            <Modal.Content>
                <Form>
                    <Form.Input
                        label="Enter Reseller's New Pecentage"
                        type="number"
                        placeholder="Enter Reseller's New Pecentage"
                        onChange={(e) =>
                            setResellerPercent(parseInt(e.target.value))
                        }
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

export default AdminEditResellerModal;
