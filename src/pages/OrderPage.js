import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";


function OrdersPage() {

    // get current logged-in user
    const user = useSelector((state) => state.user);

    // set local states
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false); // bolean type

    // send request to get all orders of current logged-in user
    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-3">You have no order</h1>;
    }

    return (
        <Container>
            <h1 className="text-center">Your orders</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr> 
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{order.products.count} products</td>
                            <td>
                                <Badge bg={`${order.status === "processing" ? "warning" : "success"}`} text="white">
                                    {order.status}
                                </Badge>
                            </td>
                            <td>{order.date}</td>

                            <td>${order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default OrdersPage;