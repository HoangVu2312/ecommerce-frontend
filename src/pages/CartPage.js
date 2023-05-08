import { Elements } from "@stripe/react-stripe-js";  
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";
import { ThemeContext } from "../App";

// Configure publishable key
const stripePromise = loadStripe("pk_test_51MtaxhBc8RZOIqX1sTv1wE92GnLay80BAbzYFgCVb6Bl9p5punvzwbjdDWpfKvpBFwD7sScaVMHhDeyzU1uix09Q0014P2hapP");

function CartPage() {
    // get the global theme
    const { theme} = useContext(ThemeContext);

    // get the current logged-in user
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products); // all products in store
    const userCartObj = user.cart; //this object only save the productIDs, total, count


    //An array with all-detailed products from their productIDs
    let cart = products.filter((product) => userCartObj[product._id] != null);


    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();


    // Fix this function => prevent decreasing under 0
    function handleDecrease(product) {
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Can't proceed");
        decreaseCart(product);
    }

    return (
        <Container style={{ minHeight: "95vh" }} className="cart-container">
            <Row>
                {/* Left: conditional rendering a notification OR checkout component */}
                <Col>
                    <h1 className="pt-2 h3">Shopping cart</h1>
                    {cart.length === 0 ? (
                        <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                        
                    )}
                </Col>

                {/* Right: all the products in this user's cart */}
                {cart.length > 0 && (
                    <Col md={5} >
                        <>
                            <Table responsive="sm" className="cart-table" id={theme}>
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th> {/*this is empty space*/}
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* loop through cart products array */}
                                    {cart.map((item) => (
                                        <tr>
                                            <td>
                                            {!isLoading && <i className="fa fa-times" style={{ margin: 35, cursor: "pointer", fontSize: "25px"}} onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                                            </td>
                                            <td>
                                                <img src={item.pictures[0].url} style={{ width: 100, height: 100, objectFit: "cover" }} alt="prod"/>
                                            </td>
                                            <td><p>${item.price}</p></td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <i className="fa fa-minus-circle" onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                    <span className="mx-2">{user.cart[item._id]}</span>
                                                    <i className="fa fa-plus-circle" onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                                                </span>
                                            </td>
                                            <td>${item.price * user.cart[item._id]}</td>
                                        </tr>
                                    ))}
                                </tbody> 
                                
                        
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
                            </div>
                        </>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CartPage;