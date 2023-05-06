// This component display a single category page

import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import "./CategoryPage.css";

function CategoryPage() {
  const { category } = useParams(); //

  // local states
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // store the value of the search input

  // fetch all products belong to this category to update local state
  useEffect(() => {
    setLoading(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`; // set the token as default header
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]); // re-run when category param change

  if (loading) {
    <Loading />;
  }

  //  filters the products based on the searchTerm
  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>

      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      
      {productsSearch.length === 0 ? (
        <h1>No products to show</h1>
      ) : (
        <Container>
          <Row>
            {productsSearch.map((product) => (
              <Col xs={12} sm={6} md={3} key={product._id}>
                <ProductPreview {...product} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default CategoryPage;
