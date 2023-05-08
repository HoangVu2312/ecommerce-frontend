// this component return preview sersion with limited data to display at product component (input is products with SAME category)

import React, { useContext } from "react";
import { Badge, Card } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/LinkContainer";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";


function SimilarProduct({ _id, name, category, pictures }) {  
    // get the global theme
    const {theme} = useContext(ThemeContext);


    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
            <Card style={{ width: "20rem", margin: "10px" }} id={theme}>
                <Card.Img variant="top" className="product-preview-img" src={pictures[0].url} style={{ height: "150px", objectFit: "cover" }} />
                <Card.Body>
                    <Card.Title >{name}</Card.Title>
                    <Link to={`/category/${category}`}>
                      <Badge bg="warning" text="dark">
                        {category}
                      </Badge>
                    </Link>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default SimilarProduct;