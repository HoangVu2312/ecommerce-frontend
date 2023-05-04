//rfce
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSignupMutation } from '../services/appApi';
import "./Signup.css"
function Signup() {

    // create local state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, 
        {error, isLoading, isError}, //
    ] = useSignupMutation();

    // function to handle data from user
    function handleSignup(e) {
        e.preventDefault();
        signup({name, email, password}) // send data as an object to appApi to handle
    }
    return (
        <Container>
            <Row>
                
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1>Create a new account</h1>

                        {isError && <Alert variant="danger">{error.data}</Alert>} 
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                Sign up
                            </Button>
                        </Form.Group>

                        <p className="pt-3 text-center">
                            already have an account <Link to="/login">Login your account</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
    );
}

export default Signup