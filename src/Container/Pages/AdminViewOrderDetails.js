import dayjs from "dayjs";
import React, { useEffect } from "react";
import {
    Button,
    Header,
    Image,
    Modal,
    Icon,
    Grid,
    GridRow,
    Table,
} from "semantic-ui-react";
import ReactImageGallery from "react-image-gallery";
import "./AdminViewOrderDetails.css";

const AdminViewOrderDetails = ({ order }) => {
    const [open, setOpen] = React.useState(false);

    const OrderRow = ({ items }) => {
        return (
            <Table style={{ marginTop: "6em" }}>
                <Table.Header>
                    <Table.Row>
                        {/* <Table.HeaderCell /> */}
                        <Table.HeaderCell>S. No.</Table.HeaderCell>
                        <Table.HeaderCell>Product Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Size</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item) => (
                        <Table.Row key={item._id}>
                            <Table.Cell>
                                {item._id.substr(item._id.length - 5)}
                            </Table.Cell>
                            <Table.Cell> {item.productId.name} </Table.Cell>
                            <Table.Cell> {item.payablePrice} </Table.Cell>
                            <Table.Cell> {item.purchasedQty} </Table.Cell>

                            {item.purchasedSize !== undefined && (
                                <Table.Cell>
                                    {" "}
                                    {item.purchasedSize.sizeValue +
                                        " " +
                                        item.purchasedSize.sizeUnit}{" "}
                                </Table.Cell>
                            )}
                            {item.purchasedSize === undefined && (
                                <Table.Cell> Null </Table.Cell>
                            )}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    };

    // useEffect(() => {}, [props.order]);

    console.log(order);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button>
                    <Icon name="eye" />
                </Button>
            }
        >
            <Modal.Header>Order Details</Modal.Header>
            <Modal.Content style={{ overflowX: "hidden" }}>
                <Grid columns="equal">
                    <Grid.Column width={4}>
                        <ReactImageGallery
                            showPlayButton={false}
                            slideOnThumbnailOver={true}
                            items={order.items.map((item) => ({
                                original: `http://localhost:2000/public/${item.productId.productPictures[0].img}`,
                                thumbnail: `http://localhost:2000/public/${item.productId.productPictures[0].img}`,
                            }))}
                        />
                    </Grid.Column>

                    {order && (
                        <div
                            // width={8}
                            style={{ width: "30%" }}
                        >
                            <Grid style={{ width: "100%" }}>
                                {/* <Grid.Row> */}
                                <Grid.Row>
                                    Order Id:- {order.paymentData.orderId}
                                </Grid.Row>
                                <Grid.Row>
                                    Date of Order:-{" "}
                                    {dayjs(order.createdAt).format(`DD
                                            MMMM YYYY`)}
                                </Grid.Row>
                                <Grid.Row>
                                    Order Status:-{" "}
                                    {order.orderStatus[
                                        order.orderStatus.length - 1
                                    ]
                                        ? order.orderStatus[
                                              order.orderStatus.length - 1
                                          ].type
                                        : "ordered"}
                                </Grid.Row>
                                <Grid.Row>
                                    Ordered By:- {order.user.firstName}
                                </Grid.Row>
                                <Grid.Row>
                                    Items:- {order.items.length}
                                </Grid.Row>
                                <Grid.Row>
                                    Total Amount:- {order.totalAmount}
                                </Grid.Row>
                                <Grid.Row>
                                    Payment Status:- {order.paymentStatus}
                                </Grid.Row>
                                <Grid.Row>
                                    Payment Method:- {order.paymentType}
                                </Grid.Row>
                                {order.billingAddress && (
                                    <Grid.Row>
                                        Billing Address:-
                                        <Grid.Column>
                                            <div>
                                                Name:-{" "}
                                                {order.billingAddress.name}
                                            </div>
                                            <div>
                                                Address:-
                                                {order.billingAddress.address}
                                            </div>
                                            <div>
                                                Landmark:-{" "}
                                                {order.billingAddress.landmark}
                                            </div>
                                            <div>
                                                Locality:-{" "}
                                                {order.billingAddress.locality}
                                            </div>
                                            <div>
                                                Pin Code:-{" "}
                                                {order.billingAddress.pinCode}
                                            </div>
                                            <div>
                                                City:-{" "}
                                                {
                                                    order.billingAddress
                                                        .cityDistrictTown
                                                }
                                            </div>
                                            <div>
                                                State:-{" "}
                                                {order.billingAddress.state}
                                            </div>
                                            <div>
                                                Mobile Number:-{" "}
                                                {
                                                    order.billingAddress
                                                        .mobileNumber
                                                }
                                            </div>
                                            <div>
                                                Alternative Number:-{" "}
                                                {
                                                    order.billingAddress
                                                        .alternatePhone
                                                }
                                            </div>
                                            <div>
                                                Address Type:-{" "}
                                                {
                                                    order.billingAddress
                                                        .addressType
                                                }
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                )}
                                {/* </Grid.Row> */}
                            </Grid>
                        </div>
                    )}
                </Grid>
                {/* <Grid.Row> */}
                <OrderRow items={order.items} />
                {/* </Grid.Row> */}
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AdminViewOrderDetails;
