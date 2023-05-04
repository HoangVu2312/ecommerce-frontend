// UI page to create a new product
import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios.js";
import "./NewProduct.css";

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);  //store the public_id of an image to remove
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();  // from appApi

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id)); //remove the delete image out of current images array
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, price, category, images }).then(({ data }) => {

            //successful create a product
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");  // return to home after 1.5 sec
                }, 1500);
            }
        });
    }

    


    // Use cloudinary to get or save the real image files => only save the file url in Mongoose db 
    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "datjdbueh",
                uploadPreset: "ecommer",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }


    // console.log(images.length)
    
 
    return (
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Create a product</h1>
                        {isSuccess && <Alert variant="success">Product created with succcess</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}

                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control type="number" placeholder="Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="men">men</option>
                                <option value="women">women</option>
                                <option value="children">children</option>
                                <option value="jewelry">jewelry</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget} >
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview" key={image.public_id}>
                                        <img src={image.url} alt="product"/>
                                        {/* check if the image is not removed yet => show icon to remove */}
                                        {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)} ></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Create Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>

                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default NewProduct;