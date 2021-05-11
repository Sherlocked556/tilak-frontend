import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Dropdown, Icon, Tab, Table } from "semantic-ui-react";
import { updateResellerRequest } from "../../actions/reseller.action";

export const ResellerRequestTable = ({ requests, loading }) => {
    const dispatch = useDispatch();

    const options = [
        { key: 1, text: "Processing", value: "processing" },
        { key: 2, text: "Accept", value: "accepted" },
        { key: 3, text: "Decline", value: "declined" },
    ];

    const [status, setStatus] = useState({});

    const handleUpdateRequest = (requestId, status, prevStatus) => {
        if (prevStatus === "processing") {
            dispatch(updateResellerRequest({ requestId, status }));
        } else {
            toast.error("Request has been accepted/declined.", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    };

    // console.log("status", status);

    return (
        <Tab.Pane loading={loading}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>S. No.</Table.HeaderCell>
                        <Table.HeaderCell>Request ID</Table.HeaderCell>
                        <Table.HeaderCell>Reseller Email</Table.HeaderCell>
                        <Table.HeaderCell>Points</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Accept / Reject</Table.HeaderCell>
                        {/* <Table.HeaderCell>View Request</Table.HeaderCell> */}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {requests &&
                        requests.length > 0 &&
                        requests.map((request, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>
                                    {request._id.substr(request._id.length - 5)}
                                </Table.Cell>
                                <Table.Cell>
                                    {request.resellerId.userId.email}
                                </Table.Cell>
                                <Table.Cell>{request.points}</Table.Cell>
                                <Table.Cell>{request.amount}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        options={options}
                                        value={
                                            status[request._id] ||
                                            request.status
                                        }
                                        onChange={(e, { value }) => {
                                            setStatus({
                                                ...status,
                                                [request._id]: value,
                                            });
                                        }}
                                    />
                                    {status[request._id] &&
                                        status[request._id] !==
                                            request.status && (
                                            <Button
                                                style={{ marginLeft: "2em" }}
                                                onClick={() =>
                                                    handleUpdateRequest(
                                                        request._id,
                                                        status[request._id],
                                                        request.status
                                                    )
                                                }
                                                icon
                                            >
                                                <Icon name="check" />
                                            </Button>
                                        )}
                                </Table.Cell>
                                {/* <Table.Cell>
                                    <Button icon>
                                        <Icon name="eye" />
                                    </Button>
                                </Table.Cell> */}
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </Tab.Pane>
    );
};
