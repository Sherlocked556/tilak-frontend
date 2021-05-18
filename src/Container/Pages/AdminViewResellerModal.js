import dayjs from "dayjs";
import React from "react";
import {
    Button,
    Header,
    Icon,
    Image,
    Modal,
    Table,
    TableCell,
} from "semantic-ui-react";

const AdminViewResellerModal = ({ reseller }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button icon>
                    <Icon name="eye" />
                </Button>
            }
        >
            <Modal.Header>View Reseller</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Reseller Details</Header>
                    <div className="">
                        <span>Reseller Name: {reseller.userId.firstName}</span>
                    </div>
                    <div className="">
                        <span>Reseller Email: {reseller.userId.email}</span>
                    </div>
                    <div className="">
                        <span>
                            Requestable Point: {reseller.requestablePoints}
                        </span>
                    </div>
                    <div className="">
                        <span>
                            Total Amount Redeemed: {reseller.totalPoints}
                        </span>
                    </div>
                    <div className="">
                        <span>
                            Total Number Orders Places: {reseller.orders.length}
                        </span>
                    </div>

                    <Header>Orders</Header>

                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Sr. No.</Table.HeaderCell>
                                <Table.HeaderCell>Order Id</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Payment Status
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Number of Items
                                </Table.HeaderCell>
                                <Table.HeaderCell>Ordered By</Table.HeaderCell>
                                <Table.HeaderCell>
                                    Total Amount
                                </Table.HeaderCell>
                                <Table.HeaderCell>Ordered On</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {reseller.orders &&
                                reseller.orders.map((order, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>
                                            {order.orderId.paymentData.orderId}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.orderId.paymentStatus}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.orderId.items.length}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.orderId.user.firstName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.orderId.totalAmount}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {dayjs(order.orderId.createdAt)
                                                .format(`DD
                                            MMMM YYYY`)}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AdminViewResellerModal;
