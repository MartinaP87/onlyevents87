import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink exact to="/">
          <Navbar.Brand className={styles.NavbarBrand}>Only Events</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}><i className="fas fa-home"></i>
              Home
            </NavLink>
            <NavLink to="/feeds" className={styles.NavLink} activeClassName={styles.Active}>
              Feeds
            </NavLink>
            <NavLink to="/preferres" className={styles.NavLink} activeClassName={styles.Active}>
              Preferred
            </NavLink>
            <NavLink to="/interested" className={styles.NavLink} activeClassName={styles.Active}>
              Interested
            </NavLink>
            <NavLink to="/going" className={styles.NavLink} activeClassName={styles.Active}>
              Going
            </NavLink>
            <NavLink to="/past" className={styles.NavLink} activeClassName={styles.Active}>
              Past Events
            </NavLink>
            <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fas fa-sign-in-alt"></i>Sign In
            </NavLink>
            <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fas fa-user-plus"></i>Sign Up
            </NavLink>
            <NavLink to="/signout" className={styles.NavLink} activeClassName={styles.Active}>
              Sign Out
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
