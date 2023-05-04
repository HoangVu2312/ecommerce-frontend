// This compoent display all the products available in the app (only for admin)

import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
// import Pagination from "./Pagination";

function DashboardProducts() {

    // get all products array from redux store (NOT API)
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);

    // endpoint function to remove products
    const [deletProduct, { isLoading}] = useDeleteProductMutation();

    // admin can delete products right here
    function handleDeleteProduct(id) {
        if (window.confirm("Delete this product ??")) deletProduct({ product_id: id, user_id: user._id });
    }

    // function TableRow({ pictures, _id, name, price }) {
    //     return (
    //         <tr>
    //             <td>
    //                 <img src={pictures[0].url} className="dashboard-product-preview" />
    //             </td>
    //             <td>{_id}</td>
    //             <td>{name}</td>
    //             <td>{price}</td>
    //             <td>
    //                 <Button onClick={() => handleDeleteProduct(_id, user._id)} disabled={isLoading}>
    //                     Delete
    //                 </Button>
    //                 <Link to={`/product/${_id}/edit`} className="btn btn-warning">
    //                     Edit
    //                 </Link>
    //             </td>
    //         </tr>
    //     );
    // }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>

            <tbody>
                {/* <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />*/}

                {/* The result of function below is an expression => in JSX must wrap in a curly brace {} */}
                {products.map((product) => 
                    <tr key={product._id}>
                        <td><img src={product.pictures[0].url} className="dashboard-product-preview" alt="product"/></td> 
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>

                        <td>
                           <Button onClick={() => handleDeleteProduct(product._id, user._id)} className="m-2 btn btn-danger" disabled={isLoading}> Delete </Button>

                           <Link to={`/product/${product._id}/edit`} className="btn btn-warning">Edit</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default DashboardProducts;