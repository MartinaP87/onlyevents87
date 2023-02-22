import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavBar = () => {
  return (
    <Navbar expand="md"fixed="top">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link><i className="fas fa-home"></i>Home</Nav.Link>
            <Nav.Link>Feeds</Nav.Link>
            <Nav.Link>Preferred</Nav.Link>
            <Nav.Link>Interested</Nav.Link>
            <Nav.Link>Going</Nav.Link>
            <Nav.Link>Past Events</Nav.Link>
            <Nav.Link><i className="fas fa-sign-in-alt"></i>Sign In</Nav.Link>
            <Nav.Link><i className="fas fa-user-plus"></i>Sign Up</Nav.Link>
            <Nav.Link>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
