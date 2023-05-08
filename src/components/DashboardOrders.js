// This compoent display all the orders and clients who order them available in the app (only for admin)

import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
// import Pagination from "./Pagination";

function OrdersAdminPage() {

    //set local states
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderToShow, setOrderToShow] = useState([]); //??
    const [show, setShow] = useState(false);// the status of pop-up table

    // get all products from redux store
    const products = useSelector((state) => state.products);

    const handleClose = () => setShow(false);

    function markShipped(orderId, ownerId) {
        // Get the token from local storage
        const token = localStorage.getItem('token');
      
        // Create an Axios instance with the Authorization header
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        axiosInstance
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId }) // send request to update the "status" property of order
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }

    function showOrder(productsObj) { // productsObj = all products in that order

        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        console.log(productsToShow);
        setShow(true);
        setOrderToShow(productsToShow);
    }

    useEffect(() => {
        setLoading(true);
        // Get the token from local storage
        const token = localStorage.getItem('token');
      
        // Create an Axios instance with the Authorization header
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        axiosInstance
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">No orders yet</h1>;
    }

    // function TableRow({ _id, count, owner, total, status, products, address }) {
    //     return (
    //         <tr>
    //             <td>{_id}</td>
    //             <td>{owner?.name}</td>
    //             <td>{count}</td>
    //             <td>{total}</td>
    //             <td>{address}</td>
    //             <td>
    //                 {status === "processing" ? (
    //                     <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
    //                         Mark as shipped
    //                     </Button>
    //                 ) : (
    //                     <Badge bg="success">Shipped</Badge>
    //                 )}
    //             </td>
    //             <td>
    //                 <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
    //                     View order <i className="fa fa-eye"></i>
    //                 </span>
    //             </td>
    //         </tr>
    //     );
    // }

    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Clients</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Address</th>
                        <th>Mark</th>
                        <th>Check</th>
                    </tr> 
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.owner?.name}</td>
                            <td>{order.count}</td>
                            <td>{order.total}</td>
                            <td>{order.address}</td>

                            <td>
                                {order.status === "processing" ? (
                                  <Button size="sm"  onClick={() => markShipped(order._id, order.owner?._id)}>
                                     Mark as shipped
                                  </Button>
                                ) : (
                                   <Badge bg="success">Shipped</Badge>
                                )}
                            </td>

                            <td>
                              <span style={{ cursor: "pointer" }} onClick={() => showOrder(order.products)} >
                                View order <i className="fa fa-eye"></i>
                              </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order details</Modal.Title>
                </Modal.Header>
                {orderToShow.map((order) => (
                    <div className="order-details__container d-flex justify-content-around py-2">
                        <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} alt="product"/>
                        <p>
                            <span>{order.count} x </span> {order.name}
                        </p>
                        <p>Price: ${Number(order.price) * order.count}</p>
                    </div>
                ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrdersAdminPage;