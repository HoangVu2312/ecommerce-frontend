// Home page component
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import categories from '../categories';
import { LinkContainer} from "react-router-bootstrap";
import { Col, Row } from 'react-bootstrap';
import "./Home.css";
//import homeBanner from "../images/main-banner.png"
import saleBanner from "../images/sale-banner.png"
import { useDispatch, useSelector } from 'react-redux';
import axios from "../axios";  // instance of axios with defined server url
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';
import Footer from '../components/Footer';


function Home() {
    //get the lestest products from sever to display
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 4);

    
    // async action  
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data))); // send data from API to productSlice
    }, [dispatch]);  // => re-run the effect whenever dispatch changes.


  return (
    <div >
        {/* Home banner */}
        <div className="home-banner"></div>
        

        <div className="featured-products-container container mt-4">
                <h2>Last products</h2>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />  // why clone product here
                    ))}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        See more {">>"}
                    </Link>
                </div>
        </div>

        {/* sale banner */}
        <div className="sale-banner" ></div>

        {/* categories is an array imported from categories component */}
        <div className="recent-products-container container mt-4">
            <h2>Categories</h2>
            <Row>
                {categories.map((category, index) => (
                    // go to specific category page
                    <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`} key={index}> 
                        <Col md={3}>
                            <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                {category.name}
                            </div>
                        </Col>
                    </LinkContainer>
                ))}
            </Row>
        </div>
        <div><ooter/></div>
    </div>
  )
}
export default Home