// this component display all information of product, when user click to preview images

import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";


function ProductPage() {
    

    const { id } = useParams(); // get the id when user click to preview image (auto-created by moongoose)
    const user = useSelector((state) => state.user); // check current logged-in user
    const products = useSelector((state) => state?.products);

    
    // set up local state
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);

    const [addToCart, { isSuccess }] = useAddToCartMutation();


    const handleDragStart = (e) => e.preventDefault(); // stop broser's defaut => allow to drag images to slide 

      useEffect(() => {
    // find property in store based on id
    const product = products.find((p) => p._id === id); // local property => not relate to property

    if (product) {
      setProduct(products);
    }
  }, [id]);


    // Async action => get data from server to update local state
    // useEffect(() => {
    //     // Get the token from local storage
    //     const token = localStorage.getItem('token');
      
    //     // Create an Axios instance with the Authorization header
    //     const axiosInstance = axios.create({
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
      
    //     // Send request to server and get a product and other products with the same category from server to update local state
    //     axiosInstance.get(`/products/${id}`).then(({ data }) => {
    //       setProduct(data.product);
    //       setSimilar(data.similar);
    //     });
    //   }, [id]); // re-run when id in url change
    
    // In case there is no product
    if (!product) {
        return <Loading />;
    }

    // defines the responsive behavior of the carousel
    const responsive = {
        0: { items: 1 },
        360: { items: 2 },
        568: { items: 3 },  //568px
        1024: { items: 4 }, // 1024px
    };

    // make an array of img element to display in carousel
    const images = product.pictures.map((picture) => <img className="product__carousel--image" src={picture.url} onDragStart={handleDragStart} alt="prod"/>);

    // create an array of div items to display at second carousel
    let similarProducts = [];  // all items in this array will be created first, before carousel use them to display

    if (similar) {
        similarProducts = similar.map((product, idx) => ( // try to turn data value to key??
            //data-value  allow the AliceCarousel library to track the current position of the carousel 
            <div className="item" data-value={idx}>  
                <SimilarProduct {...product} />
            </div>
        ));
    }

    return (
        <Container className="pt-4" style={{ position: "relative" }}>
            <Row>
                <Col lg={6}>
                    <AliceCarousel mouseTracking items={images} controlsStrategy="alternate" />
                </Col>

                <Col lg={6} className="pt-4">
                    <h1>{product.name}</h1>
                    
                    <LinkContainer to={`/category/${product.category}`} style={{ cursor: "grab" }}>
                      <Badge bg="warning" text="dark">
                        {product.category}
                      </Badge>
                    </LinkContainer>
                    
                    <p className="product__price my-2">${product.price}</p>
                    <p style={{ textAlign: "justify-content-center" }} className="py-3">
                        <strong>Description:</strong> {product.description}
                    </p>

                    {/* Logged-in clients will have add to cart button */}
                    {user && !user.isAdmin && (
                        <ButtonGroup style={{ width: "90%" }}>
                            <Form.Select size="lg" style={{ width: "40%", borderRadius: "0" }}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Select>
                            {/* addToCart function expects its param is an object with 4 defined properties */}
                            <Button size="lg" onClick={() => addToCart({ userId: user._id, productId: id, price: product.price})}> 
                                Add to cart
                            </Button>
                        </ButtonGroup>
                    )}

                    {/* admin can edit product */}
                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${product._id}/edit`}>
                            <Button size="lg">Edit Product</Button>
                        </LinkContainer>
                    )}
                    {isSuccess && <ToastMessage bg="info" title="Added to cart" body={`${product.name} is in your cart`} />}
                </Col>
            </Row>

            <div className="my-4">
                <h2>Similar Products</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap ">
                    <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>
        </Container>
    );
}

export default ProductPage;
