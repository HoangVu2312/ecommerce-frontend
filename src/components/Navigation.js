// Component file of nav-bar
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import "./Navigation.css";
import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from "../features/userSlice";
import { ThemeContext } from "../App";
import axios from "../axios";
import Switch from "react-switch";

//rfce
function Navigation() {
  // get the global theme
  const { theme, toggleTheme } = useContext(ThemeContext);

  // get state for conditional rendering
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // logout function => return to initial state
  function handleLogout() {
    dispatch(logout());
  }

  // Notification setup
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});

  //calculate number of undear notification
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);

  //show the notif and mark read
  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);  //
  }

  // console.log(user.cart.count)

  return (
    <Navbar expand="lg">
      <Container >
        <LinkContainer to="/">
          <Navbar.Brand id={theme}>Bon-Luna</Navbar.Brand>
        </LinkContainer>

        {/* change theme button */}
        <Switch
          onChange={toggleTheme}
          checked={theme === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          height={20}
          width={40}
          handleDiameter={20}
        />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if there is NO user => render login button */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link id={theme}>Login</Nav.Link>
              </LinkContainer>
            )}

            {/* check if there is not-admin user => render cart icon */}
            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" id={theme}></i>
                  {/* if user have item in cart => show amount of item*/}
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}

            {/* if there is a user => render dropdown button */}
            {user && (
              <>
              {/* notification bell ?? */}
                <Nav.Link
                  style={{ position: "relative" }}
                  onClick={handleToggleNotifications}
                >
                  <i
                    className="fas fa-bell"
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                    id={theme}
                  ></i>
                </Nav.Link>




                <NavDropdown
                  title={`${user.name}`}
                  // id={`basic-nav-dropdown ${theme}`}
                  id={theme}
                >
                  {/* that user is admin */}
                  {user.isAdmin && (
                    <>
                      <LinkContainer to="/admin">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/new-product">
                        <NavDropdown.Item>Create Product</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  {/* check again because this is another element */}
                  {!user.isAdmin && (
                    <>
                      <LinkContainer to="/cart">
                        <NavDropdown.Item>Cart</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orders">
                        <NavDropdown.Item>My orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                  <NavDropdown.Divider />
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Logout
                  </Button>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* notifications display*/}
      <div
        className="notifications-container"
        ref={notificationRef}
        style={{
          position: "absolute",
          top: bellPos.top + 30,
          left: bellPos.left,
          display: "none",
        }}
      >
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <p className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split("T")[0] +
                  " " +
                  notification.time.split("T")[1]}
              </span>
            </p>
          ))
        ) : (
          <p>No notifcations yet</p>
        )}
      </div>
    </Navbar>
  );
}

export default Navigation;
