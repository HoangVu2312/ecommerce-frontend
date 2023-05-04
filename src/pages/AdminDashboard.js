// This is an Ui component for admin to control

import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import DashboardProducts from "../components/DashboardProducts";
import DashboardOrders from "../components/DashboardOrders";
import DashboardClients from "../components/DashboardClients";


function AdminDashboard() {
    return (
        <Container>
            <Tab.Container defaultActiveKey="products">
                <Row>
                    {/* side-bar */}
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products">Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Clients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    {/* display tabs */}
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <DashboardProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <DashboardOrders />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <DashboardClients/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default AdminDashboard;